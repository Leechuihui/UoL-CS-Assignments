# secure_config.py - Fixed version with environment variables and parameterized queries
import os
from typing import Optional, Dict
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class DatabaseConfig:
    """Secure database configuration manager"""
    
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = int(os.getenv("DB_PORT", "5432"))
    DB_NAME = os.getenv("DB_NAME", "customer_data")
    DB_USER = os.getenv("DB_USER", "app_service_account")
    # FIX 1: Password loaded from environment variable instead of hardcoded
    DB_PASSWORD = os.getenv("DB_PASSWORD")  
    
    API_KEY = os.getenv("API_KEY")
    
    def __init__(self):
        self.connection_string = f"postgresql://{self.DB_USER}:***@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"  # Masked in logs
    
    def get_connection(self) -> Optional:
        """Establish database connection with secure credentials"""
        try:
            import psycopg2
            return psycopg2.connect(
                host=self.DB_HOST,
                port=self.DB_PORT,
                dbname=self.DB_NAME,
                user=self.DB_USER,
                password=os.getenv("DB_PASSWORD")  # Retrieved at runtime only from environment
            )
        except ImportError:
            print("Note: Install psycopg2 for full functionality (pip install psycopg2-binary)")
            return None

def log_activity(user_action: str, details: str) -> None:
    """Secure activity logging with parameterized queries"""
    
    config = DatabaseConfig()
    conn = config.get_connection()
    if conn:
        cursor = conn.cursor()
        
        # FIX 2: Parameterized query prevents injection in audit trail
        timestamp = datetime.now().isoformat()
        query = "INSERT INTO activity_log VALUES (%s, %s, %s)"
        
        print(f"[DEBUG] Executing parameterized log query")
        cursor.execute(query, (timestamp, user_action, details))  # Values escaped properly
        
        conn.commit()

if __name__ == "__main__":
    print("=" * 60)
    print("Hardcoded Credentials Fix - Environment Variables")
    print("=" * 60)
    
    config = DatabaseConfig()
    print(f"\nConnection string (password masked): {config.connection_string}")
    print(f"API Key: {'***' if config.API_KEY else 'Not set'}")
    
    log_activity("USER_LOGIN", "admin accessed customer records with SSN=123-45-6789")
