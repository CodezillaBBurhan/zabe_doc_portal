import os
import glob

def replace_avatars():
    files = glob.glob('src/**/*.jsx', recursive=True)
    for f in files:
        with open(f, 'r') as file:
            content = file.read()
            
        new_content = content
        
        # Replace Sarah Jenkins avatar
        new_content = new_content.replace('https://i.pravatar.cc/150?u=sarah', 'https://i.pravatar.cc/150?img=53')
        new_content = new_content.replace('https://i.pravatar.cc/150?img=53', 'https://randomuser.me/api/portraits/women/90.jpg') 
        
        # Replace Elena avatar
        new_content = new_content.replace('https://i.pravatar.cc/150?u=elena', 'https://randomuser.me/api/portraits/men/90.jpg')
        
        if new_content != content:
            with open(f, 'w') as file:
                file.write(new_content)
            print(f"Updated avatars in {f}")

if __name__ == '__main__':
    replace_avatars()
