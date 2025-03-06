''' Module contenant tous les schémas de données de l'application '''

from __future__ import annotations
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from uuid import UUID

# Schémas pour l'utilisateur
class UserBase(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr

class UserCreate(UserBase):
    password: str  # en clair, qui sera haché

class UserRead(UserBase):
    id_user: UUID

    class Config:
        from_attributes = True

class User(UserRead):
    password: Optional[str] = None
    username: Optional[str] = None

# Schéma pour la mise à jour du mot de passe
class PasswordUpdate(BaseModel):
    old_password: str
    new_password: str

# Schémas pour l'authentification (existant)
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Schémas pour les thèmes
class ThemeBase(BaseModel):
    name: str

class ThemeCreate(ThemeBase):
    pass

class ThemeRead(ThemeBase):
    id_theme: UUID

    class Config:
        from_attributes = True

# Schémas pour les réponses
class AnswerBase(BaseModel):
    content: str
    nb_like: int
    nb_dislike: int

class AnswerCreate(AnswerBase):
    user_id: UUID

class AnswerUpdate(AnswerBase):
    pass

class AnswerRead(AnswerBase):
    id_answer: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    user: Optional[UserRead] = None

    class Config:
        from_attributes = True

# Schémas pour les questions (forum)
class QuestionBase(BaseModel):
    content: str
    themes_id: UUID

class QuestionCreate(QuestionBase):
    user_id: UUID

class QuestionUpdate(QuestionBase):
    pass

class QuestionRead(QuestionBase):
    id_question: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    user: Optional[UserRead] = None
    theme: Optional[ThemeRead] = None
    answers: List[AnswerRead] = []

    class Config:
        from_attributes = True
