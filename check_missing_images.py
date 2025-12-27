#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查HTML中引用的图片是否存在于images目录中
"""

import os
import re

# 读取HTML文件
def read_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

# 提取HTML中的图片URL
def extract_image_urls(html_content):
    # 匹配<img>标签中的src属性
    img_pattern = r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>'
    img_urls = re.findall(img_pattern, html_content)
    return img_urls

# 过滤出本地图片URL
def filter_local_images(img_urls):
    local_images = []
    for url in img_urls:
        # 只保留本地图片（以images/开头）
        if url.startswith('images/'):
            local_images.append(url)
    return local_images

# 检查图片是否存在
def check_images_exist(image_paths):
    existing_images = []
    missing_images = []
    
    for img_path in image_paths:
        if os.path.exists(img_path):
            existing_images.append(img_path)
        else:
            missing_images.append(img_path)
    
    return existing_images, missing_images

# 主函数
def main():
    # 检查AI软件页面
    print("检查 obsidian_workshop.html 中的图片：")
    ai_html = read_html_file('obsidian_workshop.html')
    ai_img_urls = extract_image_urls(ai_html)
    ai_local_images = filter_local_images(ai_img_urls)
    ai_existing, ai_missing = check_images_exist(ai_local_images)
    
    print(f"存在的图片 ({len(ai_existing)} 个):")
    for img in ai_existing[:10]:  # 只显示前10个
        print(f"  - {img}")
    if len(ai_existing) > 10:
        print(f"  ... 以及 {len(ai_existing) - 10} 个更多图片")
    
    print(f"\n缺失的图片 ({len(ai_missing)} 个):")
    for img in ai_missing:
        print(f"  - {img}")
    
    # 检查设计软件页面
    print("\n\n检查 design_software.html 中的图片：")
    design_html = read_html_file('design_software.html')
    design_img_urls = extract_image_urls(design_html)
    design_local_images = filter_local_images(design_img_urls)
    design_existing, design_missing = check_images_exist(design_local_images)
    
    print(f"存在的图片 ({len(design_existing)} 个):")
    for img in design_existing:
        print(f"  - {img}")
    
    print(f"\n缺失的图片 ({len(design_missing)} 个):")
    for img in design_missing:
        print(f"  - {img}")

if __name__ == "__main__":
    main()
