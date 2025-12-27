# 修复设计软件页面main标签类名的脚本

with open('design_software.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复main标签的类名，从content改为content-area
content = content.replace('<main class="content">', '<main class="content-area">')

# 保存修复后的HTML文件
with open('design_software.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("设计软件页面main标签类名已修复！")
print("- 将main标签的类名从content改为content-area")
