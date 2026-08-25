# 🛡️ CM2025 Computer Security — Midterm Project（计算机安全期中大作业）

> **University of London BSc Computer Science · CM2025 Cyber Security**
> 主题：**Secure by Design** —— 威胁情报分析、操作系统安全、代码级漏洞修复与实用密码学

📄 **[点此阅读完整期中报告 PDF](CM2025-Midterm-Report.pdf)** · [博客在线版（含中英双语解读）](https://blog.bgcbuilding.com/article.html?id=cm2025-midterm)

---

## 📋 作业内容概览

| 部分 | 主题 | 关键内容 |
|------|------|---------|
| **Part A** | 威胁情报分析 | 运用 **NIST CSF** 框架（识别/保护/检测/响应/恢复）分析 **MOVEit 零日漏洞（CVE-2023-34362）** 与朝鲜 APT 组织供应链攻击事件 |
| **Part B** | 代码级漏洞修复 | 修复 Python 登录脚本中的 **SQL 注入漏洞**；消除**硬编码凭据** |
| **Part C** | 实用密码学 | 使用 PyCryptodome 实现 **AES-256-CBC** 加解密工具（PKCS7 填充 + 随机 IV） |

## 💻 code/ 目录说明

```
code/
├── vulnerable_login.py   ← 原始漏洞脚本：字符串拼接 SQL，可用 ' OR '1'='1 绕过认证
├── secure_login.py       ← 修复版本：参数化查询（Parameterized Queries）
├── aes_crypto.py         ← AESCipher 类：AES-256-CBC + PKCS7 + 每次随机 16 字节 IV
├── secure_config.py      ← 安全配置加载：os.getenv() 从环境变量读取凭据
├── config_manager.py     ← 配置管理辅助
├── init_test_db.py       ← 初始化测试数据库 users.db
├── requirements.txt      ← 依赖：pycryptodome / python-dotenv / psycopg2-binary
├── .env.example          ← 环境变量模板（真实 .env 不入库！）
└── .gitignore            ← 排除 .env / users.db / venv 等
```

## 🚀 运行方式

```bash
cd code
pip install -r requirements.txt

# 1. 生成测试数据库
python init_test_db.py

# 2. 对比 SQL 注入漏洞与修复效果
python vulnerable_login.py   # ⚠️ 演示注入攻击成功（仅限学习）
python secure_login.py       # ✅ 注入被参数化查询拦截

# 3. AES 加解密演示
python aes_crypto.py
```

## 🔑 核心安全要点

1. **SQL 注入** → 参数化查询把用户输入严格当「数据」而非「可执行代码」
2. **硬编码凭据** → 迁移到环境变量（`.env` + `os.getenv()`），生产环境应使用 Vault / AWS Secrets Manager 等动态密钥管理
3. **AES-CBC 模式** → 每次加密使用随机 IV 保证密文唯一性，防重放与模式猜测
4. **供应链安全** → MOVEit 事件说明：第三方依赖需要 SBOM 动态追踪 + 零信任架构

> ⚠️ 本项目仅用于课程学习与授权实验环境。报告 PDF 与博客文章中的实战思考部分探讨了教科书漏洞与现代企业风控的差距。
