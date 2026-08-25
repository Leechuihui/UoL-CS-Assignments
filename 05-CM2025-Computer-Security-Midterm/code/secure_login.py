# secure_login.py - Fixed version with parameterized queries
import sqlite3
from pathlib import Path
from typing import Optional, Dict

DB_PATH = Path(__file__).resolve().parent / "users.db"

def authenticate_user(username: str, password: str) -> Optional[Dict]:
    """Secure user authentication using parameterized queries"""
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        # FIX 1: Parameterized query prevents SQL injection through value escaping
        query = "SELECT * FROM users WHERE username=? AND password=?"
        
        print(f"[DEBUG] Executing parameterized query")  # Shows the fix
        
        cursor.execute(query, (username, password))  # Values passed as tuple parameters
        result = cursor.fetchone()
        
        if result:
            return {"user_id": result[0], "role": result[3]}
        else:
            return None
    
    finally:
        conn.close()

# Test execution demonstrating vulnerability mitigation
if __name__ == "__main__":
    print("=" * 60)
    print("SQL Injection Fix - Parameterized Queries")
    print("=" * 60)
    
    # Normal authentication still works correctly
    user1 = authenticate_user("admin", "secret123")
    print(f"\nNormal login result: {user1}")
    
    # SQL injection attempt now treated as literal string value
    injected_input = "' OR '1'='1"
    admin_bypass = authenticate_user(injected_input, injected_input)
    print(f"\nInjection attack result (should be None): {admin_bypass}")
    
    if not admin_bypass:
        print("✓ VULNERABILITY FIXED - Injection treated as literal value!")
    else:
        print("✗ Fix failed")
