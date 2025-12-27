# 列出设计软件页面中的工具，查看需要添加图片的工具

import re

with open('design_software.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 匹配所有工具卡片
tool_cards = re.findall(r'<div class="tool-card"[^>]*>.*?</div>', content, flags=re.DOTALL)

print("设计软件页面中的工具列表：")
print("=" * 50)

for card in tool_cards:
    # 提取工具名称
    name_match = re.search(r'data-name="([^"]+)"', card)
    if name_match:
        tool_name = name_match.group(1)
        print(f"- {tool_name}")

print("=" * 50)
print(f"共找到 {len(tool_cards)} 个工具")
