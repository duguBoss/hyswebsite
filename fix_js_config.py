import re

def fix_js_config():
    file_path = "e:/myplan/workflow2uploadimage/hysaitool/index1_modified.html"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix the AJAX URL - replace with local path or empty string
    content = re.sub(
        r'"ajaxurl":"https://ai-bot\.cn/wp-admin/admin-ajax\.php"',
        '"ajaxurl":""',  # Empty string to prevent AJAX calls
        content
    )
    
    # Fix the icon URL - replace with local path or empty string
    content = re.sub(
        r'"icourl":"https://besticon-demo\.herokuapp\.com/icon\?size=32\.\.[0-9]+\.\.[0-9]+&url="',
        '"icourl":""',  # Empty string to prevent external icon requests
        content
    )
    
    # Also fix any other external references in the theme object
    content = re.sub(
        r'"addico":"https://ai-bot\.cn/wp-content/themes/onenav/images/add\.png"',
        '"addico":"images/add.png"',  # Local path
        content
    )
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Fixed JavaScript configuration to prevent external requests")

if __name__ == "__main__":
    fix_js_config()