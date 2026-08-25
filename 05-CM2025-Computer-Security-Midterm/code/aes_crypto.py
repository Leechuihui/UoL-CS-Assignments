#!/usr/bin/env python3
# aes_crypto.py - Advanced Encryption Standard implementation using PyCryptodome

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import os
import base64

class AESCipher:
    """AES-256-CBC encryption/decryption with PKCS7 padding"""
    
    def __init__(self):
        self.key = None  # Will be set during initialization
    
    def generate_key(self) -> bytes:
        """Generate random 32-byte key for AES-256 (256 bits = 32 bytes)"""
        return os.urandom(32)
    
    def encrypt(self, plaintext: str, key: bytes) -> str:
        """Encrypt text using AES-CBC mode with PKCS7 padding
        
        Args:
            plaintext: String to be encrypted
            key: 32-byte encryption key
            
        Returns:
            Base64-encoded ciphertext including IV prefix for decryption
        """
        
        # Generate random initialization vector (16 bytes = AES block size)
        iv = os.urandom(16)
        
        # Create cipher object with CBC mode and provided parameters
        cipher = AES.new(key, AES.MODE_CBC, iv)
        
        # Pad plaintext to match AES block size requirements (multiples of 16 bytes)
        padded_data = pad(plaintext.encode('utf-8'), AES.block_size)
        
        # Perform encryption on padded data blocks
        ciphertext = cipher.encrypt(padded_data)
        
        # Combine IV and ciphertext for storage/transmission
        encrypted_blob = iv + ciphertext
        
        return base64.b64encode(encrypted_blob).decode('utf-8')
    
    def decrypt(self, ciphertext_b64: str, key: bytes) -> str:
        """Decrypt AES-CBC encrypted text with PKCS7 padding removal
        
        Args:
            ciphertext_b64: Base64-encoded ciphertext (includes IV prefix)
            key: 32-byte decryption key matching encryption key
            
        Returns:
            Decrypted plaintext string
        """
        
        # Convert base64 back to binary format for processing
        encrypted_blob = base64.b64decode(ciphertext_b64.encode('utf-8'))
        
        # Extract IV from first 16 bytes (stored during encryption)
        iv = encrypted_blob[:16]
        
        # Retrieve actual ciphertext data after IV prefix
        ciphertext = encrypted_blob[16:]
        
        # Recreate cipher object with matching parameters for decryption
        cipher = AES.new(key, AES.MODE_CBC, iv)
        
        # Decrypt the ciphertext blocks
        decrypted_padded = cipher.decrypt(ciphertext)
        
        # Remove PKCS7 padding to recover original plaintext length
        plaintext = unpad(decrypted_padded, AES.block_size).decode('utf-8')
        
        return plaintext

# Demonstration of encryption/decryption workflow
if __name__ == "__main__":
    print("=" * 60)
    print("AES-256-CBC Encryption Demo")
    print("=" * 60)
    
    # Initialize cipher object and generate secure random key
    crypto = AESCipher()
    encryption_key = crypto.generate_key()
    
    print(f"\nGenerated Key (hex): {encryption_key.hex()}")
    print(f"Key Length: {len(encryption_key)} bytes ({len(encryption_key)*8} bits)")
    
    # Original plaintext message to be encrypted
    original_message = "Confidential customer data: Account#12345, Balance=$9,876.50"
    print(f"\nOriginal Plaintext:\n{original_message}")
    
    # Encrypt the message using generated key and random IV
    encrypted_result = crypto.encrypt(original_message, encryption_key)
    print(f"\nEncrypted Result (Base64):\n{encrypted_result}")
    
    # Decrypt back to original form for verification
    decrypted_text = crypto.decrypt(encrypted_result, encryption_key)
    print(f"\nDecrypted Text:\n{decrypted_text}")
    
    # Verify round-trip integrity through string comparison
    is_identical = (original_message == decrypted_text)
    print(f"\nIntegrity Check: {'PASS' if is_identical else 'FAIL'}")
