from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone
from uuid import UUID

# Schémas pour l'utilisateur
class UserBase(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr

class UserCreate(UserBase):
    password: str  # en clair, qui sera haché

class UserRead(UserBase):
    id_users: UUID

    class Config:
        orm_mode = True

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

# Schémas pour les questions (forum)
class QuestionBase(BaseModel):
    content: str
    themes_id: UUID

class QuestionCreate(QuestionBase):
    users_id: UUID

class QuestionUpdate(QuestionBase):
    pass

class QuestionRead(QuestionBase):
    id_questions: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    user: Optional[UserRead] = None

    class Config:
        orm_mode = True

# Schémas pour les réponses
class AnswerBase(BaseModel):
    content: str
    nb_like: int
    nb_dislike: int

class AnswerCreate(AnswerBase):
    users_id: UUID

class AnswerUpdate(AnswerBase):
    pass

class AnswerRead(AnswerBase):
    id_answers: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    user: Optional[UserRead] = None

    class Config:
        orm_mode = True

# Schémas pour les thèmes
class ThemeBase(BaseModel):
    name: str

class ThemeCreate(ThemeBase):
    pass

class ThemeRead(ThemeBase):
    id_themes: UUID

    class Config:
        orm_mode = True
