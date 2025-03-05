''' Module contenant tous les routes pour les réponses '''

from typing import List
from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from ..models import Answer, User
from ..schema import AnswerCreate, AnswerRead, AnswerUpdate
from ..database import get_session
from ..routers.auth import get_current_user

router = APIRouter(
    prefix="/api/answers",
    tags=["answers"]
)

@router.get("/", response_model=List[AnswerRead])
def read_answers(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Récupère toutes les réponses
    """
    answers = session.exec(select(Answer).offset(skip).limit(limit)).all()
    return answers

@router.get("/{answer_id}", response_model=AnswerRead)
def read_answer(answer_id: UUID, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Récupère une réponse par son id
    """
    answer = session.get(Answer, answer_id)
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    return answer

@router.get("/user/{user_id}", response_model=List[AnswerRead])
def read_answers_by_user(user_id: UUID, session: Session = Depends(get_session)):
    """
    Récupère toutes les réponses d'un utilisateur spécifique
    """
    answers = session.exec(select(Answer).where(Answer.users_id == user_id)).all()
    if not answers:
        raise HTTPException(status_code=404, detail="No answers found for this user")
    return answers

@router.post("/", response_model=AnswerRead)
def create_answer(answer: AnswerCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Créer une nouvelle réponse
    """
    db_answer = Answer(**answer.model_dump())
    session.add(db_answer)
    session.commit()
    session.refresh(db_answer)
    return db_answer

@router.put("/{answer_id}", response_model=AnswerRead)
def update_answer(answer_id: UUID, answer_update: AnswerUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Mettre à jour une réponse existante
    """
    answer = session.get(Answer, answer_id)
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    update_data = answer_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(answer, key, value)
    session.add(answer)
    session.commit()
    session.refresh(answer)
    return answer

@router.delete("/{answer_id}")
def delete_answer(answer_id: UUID, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Supprimer une réponse
    """
    answer = session.get(Answer, answer_id)
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    session.delete(answer)
    session.commit()
    return {"detail": "Answer deleted successfully"}
