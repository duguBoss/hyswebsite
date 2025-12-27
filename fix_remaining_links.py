import re

# 读取文件
with open('index1_modified.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 定义替换规则
additional_replacements = [
    (r'href="https://ai-bot\.cn/ai-app-store/"', 'href="#ai-app-store"'),
    (r'href="https://ai-bot\.cn/daily-ai-news/"', 'href="#daily-ai-news"'),
    (r'href="https://ai-bot\.cn/the-latest-ai-projects/"', 'href="#the-latest-ai-projects"'),
    (r'href="https://ai-bot\.cn/ai-tools/"', 'href="#ai-tools"'),
    (r'href="https://ai-bot\.cn/ai-research/"', 'href="#ai-research"'),
    (r'href="https://ai-bot\.cn/ai-tutorials/"', 'href="#ai-tutorials"'),
    (r'href="https://ai-bot\.cn/ai-column/"', 'href="#ai-column"'),
    (r'href="https://ai-bot\.cn/ai-question-and-answer/"', 'href="#ai-question-and-answer"'),
    (r'href="https://ai-bot\.cn/ai-encyclopedia/"', 'href="#ai-encyclopedia"'),
    (r'href="https://ai-bot\.cn/ai-hall-of-fame/"', 'href="#ai-hall-of-fame"'),
]

# 应用替换
for pattern, replacement in additional_replacements:
    content = re.sub(pattern, replacement, content)

# 保存文件
with open('index1_modified.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("剩余导航链接已修复完成！")