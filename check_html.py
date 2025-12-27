import re

# 读取HTML文件
with open('obsidian_workshop.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 统计分类数量
category_count = len(re.findall(r'<section class="category-section"', content))

# 统计工具卡片数量
tool_card_count = len(re.findall(r'<div class="tool-card"', content))

print(f"分类数量: {category_count}")
print(f"工具卡片数量: {tool_card_count}")
