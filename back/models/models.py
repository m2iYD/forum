''' Module contenant tous les modèles de données de l'application '''

from typing import Optional, List
from uuid import uuid4, UUID
from datetime import datetime, timezone
from pydantic import field_validator
from sqlmodel import SQLModel, Field, Relationship

class Author(SQLModel, table=True):
    id_author: UUID = Field(default_factory=uuid4, primary_key=True)
    firstname: str = Field(nullable=False, max_length=255)
    lastname: str = Field(nullable=False, max_length=255)
    email: str = Field(unique=True, nullable=False, index=True, max_length=255)
    password: str = Field(nullable=False, max_length=255)

    @field_validator("email")
    @classmethod
    def email_must_be_lowercase(cls, v: str) -> str:
        return v.lower()

    questions: List["Question"] = Relationship(back_populates="author")
    answers: List["Answer"] = Relationship(back_populates="author")


class Theme(SQLModel, table=True):
    id_theme: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(unique=True, nullable=False, max_length=255)

    questions: List["Question"] = Relationship(back_populates="theme")


class Question(SQLModel, table=True):
    id_question: UUID = Field(default_factory=uuid4, primary_key=True)
    content: str = Field(nullable=False)
    author_id: UUID = Field(foreign_key="author.id_author", nullable=False, index=True)
    theme_id: UUID = Field(foreign_key="theme.id_theme", nullable=False, index=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Optional[datetime] = Field(default=None)

    author: Author = Relationship(back_populates="questions")
    theme: Theme = Relationship(back_populates="questions")
    answers: List["Answer"] = Relationship(back_populates="question")


class Answer(SQLModel, table=True):
    id_answer: UUID = Field(default_factory=uuid4, primary_key=True)
    content: str = Field(nullable=False)
    nb_like: int = Field(default=0, nullable=False)
    nb_dislike: int = Field(default=0, nullable=False)
    author_id: UUID = Field(foreign_key="author.id_author", nullable=False)
    question_id: UUID = Field(foreign_key="question.id_question", nullable=False, index=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Optional[datetime] = Field(default=None)

    author: Author = Relationship(back_populates="answers")
    question: Question = Relationship(back_populates="answers")
