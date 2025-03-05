''' Routers de l'application FastAPI '''

from .auth import router as auth_router
from .questions import router as questions_router
from .answers import router as answers_router

routes = [
    auth_router,
    questions_router,
    answers_router
]
