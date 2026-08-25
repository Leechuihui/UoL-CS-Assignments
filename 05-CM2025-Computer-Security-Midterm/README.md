# CM2025 Computer Security Midterm

Midterm project for CM2025 Cyber Security at the University of London, themed Secure by Design.

Full report: [CM2025-Midterm-Report.pdf](CM2025-Midterm-Report.pdf). A blog write-up is available [here](https://blog.bgcbuilding.com/article.html?id=cm2025-midterm).

## Scope

- Part A: threat intelligence analysis of the MOVEit zero-day (CVE-2023-34362) and supply-chain attacks, applying the NIST CSF framework
- Part B: fixing a SQL injection vulnerability in a Python login script and removing hardcoded credentials
- Part C: AES-256-CBC encryption tool implemented with PyCryptodome (PKCS7 padding + random IV)

## Code

```
code/
├── vulnerable_login.py   original script: string-concatenated SQL, bypassable via ' OR '1'='1
├── secure_login.py       fixed version: parameterized queries
├── aes_crypto.py         AES-256-CBC encryption/decryption
├── secure_config.py      loads configuration from environment variables
├── config_manager.py     config helper
├── init_test_db.py       creates the test database
├── requirements.txt      dependencies
└── .env.example          environment variable template
```

For coursework study and authorized lab use only.
