import re

# 读取文件
with open('index1_modified.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 定义替换规则
nav_replacements = [
    (r'href="https://ai-bot\.cn/favorites/ai-office-tools/"', 'href="#ai-office-tools"'),
    (r'href="https://ai-bot\.cn/favorites/ai-agent/"', 'href="#ai-agent"'),
    (r'href="https://ai-bot\.cn/favorites/ai-chatbots/"', 'href="#ai-chatbots"'),
    (r'href="https://ai-bot\.cn/favorites/ai-programming-tools/"', 'href="#ai-programming-tools"'),
    (r'href="https://ai-bot\.cn/favorites/ai-design-tools/"', 'href="#ai-design-tools"'),
    (r'href="https://ai-bot\.cn/favorites/ai-audio-tools/"', 'href="#ai-audio-tools"'),
    (r'href="https://ai-bot\.cn/favorites/ai-search-engines/"', 'href="#ai-search-engines"'),
    (r'href="https://ai-bot\.cn/favorites/ai-frameworks/"', 'href="#ai-frameworks"'),
    (r'href="https://ai-bot\.cn/favorites/websites-to-learn-ai/"', 'href="#websites-to-learn-ai"'),
    (r'href="https://ai-bot\.cn/favorites/ai-models/"', 'href="#ai-models"'),
    (r'href="https://ai-bot\.cn/favorites/ai-content-detection-and-optimization-tools/"', 'href="#ai-content-detection"'),
    (r'href="https://ai-bot\.cn/favorites/ai-prompt-tools/"', 'href="#ai-prompt-tools"'),
    (r'href="https://ai-bot\.cn/favorites/ai-writing-tools/"', 'href="#ai-writing-tools"'),
    (r'href="https://ai-bot\.cn/favorites/best-ai-image-tools/"', 'href="#best-ai-image-tools"'),
    (r'href="https://ai-bot\.cn/favorites/ai-image-generators/"', 'href="#ai-image-generators"'),
]

# 应用替换
for pattern, replacement in nav_replacements:
    content = re.sub(pattern, replacement, content)

# 保存文件
with open('index1_modified.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("导航链接已修复完成！")