''' Module contenant tous les routes pour les thèmes '''

from typing import List
from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models import Theme, Question, Answer
from schema import ThemeCreate, ThemeRead, ThemeUpdate, AnswerRead
from database import get_session
from routers.auth import get_current_user

router = APIRouter(
    prefix="/api/themes",
    tags=["themes"]
)

@router.get("/", response_model=List[ThemeRead])
def read_themes(skip: int = 0, limit: int = 100, session: Session = Depends(get_session)):
    """
    Récupère tous les thèmes
    """
    themes = session.exec(select(Theme).offset(skip).limit(limit)).all()
    return themes

@router.get("/{theme_id}", response_model=ThemeRead)
def read_theme(theme_id: UUID, session: Session = Depends(get_session)):
    """
    Récupère un thème par son id
    """
    theme = session.get(Theme, theme_id)
    if not theme:
        raise HTTPException(status_code=404, detail="Theme not found")
    return theme

@router.get("/{theme_id}/answers", response_model=List[AnswerRead])
def read_answers_by_theme(theme_id: UUID, session: Session = Depends(get_session)):
    """
    Récupère toutes les réponses liées à un thème spécifique
    """
    theme = session.get(Theme, theme_id)
    if not theme:
        raise HTTPException(status_code=404, detail="Theme not found")

    answers = session.exec(
        select(Answer)
        .join(Question)
        .where(Question.theme_id == theme_id)
    ).all()

    return answers

@router.post("/", response_model=ThemeRead)
def create_theme(theme: ThemeCreate, session: Session = Depends(get_session)):
    """
    Créer un nouveau thème
    """
    db_theme = Theme(**theme.model_dump())
    session.add(db_theme)
    session.commit()
    session.refresh(db_theme)
    return db_theme

@router.put("/{theme_id}", response_model=ThemeRead)
def update_theme(theme_id: UUID, theme_update: ThemeUpdate, session: Session = Depends(get_session)):
    """
    Mettre à jour un thème existant
    """
    theme = session.get(Theme, theme_id)
    if not theme:
        raise HTTPException(status_code=404, detail="Theme not found")
    update_data = theme_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(theme, key, value)
    session.add(theme)
    session.commit()
    session.refresh(theme)
    return theme

@router.delete("/{theme_id}")
def delete_theme(theme_id: UUID, session: Session = Depends(get_session)):
    """
    Supprimer un thème
    """
    theme = session.get(Theme, theme_id)
    if not theme:
        raise HTTPException(status_code=404, detail="Theme not found")
    session.delete(theme)
    session.commit()
    return {"detail": "Theme deleted successfully"}
