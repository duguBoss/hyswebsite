# 修复main区域顶部空白的脚本

with open('obsidian_workshop.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复main区域顶部的空白和控制字符
# 查找模式：<main class="content-area">\n\n            \n                <!-- 页面标题 -->
fixed_content = content.replace('<main class="content-area">\n\n            \n                <!-- 页面标题 -->', '<main class="content-area">\n                <!-- 页面标题 -->')

# 保存修复后的HTML文件
with open('obsidian_workshop.html', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("已修复main区域顶部空白行！")