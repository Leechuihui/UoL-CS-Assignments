# vulnerable_login.py - SQL Injection Vulnerability Demo
import sqlite3
from pathlib import Path
from typing import Optional, Dict

DB_PATH = Path(__file__).resolve().parent / "users.db"

def authenticate_user(username: str, password: str) -> Optional[Dict]:
    """User authentication function with SQL injection vulnerability"""
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        # VULNERABILITY 1: Direct string concatenation in query
        query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
        
        print(f"[DEBUG] Executing query: {query}")  # Shows the vulnerability
        
        cursor.execute(query)
        result = cursor.fetchone()
        
        if result:
            return {"user_id": result[0], "role": result[3]}
        else:
            return None
    
    finally:
        conn.close()

# Test execution demonstrating SQL injection vulnerability
if __name__ == "__main__":
    print("=" * 60)
    print("SQL Injection Vulnerability Demo")
    print("=" * 60)
    
    # Normal authentication with legitimate credentials
    user1 = authenticate_user("admin", "secret123")
    print(f"\nNormal login result: {user1}")
    
    # SQL injection bypass - attacker enters malicious input
    injected_input = "' OR '1'='1"
    admin_bypass = authenticate_user(injected_input, injected_input)
    print(f"\nInjection attack result (should be None): {admin_bypass}")
    
    if admin_bypass:
        print("✓ VULNERABILITY CONFIRMED - Admin access achieved without valid credentials!")
    else:
        print("✗ Injection failed")
