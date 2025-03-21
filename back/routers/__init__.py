''' Routers de l'application FastAPI '''

from routers.auth import router as auth_router
from routers.questions import router as questions_router
from routers.answers import router as answers_router
from routers.themes import router as themes_router

routers = [
    auth_router,
    questions_router,
    answers_router,
    themes_router
]
