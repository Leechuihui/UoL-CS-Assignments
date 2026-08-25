# CM2025 Computer Security 期中项目

伦敦大学计算机科学课程 CM2025 Cyber Security 期中大作业，主题为 Secure by Design。

完整报告见 [CM2025-Midterm-Report.pdf](CM2025-Midterm-Report.pdf)，博客版解读见[这里](https://blog.bgcbuilding.com/article.html?id=cm2025-midterm)。

## 作业内容

- Part A：运用 NIST CSF 框架分析 MOVEit 零日漏洞（CVE-2023-34362）与供应链攻击事件
- Part B：修复 Python 登录脚本中的 SQL 注入漏洞，消除硬编码凭据
- Part C：使用 PyCryptodome 实现 AES-256-CBC 加解密工具（PKCS7 填充 + 随机 IV）

## 代码说明

```
code/
├── vulnerable_login.py   原始漏洞脚本：字符串拼接 SQL，可被 ' OR '1'='1 绕过
├── secure_login.py       修复版本：参数化查询
├── aes_crypto.py         AES-256-CBC 加解密实现
├── secure_config.py      从环境变量读取配置
├── config_manager.py     配置管理辅助
├── init_test_db.py       初始化测试数据库
├── requirements.txt      依赖清单
└── .env.example          环境变量模板
```

仅供课程学习与授权实验环境使用。
