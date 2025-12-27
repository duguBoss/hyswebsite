# 移除AI工具分类导航标题的脚本

with open('obsidian_workshop.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 移除AI工具分类的li元素
fixed_content = content.replace('<li class="nav-title">AI工具分类</li>', '')

# 保存修复后的HTML文件
with open('obsidian_workshop.html', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("已移除AI工具分类的导航标题！")
