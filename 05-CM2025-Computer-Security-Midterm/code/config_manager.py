# config_manager.py - Hardcoded Credentials Vulnerability Demo
import os
from datetime import datetime

class DatabaseConfig:
    """Database configuration manager with hardcoded secrets"""
    
    # VULNERABILITY 2: Plaintext credentials embedded in source code
    DB_HOST = "db.production.company.com"
    DB_PORT = 5432
    DB_NAME = "customer_data"
    DB_USER = "app_service_account"
    DB_PASSWORD = "Pr0d!P@ssw0rd#2024!"  # Exposed in version control
    
    API_KEY = "sk-prod-7f8e9a1b2c3d4e5f6g7h8i9j0k"
    
    def __init__(self):
        self.connection_string = f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    def get_connection(self):
        """Establish database connection"""
        try:
            import psycopg2
            return psycopg2.connect(
                host=self.DB_HOST,
                port=self.DB_PORT,
                dbname=self.DB_NAME,
                user=self.DB_USER,
                password=self.DB_PASSWORD  # Hardcoded!
            )
        except ImportError:
            print("Note: Install psycopg2 for full functionality (pip install psycopg2-binary)")
            return None

def log_activity(user_action: str, details: str) -> None:
    """Activity logging function with plaintext sensitive data"""
    
    config = DatabaseConfig()
    conn = config.get_connection()
    if conn:
        cursor = conn.cursor()
        
        # VULNERABILITY 3: Sensitive data logged without encryption
        timestamp = datetime.now().isoformat()
        query = f"INSERT INTO activity_log VALUES ('{timestamp}', '{user_action}', '{details}')"
        print(f"[DEBUG] Executing log query: {query}")
        
        cursor.execute(query)
        conn.commit()

if __name__ == "__main__":
    print("=" * 60)
    print("Hardcoded Credentials Vulnerability Demo")
    print("=" * 60)
    
    config = DatabaseConfig()
    print(f"\nConnection string (password visible): {config.connection_string}")
    print(f"API Key: {config.API_KEY}")
    
    log_activity("USER_LOGIN", "admin accessed customer records with SSN=123-45-6789")
