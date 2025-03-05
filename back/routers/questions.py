''' Module contenant tous les routes pour les questions '''

from typing import List
from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from ..models import Question, User
from ..schema import QuestionCreate, QuestionRead, QuestionUpdate
from ..database import get_session
from .auth import get_current_user

router = APIRouter(
    prefix="/api/questions",
    tags=["questions"]
)

@router.get("/", response_model=List[QuestionRead])
def read_questions(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Récupère toutes les questions
    """
    questions = session.exec(select(Question).offset(skip).limit(limit)).all()
    return questions

# Endpoint pour récupérer les questions par thème
@router.get("/theme/{theme_id}", response_model=List[QuestionRead])
def read_questions_by_theme(theme_id: UUID, 
                             session: Session = Depends(get_session), 
                             current_user: User = Depends(get_current_user)):
    """
    Récupère les questions pour un thème spécifique.
    """
    query = select(Question).where(Question.themes_id == theme_id)
    questions = session.exec(query).all()
    if not questions:
        raise HTTPException(status_code=404, detail="Aucune question trouvée pour ce thème")
    return questions

@router.get("/{question_id}", response_model=QuestionRead)
def read_question(question_id: UUID, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Récupère une question par son id
    """
    question = session.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question

@router.get("/user/{user_id}", response_model=List[QuestionRead])
def read_questions_by_user(user_id: UUID, session: Session = Depends(get_session)):
    """
    Récupère toutes les questions d'un utilisateur spécifique
    """
    questions = session.exec(select(Question).where(Question.users_id == user_id)).all()
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found for this user")
    return questions

@router.post("/", response_model=QuestionRead)
def create_question(question: QuestionCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Créer une nouvelle question
    """
    db_question = Question(**question.dict())
    session.add(db_question)
    session.commit()
    session.refresh(db_question)
    return db_question

@router.put("/{question_id}", response_model=QuestionRead)
def update_question(question_id: UUID, question_update: QuestionUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Mettre à jour une question existante
    """
    question = session.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    update_data = question_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(question, key, value)
    session.add(question)
    session.commit()
    session.refresh(question)
    return question

@router.delete("/{question_id}")
def delete_question(question_id: UUID, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Supprimer une question
    """
    question = session.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    session.delete(question)
    session.commit()
    return {"detail": "Question deleted successfully"}
