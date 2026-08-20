import glob

def replace_images():
    files = glob.glob('src/**/*.jsx', recursive=True)
    
    replacements = {
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80': 'https://cdn.pixabay.com/photo/2021/03/21/13/28/woman-6112091_1280.jpg'
    }

    for f in files:
        with open(f, 'r') as file:
            content = file.read()
            
        new_content = content
        for old, new in replacements.items():
            new_content = new_content.replace(old, new)
        
        if new_content != content:
            with open(f, 'w') as file:
                file.write(new_content)
            print(f"Updated avatars in {f}")

if __name__ == '__main__':
    replace_images()
