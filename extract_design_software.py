#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从奇迹秀工具箱网站提取设计软件相关的工具信息和logo
"""

import os
import requests
from bs4 import BeautifulSoup
import re

# 确保图标目录存在
os.makedirs('images', exist_ok=True)

# 奇迹秀工具箱URL
URL = 'https://www.qijishow.com/down/index.html'

# 设计软件分类映射
DESIGN_CATEGORIES = {
    '图形设计': ['Photoshop', 'Illustrator', 'GIMP', 'CorelDRAW', 'Inkscape'],
    'UI设计': ['Figma', 'Sketch', 'Adobe XD', 'Axure RP', 'InVision'],
    '3D设计': ['Blender', '3ds Max', 'Maya', 'Cinema 4D', 'ZBrush'],
    '视频编辑': ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'After Effects', 'Vegas Pro'],
    '音频处理': ['Audition', 'Audacity', 'Logic Pro', 'FL Studio', 'Ableton Live'],
    '原型设计': ['Figma', 'Sketch', 'Adobe XD', 'Axure RP', 'Protopie'],
    '矢量图形': ['Illustrator', 'CorelDRAW', 'Inkscape', 'Affinity Designer', 'Sketch']
}

# 获取网页内容
def get_page_content(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    response.encoding = response.apparent_encoding
    return response.text

# 提取工具信息
def extract_tool_info(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # 查找所有工具卡片
    tool_divs = soup.find_all('div', class_='tool')
    
    tools = []
    for tool_div in tool_divs:
        try:
            # 提取工具名称
            tool_title = tool_div.find('div', class_='tool-title')
            if not tool_title:
                continue
            name = tool_title.text.strip()
            
            # 提取工具描述
            tool_body = tool_div.find('div', class_='tool-body')
            description = tool_body.text.strip() if tool_body else ''
            
            # 提取工具图标
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
                icon_url = ''
            
            # 提取工具链接
            tool_link = tool_div.find('a', class_='tool-heading')
            url = tool_link['href'] if tool_link and 'href' in tool_link.attrs else '#'
            if url and not url.startswith('http'):
                url = f'https://www.qijishow.com/down/{url}'
            
            tools.append({
                'name': name,
                'description': description,
                'icon_url': icon_url,
                'url': url
            })
        except Exception as e:
            print(f"提取工具信息时出错: {e}")
            continue
    
    return tools

# 下载图标
def download_icon(icon_url, filename):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(icon_url, headers=headers, timeout=10)
        response.raise_for_status()
        
        with open(f'images/{filename}', 'wb') as f:
            f.write(response.content)
        print(f"成功下载图标: {filename}")
        return True
    except Exception as e:
        print(f"下载图标失败 {filename}: {e}")
        return False

# 生成HTML工具卡片
def generate_html_card(tool, category):
    # 生成图标文件名
    icon_filename = f"{tool['name'].replace(' ', '-').replace('/', '-').lower()}-icon.png"
    
    # 下载图标
    if tool['icon_url']:
        download_icon(tool['icon_url'], icon_filename)
    
    # 生成HTML卡片
    html = f'''
        <div class="tool-card" data-category="{category}" data-name="{tool['name']}">
            <div class="tool-header">
                <img src="images/{icon_filename}" alt="{tool['name']}" class="tool-icon" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiMxZjM0NjAiLz48cGF0aCBkPSJNMjUgNEwyNSA0NkwyNSA0eiIgZmlsbD0iI2U5NDU2MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4='">
                <div class="tool-info">
                    <div class="tool-name">{tool['name']}</div>
                    <a href="{tool['url']}" target="_blank" class="tool-url">{tool['url']}</a>
                </div>
            </div>
            <div class="tool-description">{tool['description']}</div>
            <div class="tool-footer">
                <span class="tool-category">{category}</span>
                <a href="{tool['url']}" target="_blank" class="tool-button">
                    <i class="fas fa-arrow-right"></i>
                    访问官网
                </a>
            </div>
        </div>
    '''
    
    return html

# 主函数
def main():
    print(f"正在访问奇迹秀工具箱: {URL}")
    html_content = get_page_content(URL)
    
    print("正在提取工具信息...")
    tools = extract_tool_info(html_content)
    
    print(f"共提取到 {len(tools)} 个工具")
    
    # 筛选设计软件工具
    design_tools = []
    for tool in tools:
        for category, keywords in DESIGN_CATEGORIES.items():
            if any(keyword in tool['name'] for keyword in keywords):
                design_tools.append((tool, category))
                break
    
    print(f"共找到 {len(design_tools)} 个设计软件工具")
    
    # 生成HTML工具卡片
    html_cards = []
    for tool, category in design_tools:
        html_card = generate_html_card(tool, category)
        html_cards.append(html_card)
    
    # 将生成的卡片保存到文件
    with open('design_tool_cards.html', 'w', encoding='utf-8') as f:
        f.write('\n'.join(html_cards))
    
    print("设计软件工具卡片已生成: design_tool_cards.html")
    print("请将生成的HTML卡片添加到 design_software.html 页面中")

if __name__ == "__main__":
    main()
