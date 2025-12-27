#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从奇迹秀工具箱网站提取工具信息和图标URL，并下载这些图标
"""

import os
import re
import requests
from bs4 import BeautifulSoup

# 确保图标目录存在
os.makedirs('images', exist_ok=True)

# 读取HTML文件
with open('../tools.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# 使用BeautifulSoup解析HTML
soup = BeautifulSoup(html_content, 'html.parser')

# 提取所有工具信息
tools = []
tool_divs = soup.find_all('div', class_='tool')

for tool_div in tool_divs:
    try:
        # 提取工具图标URL
        img_tag = tool_div.find('img')
        if img_tag and 'data-src' in img_tag.attrs:
            icon_url = img_tag['data-src']
            # 确保图标URL是完整的
            if not icon_url.startswith('http'):
                if icon_url.startswith('//'):
                    icon_url = f'https:{icon_url}'
                elif icon_url.startswith('/'):
                    icon_url = f'https://www.qijishow.com{icon_url}'
                else:
                    icon_url = f'https://www.qijishow.com/down/{icon_url}'
        else:
            continue
        
        # 提取工具名称
        tool_title_tag = tool_div.find('div', class_='tool-title')
        if not tool_title_tag:
            continue
        tool_name = tool_title_tag.text.strip()
        
        # 提取工具描述
        tool_body_tag = tool_div.find('div', class_='tool-body')
        tool_description = tool_body_tag.text.strip() if tool_body_tag else ''
        
        # 提取工具平台
        tool_platform_tag = tool_div.find('div', class_='tool-platform')
        tool_platform = tool_platform_tag.text.strip() if tool_platform_tag else ''
        
        tools.append({
            'name': tool_name,
            'description': tool_description,
            'platform': tool_platform,
            'icon_url': icon_url
        })
    except Exception as e:
        print(f"提取工具信息时出错: {e}")
        continue

print(f"共提取到 {len(tools)} 个工具")

# 下载图标
for tool in tools:
    try:
        # 生成图标文件名
        icon_filename = f"{tool['name'].replace(' ', '-').replace('/', '-').lower()}-icon.png"
        icon_path = os.path.join('images', icon_filename)
        
        # 如果图标已经存在，跳过下载
        if os.path.exists(icon_path):
            print(f"图标已存在，跳过下载: {icon_filename}")
            continue
        
        # 下载图标
        print(f"下载图标: {tool['name']} -> {icon_filename}")
        response = requests.get(tool['icon_url'], timeout=10)
        response.raise_for_status()
        
        # 保存图标
        with open(icon_path, 'wb') as f:
            f.write(response.content)
            
        print(f"图标下载成功: {icon_filename}")
    except Exception as e:
        print(f"下载图标时出错 {tool['name']}: {e}")
        continue

print("所有图标下载完成")
