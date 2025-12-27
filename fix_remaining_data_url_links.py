import re

def replace_href_with_data_url(content):
    """Replace href values with data-url values for all <a> tags that have both attributes"""
    
    # Pattern to match <a> tags with both href and data-url attributes
    pattern = r'<a([^>]*)href=["\']https://ai-bot\.cn([^"\']*)["\']([^>]*)data-url=["\']https://ai-bot\.cn([^"\']*)["\']([^>]*)>'
    
    def replace_match(match):
        before_href = match.group(1)
        href_path = match.group(2)
        between_attrs = match.group(3)
        data_url_path = match.group(4)
        after_data_url = match.group(5)
        
        # Replace href value with data-url value (convert to local anchor)
        new_href = f'#{{data_url_path}}'
        
        return f'<a{before_href}href="{new_href}"{between_attrs}data-url="https://ai-bot.cn{data_url_path}"{after_data_url}>'
    
    # Replace all matches
    new_content = re.sub(pattern, replace_match, content, flags=re.IGNORECASE)
    
    return new_content

def main():
    # Read the file
    with open('e:/myplan/workflow2uploadimage/hysaitool/index1_modified.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Apply the replacement
    new_content = replace_href_with_data_url(content)
    
    # Count replacements
    original_count = len(re.findall(r'<a[^>]*href=["\']https://ai-bot\.cn[^"\']*["\'][^>]*data-url=["\']https://ai-bot\.cn[^"\']*["\']', content, re.IGNORECASE))
    new_count = len(re.findall(r'<a[^>]*href=["\']#[^"\']*["\'][^>]*data-url=["\']https://ai-bot\.cn[^"\']*["\']', new_content, re.IGNORECASE))
    
    print(f"Replaced {original_count} links with local anchors")
    print(f"Found {new_count} links with local anchors after replacement")
    
    # Write the modified content back
    with open('e:\myplan\workflow2uploadimage\hysaitool\index1_modified.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Replacement completed successfully!")

if __name__ == "__main__":
    main()