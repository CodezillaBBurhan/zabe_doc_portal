import glob

def replace_images():
    files = glob.glob('src/**/*.jsx', recursive=True)
    
    replacements = {
        'https://randomuser.me/api/portraits/women/90.jpg': 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=150&h=150&fit=crop&q=80',
        'https://randomuser.me/api/portraits/men/91.jpg': 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&q=80'
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
