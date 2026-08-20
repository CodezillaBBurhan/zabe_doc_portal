import os
import glob

def fix_buttons():
    files = glob.glob('src/**/*.jsx', recursive=True)
    for f in files:
        with open(f, 'r') as file:
            content = file.read()
            
        new_content = content.replace('bg-[#ff8c42] hover:bg-[#ff7a22]', 'bg-[#ff5a1f] hover:bg-[#e64a10]')
        
        if new_content != content:
            with open(f, 'w') as file:
                file.write(new_content)
            print(f"Updated {f}")

if __name__ == '__main__':
    fix_buttons()
