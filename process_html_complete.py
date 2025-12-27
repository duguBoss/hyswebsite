import re
import os

def process_html_file():
    # 读取原始文件
    with open('e:/myplan/workflow2uploadimage/hysaitool/index1.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 将所有静态资源改为本地资源
    # 替换CSS文件
    content = re.sub(r'href="https://ai-bot\.cn/wp-content/themes/onenav/css/([^"]+)"', r'href="css/\1"', content)
    content = re.sub(r'href="https://ai-bot\.cn/wp-includes/css/([^"]+)"', r'href="css/\1"', content)
    content = re.sub(r'src="https://ai-bot\.cn/wp-content/themes/onenav/js/([^"]+)"', r'src="js/\1"', content)
    
    # 替换图片文件
    content = re.sub(r'src="https://ai-bot\.cn/wp-content/uploads/([^"]+)"', r'src="images/\1"', content)
    content = re.sub(r'href="https://ai-bot\.cn/wp-content/uploads/([^"]+)"', r'href="images/\1"', content)
    
    # 替换背景图片URL
    content = re.sub(r'url\(https://ai-bot\.cn/wp-content/uploads/([^\)]+)\)', r'url(images/\1)', content)
    
    # 替换CDN资源
    content = re.sub(r'href="//cdn\.staticfile\.org/([^"]+)"', r'href="cdn/\1"', content)
    content = re.sub(r'src="//cdn\.staticfile\.org/([^"]+)"', r'src="cdn/\1"', content)
    
    # 2. 清空所有访问外链的脚本
    # 移除Google Ads脚本
    content = re.sub(r'<script async src="https://pagead2\.googlesyndication\.com[^"]*"[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    
    # 移除其他外链脚本（包括那些创建script标签的脚本）
    content = re.sub(r'<script[^>]*>\s*\(function\(\)\s*{[^}]*var el = document\.createElement\("script"\);[^}]*el\.src = "https://lf1-cdn-tos\.bytegoofy\.com[^"]*"[^}]*}\)\(window\)\s*</script>', '', content, flags=re.DOTALL)
    
    # 移除所有包含外链脚本的script标签
    content = re.sub(r'<script[^>]*src="https://[^"]*"[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    
    # 移除百度统计脚本
    content = re.sub(r'<script[^>]*>[^<]*hm\.src = "https://hm\.baidu\.com[^"]*"[^<]*</script>', '', content, flags=re.DOTALL)
    
    # 3. 将a标签的href地址替换为data-url属性内的地址
    # 匹配有data-url属性的a标签
    def replace_href_with_data_url(match):
        full_tag = match.group(0)
        data_url_match = re.search(r'data-url="([^"]*)"', full_tag)
        if data_url_match:
            data_url = data_url_match.group(1)
            # 替换href属性
            new_tag = re.sub(r'href="[^"]*"', f'href="{data_url}"', full_tag)
            return new_tag
        return full_tag
    
    content = re.sub(r'<a[^>]*data-url="[^"]*"[^>]*>', replace_href_with_data_url, content)
    
    # 4. 其他清理
    # 移除外链的meta和link标签
    content = re.sub(r'<meta property="og:url" content="[^"]*"\s*/?>', '', content)
    content = re.sub(r'<meta property="og:image" content="[^"]*"\s*/?>', '', content)
    content = re.sub(r'<link rel="(shortcut icon|apple-touch-icon)" href="[^"]*"[^>]*>', '', content)
    
    # 移除DNS预解析
    content = re.sub(r'<link rel=[\'"]dns-prefetch[\'"] href=[\'"][^\'"]*[\'"]\s*/?>', '', content)
    
    # 保存修改后的文件
    with open('e:/myplan/workflow2uploadimage/hysaitool/index1_modified.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("处理完成！修改后的文件保存为 index1_modified.html")
    print("主要修改内容：")
    print("1. 静态资源路径已改为本地路径")
    print("2. 外链脚本已移除")
    print("3. a标签href已替换为data-url属性值")

if __name__ == "__main__":
    process_html_file()