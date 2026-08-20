import glob

def replace_elena():
    files = glob.glob('src/**/*.jsx', recursive=True)
    for f in files:
        with open(f, 'r') as file:
            content = file.read()
            
        new_content = content.replace('https://i.pravatar.cc/150?img=33', 'https://randomuser.me/api/portraits/men/91.jpg')
        
        if new_content != content:
            with open(f, 'w') as file:
                file.write(new_content)
            print(f"Updated avatars in {f}")

if __name__ == '__main__':
    replace_elena()
