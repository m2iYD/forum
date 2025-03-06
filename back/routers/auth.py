''' Module contenant tous les routes pour l'auteur '''

from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
import jwt
from passlib.context import CryptContext
from jwt.exceptions import InvalidTokenError
from models import Author
from schema import AuthorCreate, AuthorRead, AuthorLogin, PasswordUpdate
from database import get_session
from uuid import UUID

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"]
)

SECRET_KEY = "your-secret-key"  # Remplacez par une clé sécurisée en production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register", response_model=AuthorRead, status_code=status.HTTP_201_CREATED)
def register(user: AuthorCreate, session: Session = Depends(get_session)):
    statement = select(Author).where(Author.email == user.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = Author(firstname=user.firstname, lastname=user.lastname, email=user.email, password=hashed_password)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@router.post("/login", response_model=None)
def login(auth_credentials: AuthorLogin, response: Response, db_session: Session = Depends(get_session)):
    """Authenticate an author and return an access token."""
    db_author = db_session.exec(select(Author).where(Author.email == auth_credentials.email)).first()
    if not db_author or not verify_password(auth_credentials.password, db_author.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": db_author.email})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    author_dict = db_author.model_dump()

    # Conversion explicite de id_author en chaîne
    if "id_author" in author_dict and isinstance(author_dict["id_author"], UUID):
        author_dict["id_author"] = str(author_dict["id_author"])

    return JSONResponse(content=author_dict, headers={"Authorization": f"Bearer {access_token}"})

def get_current_user(request: Request, session: Session = Depends(get_session)) -> Author:
    token = None
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
    if not token:
        token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    except InvalidTokenError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc
    user = session.exec(select(Author).where(Author.email == email)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Author not found")
    return user

@router.get("/me", response_model=AuthorRead)
def get_me(current_user: Author = Depends(get_current_user)):
    """
    Récupère les informations de l'auteur actuellement connecté (celui qui a fourni le token)
    """
    return current_user

@router.put("/update-password", response_model=AuthorRead)
def update_password(password_update: PasswordUpdate, current_user: Author = Depends(get_current_user), session: Session = Depends(get_session)):
    if not verify_password(password_update.old_password, current_user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="L'ancien mot de passe est incorrect")
    current_user.password = get_password_hash(password_update.new_password)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user
