# 修复HTML文件结构的脚本

with open('obsidian_workshop.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 修复主内容区域结构
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

# 移除奇怪的字符
content = content.replace('\x11', '')  # 移除ASCII控制字符0x11

# 添加缺失的<aside>开始标签
if '<aside class="sidebar">' not in content:
    content = content.replace('<ul class="sidebar-nav">', '<aside class="sidebar">\n\t\t\t\t<ul class="sidebar-nav">')

# 添加缺失的<main>开始标签
if '<main class="content-area">' not in content:
    content = content.replace('</aside>', '</aside>\n\t\t\t<main class="content-area">')

# 保存修复后的HTML文件
with open('obsidian_workshop.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML文件结构已修复！")
print("- 移除了奇怪的控制字符")
print("- 添加了缺失的<aside class=\"sidebar\">开始标签")
print("- 添加了缺失的<main class=\"content-area\">开始标签")
