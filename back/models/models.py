''' Module contenant tous les modèles de données de l'application '''

from __future__ import annotations
from typing import Optional
from uuid import uuid4, UUID
from datetime import datetime, timezone
from pydantic import field_validator
from sqlmodel import SQLModel, Field, Relationship, Column, String, Text, DateTime, Integer

class User(SQLModel, table=True):
    id_user: UUID = Field(default_factory=uuid4, primary_key=True)
    firstname: str = Field(sa_column=Column(String(255), nullable=False))
    lastname: str = Field(sa_column=Column(String(255), nullable=False))
    email: str = Field(sa_column=Column(String(255), unique=True, nullable=False, index=True))
    password: str = Field(sa_column=Column(String(255), nullable=False))

    @field_validator("email")
    @classmethod
    def email_must_be_lowercase(cls, v: str) -> str:
        return v.lower()

    questions: list["Question"] = Relationship(back_populates="user")
    answers: list["Answer"] = Relationship(back_populates="user")


class Theme(SQLModel, table=True):
    id_theme: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(sa_column=Column(String(255), unique=True, nullable=False))

    questions: list["Question"] = Relationship(back_populates="theme")


class Question(SQLModel, table=True):
    id_question: UUID = Field(default_factory=uuid4, primary_key=True)
    content: str = Field(sa_column=Column(Text(), nullable=False))
    user_id: UUID = Field(foreign_key="user.id_user", nullable=False, index=True)
    theme_id: UUID = Field(foreign_key="theme.id_theme", nullable=False, index=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), sa_column=Column(DateTime(timezone=True), nullable=False))
    updated_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))

    user: User = Relationship(back_populates="questions")
    theme: Theme = Relationship(back_populates="questions")
    answers: list["Answer"] = Relationship(back_populates="question")


class Answer(SQLModel, table=True):
    id_answer: UUID = Field(default_factory=uuid4, primary_key=True)
    content: str = Field(sa_column=Column(Text(), nullable=False))
    nb_like: int = Field(default=0, sa_column=Column(Integer(), nullable=False))
    nb_dislike: int = Field(default=0, sa_column=Column(Integer(), nullable=False))
    user_id: UUID = Field(foreign_key="user.id_user", nullable=False)
    question_id: UUID = Field(foreign_key="question.id_question", nullable=False, index=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), sa_column=Column(DateTime(timezone=True), nullable=False))
    updated_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))

    user: User = Relationship(back_populates="answers")
    question: Question = Relationship(back_populates="answers")
