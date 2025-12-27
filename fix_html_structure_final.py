# 修复HTML文件结构的最终脚本
import re

with open('obsidian_workshop.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复主内容区域结构
# 移除奇怪的字符
content = content.replace('\x11', '')  # 移除ASCII控制字符0x11

# 修复main-content结构，确保正确嵌套
# 正确的结构应该是：
# <div class="main-content">
#     <aside class="sidebar">
#         <ul class="sidebar-nav">...</ul>
#     </aside>
#     <main class="content-area">
#         <!-- 页面标题、统计信息、搜索栏 -->
#         <!-- 分类和工具卡片 -->
#     </main>
# </div>

# 修复main-content内部结构
main_content_pattern = r'<div class="main-content">\s*\n\s*\t*(.*?)\s*\n\t*<aside class="sidebar">\s*\n\t*\t*(.*?)\s*\n\t*\t*</aside>\s*\n\t*\t*<main class="content-area">'
fixed_content = re.sub(main_content_pattern, '<div class="main-content">\n\t\t<aside class="sidebar">\n\t\t\t\1\2\n\t\t</aside>\n\t\t<main class="content-area">', content, flags=re.DOTALL)

# 保存修复后的HTML文件
with open('obsidian_workshop.html', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("HTML文件结构已修复！")
print("- 移除了奇怪的控制字符")
print("- 修复了main-content内部的标签嵌套结构")
