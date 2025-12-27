import re

# Read the file
with open('e:/myplan/workflow2uploadimage/hysaitool/index1_modified.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacements for search type values
search_replacements = [
    # Group b
    (r'value="https://cn\.bing\.com/search\?q=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.baidu\.com/s\?wd=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.google\.com/search\?q=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.perplexity\.ai/search\?q=%s%&amp;focus=internet"', 'value="?q=%s%"'),
    (r'value="https://you\.com/search\?q=%s%&amp;fromSearchBar=false&amp;tbm=youchat"', 'value="?q=%s%"'),
    (r'value="https://www\.so\.com/s\?q=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.sogou\.com/web\?query=%s%"', 'value="?q=%s%"'),
    (r'value="https://yz\.m\.sm\.cn/s\?q=%s%"', 'value="?q=%s%"'),
    
    # Group d
    (r'value="https://huggingface\.co/search/full-text\?q=%s%"', 'value="?q=%s%"'),
    (r'value="https://github\.com/search\?q=%s%&amp;type=repositories"', 'value="?q=%s%"'),
    (r'value="https://www\.paddlepaddle\.org\.cn/searchall\?q=%s%&amp;language=zh"', 'value="?q=%s%"'),
    (r'value="https://www\.modelscope\.cn/search\?search=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.heywhale\.com/home/global\?search=%s%"', 'value="?q=%s%"'),
    (r'value="https://juejin\.cn/search\?query=%s%&amp;type=0"', 'value="?q=%s%"'),
    (r'value="https://www\.zhihu\.com/search\?type=content&amp;q=%s%"', 'value="?q=%s%"'),
    
    # Group f
    (r'value="https://yige\.baidu\.com/search/%s%"', 'value="?q=%s%"'),
    (r'value="https://huaban\.com/search\?q=%s%&amp;type=aigc"', 'value="?q=%s%"'),
    (r'value="https://civitai\.com/\?query=%s%"', 'value="?q=%s%"'),
    (r'value="https://openart\.ai/discovery\?q=%s%"', 'value="?q=%s%"'),
    (r'value="https://creator\.nightcafe\.studio/search/creations\?q=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.deviantart\.com/search\?q=%s%+%23ai"', 'value="?q=%s%"'),
    (r'value="https://lexica\.art/\?q=%s%"', 'value="?q=%s%"'),
    
    # Group e
    (r'value="https://s\.taobao\.com/search\?q=%s%"', 'value="?q=%s%"'),
    (r'value="https://search\.jd\.com/Search\?keyword=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.xiachufang\.com/search/\?keyword=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.xiangha\.com/so/\?q=caipu&amp;s=%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.12306\.cn/\?%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.kuaidi100\.com/\?%s%"', 'value="?q=%s%"'),
    (r'value="https://www\.qunar\.com/\?%s%"', 'value="?q=%s%"'),
]

# Apply all replacements
for pattern, replacement in search_replacements:
    content = re.sub(pattern, replacement, content)

# Write back to file
with open('e:/myplan/workflow2uploadimage/hysaitool/index1_modified.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Search type values have been updated to use local URLs")