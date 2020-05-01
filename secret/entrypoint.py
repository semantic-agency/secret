import logging
import os

from cryptography.fernet import Fernet
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from secret.api import api
from secret.extensions import db, scheduler


def register_blueprints(app):
    """Register application blueprints."""
    app.register_blueprint(api)


def create_app(env=os.environ.get("FLASK_ENV")):
    """Application factory."""
    logging.basicConfig(
        level=logging.INFO,
        format=("[%(asctime)s] [sev %(levelno)s] [%(levelname)s] "
                "[%(name)s]> %(message)s"),
        datefmt="%a, %d %b %Y %H:%M:%S")

    # Disable werkzeug logging under WARNING.
    logging.getLogger("werkzeug").setLevel(logging.WARNING)

    app = Flask(__name__)

    app.logger.info(f"Loading env {env}")
    configurations = {
        "dev-local": "secret.config.DefaultConfig",
        "dev-docker": "secret.config.DockerConfig",
        "heroku": "secret.config.HerokuConfig",
        "production": "secret.config.ProductionConfig",
    }
    app.config.from_object(
        configurations.get(env, "secret.config.ProductionConfig"))

    db.init_app(app)
    scheduler.init_app(app)

    with app.app_context():
        register_blueprints(app)
        db.create_all()
        scheduler.start()

        from secret import views

    return app
