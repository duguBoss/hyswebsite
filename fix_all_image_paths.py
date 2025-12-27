import re
import os

def fix_image_paths():
    file_path = "e:/myplan/workflow2uploadimage/hysaitool/index1_modified.html"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match image paths with date-based subdirectories
    # This will match patterns like images/2023/03/, images/2024/06/, images/2025/10/, etc.
    pattern = r'images/\d{4}/\d{2}/'
    
    # Replace all date-based subdirectory paths with just images/
    fixed_content = re.sub(pattern, 'images/', content)
    
    # Count replacements
    original_count = len(re.findall(pattern, content))
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"Fixed {original_count} image path references")
    
    # Also check for any remaining external image references
    external_patterns = [
        r'https?://[^\s"\'<>]+\.png',
        r'https?://[^\s"\'<>]+\.jpg', 
        r'https?://[^\s"\'<>]+\.jpeg',
        r'https?://[^\s"\'<>]+\.gif',
        r'https?://[^\s"\'<>]+\.svg',
        r'https?://[^\s"\'<>]+\.webp'
    ]
    
    remaining_external = 0
    for pattern in external_patterns:
        matches = re.findall(pattern, fixed_content)
        if matches:
            print(f"Found {len(matches)} remaining external image references matching {pattern}")
            remaining_external += len(matches)
    
    if remaining_external == 0:
        print("No remaining external image references found")
    else:
        print(f"Total remaining external references: {remaining_external}")

if __name__ == "__main__":
    fix_image_paths()