# 更新设计软件工具图片路径的脚本
# 使用说明：
# 1. 将工具logo图片下载到 hysaitool/images/ 目录下
# 2. 图片命名格式：工具名称的小写形式，例如 photoshop-icon.png
# 3. 运行此脚本，自动更新HTML文件中的图片路径

import re

with open('design_software.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 工具名称到图片路径的映射
# 请根据实际下载的图片名称修改此处的映射关系
tool_images = {
    'Photoshop': 'images/photoshop-icon.png',
    'Illustrator': 'images/illustrator-icon.png',
    'GIMP': 'images/gimp-icon.png',
    'Figma': 'images/figma-icon.png',
    'Sketch': 'images/sketch-icon.png',
    'Adobe XD': 'images/adobe-xd-icon.png',
    'Blender': 'images/blender-icon.png',
    '3ds Max': 'images/3ds-max-icon.png',
    'Maya': 'images/maya-icon.png'
}

# 更新每个工具的图片路径
for tool_name, image_path in tool_images.items():
    # 匹配工具卡片中的img标签
    pattern = fr'(<div class="tool-card"[^>]*data-name="{tool_name}"[^>]*>.*?<img src=")([^"]+)(" alt="{tool_name}")'
    content = re.sub(pattern, fr'\1{image_path}\3', content, flags=re.DOTALL)

# 保存更新后的HTML文件
with open('design_software.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("设计软件工具图片路径已更新！")
print("=" * 50)
print("更新的工具和图片路径：")
for tool_name, image_path in tool_images.items():
    print(f"- {tool_name}: {image_path}")
print("=" * 50)
print("使用说明：")
print("1. 请将工具logo图片下载到 hysaitool/images/ 目录下")
print("2. 图片命名格式：工具名称的小写形式，例如 photoshop-icon.png")
print("3. 如需修改图片路径，请编辑此脚本中的 tool_images 字典")
print("4. 再次运行此脚本以更新HTML文件")
