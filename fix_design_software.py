# 修复设计软件页面的脚本

with open('design_software.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 修复1：移除设计软件分类的导航标题
content = content.replace('<li class="nav-title">设计软件分类</li>', '')

# 修复2：移除可能存在的奇怪字符
content = content.replace('\x11', '')  # 移除ASCII控制字符0x11

# 修复3：确保main-content内部结构正确
# 确保aside和main标签正确嵌套
if '<aside class="sidebar">' in content and '<main class="content-area">' in content:
    # 修复可能存在的结构问题
    pass

# 保存修复后的HTML文件
with open('design_software.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("设计软件页面已修复！")
print("- 移除了设计软件分类的导航标题")
print("- 移除了奇怪的控制字符")
