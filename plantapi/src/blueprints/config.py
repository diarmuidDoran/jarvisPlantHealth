# config.py
import os

APP_ENV = os.getenv("APP_ENV", "development")
DATABASE_USERNAME = os.getenv("DATABASE_USERNAME", "postgres")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD", "unopassword")
DATABASE_HOST = os.getenv("DATABASE_HOST", "localhost")
DATABASE_NAME = os.getenv("DATABASE_NAME", "jarvis_db")
TEST_DATABASE_NAME = os.getenv("DATABASE_NAME", "test_jarvis_db")

# postgresConn='postgresql://<user>:<password>@localhost'
postgresConn = "postgresql://postgres:unopassword@localhost"
