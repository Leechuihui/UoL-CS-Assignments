# init_test_db.py - Create test database for SQL injection demo
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "users.db"

def create_test_database():
    """Create a simple users table with sample data"""
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        )
    ''')
    
    # Insert sample data if not exists
    sample_users = [
        ('admin', 'secret123', 'administrator'),
        ('john_doe', 'password456', 'user'),
        ('jane_smith', 'mypassword789', 'manager')
    ]
    
    for username, password, role in sample_users:
        cursor.execute('''
            INSERT OR IGNORE INTO users (username, password, role) 
            VALUES (?, ?, ?)
        ''', (username, password, role))
    
    conn.commit()
    print("✓ Test database 'users.db' created successfully!")
    print(f"  Sample users: {len(sample_users)} accounts")
    
    # Display table structure
    cursor.execute("PRAGMA table_info(users)")
    columns = cursor.fetchall()
    print("\nTable schema:")
    for col in columns:
        print(f"  - {col[1]} ({col[2]})")
    
    conn.close()

if __name__ == "__main__":
    create_test_database()
