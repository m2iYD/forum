from typing import Optional, List
from uuid import uuid4
from datetime import datetime, timezone
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship, Column, String, Integer, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID

class Token(BaseModel):
    access_token: str
    token_type: str

class User(SQLModel, table=True):
    id_users: Optional[uuid4] = Field(
        default_factory=uuid4,
        primary_key=True,
        sa_column=Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    )
    firstname: str = Field(sa_column=Column(String(255)))
    lastname: str = Field(sa_column=Column(String(255)))
    email: str = Field(sa_column=Column(String(255)))
    password: str = Field(sa_column=Column(String(255)))

    questions: List["Question"] = Relationship(back_populates="user")
    answers: List["Answer"] = Relationship(back_populates="user")

class Theme(SQLModel, table=True):
    id_themes: Optional[uuid4] = Field(
        default_factory=uuid4,
        primary_key=True,
        sa_column=Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    )
    name: str = Field(sa_column=Column(String(255)))

    questions: List["Question"] = Relationship(back_populates="theme")

class Question(SQLModel, table=True):
    id_questions: Optional[uuid4] = Field(
        default_factory=uuid4,
        primary_key=True,
        sa_column=Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    )
    content: str = Field(sa_column=Column(Text()))
    users_id: uuid4 = Field(foreign_key="user.id_users", sa_column=Column(UUID(as_uuid=True)))
    themes_id: uuid4 = Field(foreign_key="theme.id_themes", sa_column=Column(UUID(as_uuid=True)))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), sa_column=Column(DateTime(timezone=True)))
    updated_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))

    user: User = Relationship(back_populates="questions")
    theme: Theme = Relationship(back_populates="questions")

class Answer(SQLModel, table=True):
    id_answers: Optional[uuid4] = Field(
        default_factory=uuid4,
        primary_key=True,
        sa_column=Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    )
    content: str = Field(sa_column=Column(Text()))
    nb_like: int = Field(sa_column=Column(Integer()))
    nb_dislike: int = Field(sa_column=Column(Integer()))
    users_id: uuid4 = Field(foreign_key="user.id_users", sa_column=Column(UUID(as_uuid=True)))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), sa_column=Column(DateTime(timezone=True)))
    updated_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))

    user: User = Relationship(back_populates="answers")
