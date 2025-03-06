''' Module contenant tous les schémas de données de l'application '''

from __future__ import annotations
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from uuid import UUID

# Schémas pour l'auteur
class AuthorBase(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr

class AuthorCreate(AuthorBase):
    password: str  # en clair, qui sera haché

class AuthorRead(AuthorBase):
    id_author: UUID #Utilisation de id_author au lieu de id_user

    class Config:
        from_attributes = True

class Author(AuthorRead):
    password: Optional[str] = None
    username: Optional[str] = None

class AuthorLogin(BaseModel):
    email: EmailStr
    password: str

# Schéma pour la mise à jour du mot de passe
class PasswordUpdate(BaseModel):
    old_password: str
    new_password: str

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

class ThemeUpdate(ThemeBase):
    name: Optional[str] = None

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
    author_id: UUID #utilisation de author_id

class AnswerUpdate(AnswerBase):
    pass

class AnswerRead(AnswerBase):
    id_answer: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    author: Optional[AuthorRead] = None #utilisation de AuthorRead

    class Config:
        from_attributes = True

# Schémas pour les questions (forum)
class QuestionBase(BaseModel):
    content: str
    theme_id: UUID #utilisation de theme_id

class QuestionCreate(QuestionBase):
    author_id: UUID #utilisation de author_id

class QuestionUpdate(QuestionBase):
    pass

class QuestionRead(QuestionBase):
    id_question: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    author: Optional[AuthorRead] = None #utilisation de AuthorRead
    theme: Optional[ThemeRead] = None
    answers: List[AnswerRead] = []

    class Config:
        from_attributes = True
