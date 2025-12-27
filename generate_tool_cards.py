#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成AI工具卡片的脚本
从Markdown文件中解析AI工具数据，生成HTML卡片代码
"""

import re
import os


class AIToolsParser:
    """AI工具解析器，从Markdown文件中提取工具数据"""
    
    def __init__(self, markdown_file):
        self.markdown_file = markdown_file
        self.tools_by_category = {}
        self.categories = []
    
    def parse(self):
        """解析Markdown文件，提取工具数据"""
        with open(self.markdown_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 使用非贪婪匹配，确保每个分类都被正确提取
        # 匹配格式：## 分类名
        # 空行
        # 表格内容（直到下一个## 分类或文件结束）
        category_pattern = r'##\s*([^\n]+)\s*\n\n((?:.*?)(?=##\s*[^\n]+\s*\n\n|$))'
        matches = re.findall(category_pattern, content, re.DOTALL)
        
        for match in matches:
            # 提取分类标题和表格内容
            if isinstance(match, tuple) and len(match) == 2:
                category_title, table_content = match
            else:
                continue
            
            # 提取分类名称（去除emoji和特殊字符）
            category_name = re.sub(r'[\s\u200b]*[\u2700-\u27bf\u1f300-\u1f5ff\u1f600-\u1f64f\u1f680-\u1f6ff\u2600-\u26ff\u2b50\u2b55]', '', category_title).strip()
            
            if not category_name or category_name in ['---', 'AI工具集分类整理']:
                continue
            
            # 解析表格
            tools = self._parse_table(table_content)
            if tools:
                self.tools_by_category[category_name] = tools
                self.categories.append(category_name)
        
        print(f"✓ 解析完成，共找到 {len(self.categories)} 个分类，{sum(len(tools) for tools in self.tools_by_category.values())} 个工具")
    
    def _parse_table(self, table_content):
        """解析表格内容，提取工具数据"""
        tools = []
        lines = table_content.strip().split('\n')
        
        # 跳过表头和分隔线
        data_lines = []
        for line in lines:
            line = line.strip()
            if line and not line.startswith('| 工具名称') and not line.startswith('|---------'):
                data_lines.append(line)
        
        for line in data_lines:
            # 解析表格行
            columns = re.split(r'\s*\|\s*', line.strip())[1:-1]  # 去除首尾的空字符串
            
            if len(columns) < 4:
                continue
            
            name = columns[0].strip()
            url = columns[1].strip()
            icon = columns[2].strip()
            description = columns[3].strip()
            
            if name and url:
                tools.append({
                    'name': name,
                    'url': url,
                    'icon': icon,
                    'description': description
                })
        
        return tools
    
    def generate_html_cards(self):
        """生成HTML卡片代码"""
        html = ''
        
        for category, tools in self.tools_by_category.items():
            # 生成分类标题
            category_icon = self._get_category_icon(category)
            html += f'\n<!-- {category} -->\n'
            html += f'<section class="category-section" data-category="{category}">\n'
            html += f'    <h2 class="category-title">\n'
            html += f'        <i class="{category_icon} category-icon"></i>\n'
            html += f'        {category}\n'
            html += f'    </h2>\n'
            html += f'    <div class="tools-grid">\n'
            
            # 生成工具卡片
            for tool in tools:
                html += self._generate_tool_card(tool, category)
            
            html += f'    </div>\n'
            html += f'</section>\n'
        
        return html
    
    def _get_category_icon(self, category):
        """根据分类名称获取对应的Font Awesome图标"""
        icon_map = {
            '热门推荐工具': 'fas fa-fire',
            'AI办公工具': 'fas fa-briefcase',
            'AI效率提升': 'fas fa-rocket',
            'AI编程工具': 'fas fa-code',
            'AI写作工具': 'fas fa-pen-fancy',
            'AI图像工具': 'fas fa-image',
            '其他工具': 'fas fa-tools',
            'AI搜索工具': 'fas fa-search',
            'AI教育工具': 'fas fa-graduation-cap',
            'AI模型': 'fas fa-brain',
            'AI评测工具': 'fas fa-chart-line',
            'AI提示词工具': 'fas fa-keyboard',
        }
        
        for key, icon in icon_map.items():
            if key in category:
                return icon
        
        return 'fas fa-th-large'  # 默认图标
    
    def _generate_tool_card(self, tool, category):
        """生成单个工具卡片的HTML代码"""
        name = tool['name']
        url = tool['url']
        icon = tool['icon']
        description = tool['description']
        
        # 处理默认图标
        default_icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiMxZjM0NjAiLz48cGF0aCBkPSJNMjUgNEwyNSA0NkwyNSA0eiIgZmlsbD0iI2U5NDU2MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4='
        
        # 处理图标路径
        if not icon:
            icon = default_icon
        elif icon.startswith('http'):
            # 使用完整URL
            pass
        elif not icon.startswith('data:image'):
            # 确保路径正确
            # 移除可能存在的hysaitool/前缀，因为HTTP服务器已经在hysaitool目录下启动
            if icon.startswith('hysaitool/'):
                icon = icon.replace('hysaitool/', '')
            # 如果图标路径是完整的绝对路径，保持不变
            # 否则，确保它是相对于hysaitool目录的路径
            pass
        
        # 生成卡片HTML
        card_html = f'''
            <!-- {name} -->
            <div class="tool-card" data-category="{category}" data-name="{name}">
                <div class="tool-header">
                    <img src="{icon}" alt="{name}" class="tool-icon" onerror="this.src='{default_icon}'">
                    <div class="tool-info">
                        <div class="tool-name">{name}</div>
                        <a href="{url}" target="_blank" class="tool-url">{url}</a>
                    </div>
                </div>
                <div class="tool-description">{description}</div>
                <div class="tool-footer">
                    <span class="tool-category">{category}</span>
                    <a href="{url}" target="_blank" class="tool-button">
                        <i class="fas fa-arrow-right"></i>
                        访问工具
                    </a>
                </div>
            </div>
        '''
        
        return card_html
    
    def generate_sidebar_nav(self):
        """生成侧边栏导航HTML"""
        nav_html = '''
                    <li class="nav-title">AI工具分类</li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-category="all">
                            <i class="fas fa-th-large nav-icon"></i>
                            <span>全部工具</span>
                        </a>
                    </li>
        '''
        
        for category in self.categories:
            icon = self._get_category_icon(category)
            nav_html += f'''
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-category="{category}">
                            <i class="{icon} nav-icon"></i>
                            <span>{category}</span>
                        </a>
                    </li>
            '''
        
        return nav_html


def update_html_file(html_file, parser):
    """更新HTML文件，添加生成的工具卡片"""
    # 读取现有HTML文件
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 生成新的HTML内容
    html_cards = parser.generate_html_cards()
    sidebar_nav = parser.generate_sidebar_nav()
    
    # 更新侧边栏导航
    new_content = re.sub(r'<ul class="sidebar-nav">.*?</ul>', f'<ul class="sidebar-nav">{sidebar_nav}</ul>', 
                       content, flags=re.DOTALL)
    
    # 更新工具卡片
    # 从第一个分类section开始替换到</main>标签
    cards_pattern = r'(<section class="category-section".*?)(</main>)'
    new_content = re.sub(cards_pattern, f'{html_cards}\\2', 
                       new_content, flags=re.DOTALL)
    
    # 保存更新后的HTML文件
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ HTML文件已更新: {html_file}")


def main():
    """主函数"""
    print("AI工具卡片生成器")
    print("=" * 50)
    
    # 配置文件路径
    markdown_file = '../AI工具集分类整理_最终版.md'
    html_file = 'obsidian_workshop.html'
    
    if not os.path.exists(markdown_file):
        print(f"✗ 错误：找不到Markdown文件 {markdown_file}")
        return
    
    if not os.path.exists(html_file):
        print(f"✗ 错误：找不到HTML文件 {html_file}")
        return
    
    # 解析Markdown文件
    parser = AIToolsParser(markdown_file)
    parser.parse()
    
    if not parser.tools_by_category:
        print("✗ 错误：未找到任何工具数据")
        return
    
    # 更新HTML文件
    update_html_file(html_file, parser)
    
    print("\n✅ 所有操作完成！")
    print(f"📊 统计信息：")
    print(f"   - 分类数量：{len(parser.categories)}")
    print(f"   - 工具总数：{sum(len(tools) for tools in parser.tools_by_category.values())}")
    print(f"   - 生成的HTML卡片：{sum(len(tools) for tools in parser.tools_by_category.values())}")


if __name__ == "__main__":
    main()