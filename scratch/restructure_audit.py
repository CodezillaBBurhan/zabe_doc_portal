import sys

def fix_layout(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The layout is:
    # 1. Main wrapper (lines 106-107)
    # 2. Top row wrapper (109-110)
    # 3. Left col (111-145)
    # 4. Right col (147-288)
    # 5. Top row close (289)
    # 6. Bottom row (table) (291-352)
    # 7. Main wrapper close (353)

    # Let's use string operations to extract the table block and put it in the left column.
    
    table_start_marker = "{/* Bottom Row (Table) */}"
    table_end_marker = "      </div>\n    </div>\n  );\n}"
    
    idx_table_start = content.find(table_start_marker)
    if idx_table_start == -1:
        print("Table start not found")
        return
        
    idx_table_end = content.find(table_end_marker)
    if idx_table_end == -1:
        print("Table end not found")
        return
        
    # Extract table block
    table_block = content[idx_table_start:idx_table_end].strip()
    
    # Remove table block from content
    content = content[:idx_table_start] + table_end_marker
    
    # Now find where to insert the table block. 
    # It should go right before:
    #           </div>
    #
    #           {/* Right Column (Cards) */}
    
    insert_marker = "          </div>\n\n          {/* Right Column (Cards) */}"
    idx_insert = content.find(insert_marker)
    if idx_insert == -1:
        print("Insert point not found")
        return
        
    # We will insert it inside the Left Column div, before its closing div.
    # The Left Column div ends right before the insert_marker.
    # So we replace "          </div>\n\n          {/* Right Column (Cards) */}"
    # With:
    # \n          {/* Audit Log Table Card */}\n          ...table_code...\n          </div>\n\n          {/* Right Column (Cards) */}
    
    # Actually, table_block contains:
    # {/* Bottom Row (Table) */}
    # <div className="w-full flex flex-col">
    #    ...
    # </div>
    
    content = content[:idx_insert] + "  " + table_block + "\n" + content[idx_insert:]
    
    # Now fix the flex properties of the wrappers so it doesn't stretch weirdly
    content = content.replace(
        '<div className="flex flex-col xl:flex-row gap-6 w-full">',
        '<div className="flex flex-col xl:flex-row gap-6 w-full items-start">'
    )
    content = content.replace(
        '<div className="flex-1 min-w-0 flex flex-col h-full">',
        '<div className="flex-1 min-w-0 flex flex-col gap-6 w-full">'
    )
    content = content.replace(
        '<div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-full flex flex-col">',
        '<div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col">'
    )

    # Let's clean up duplicate wrappers (like <div className="flex flex-col gap-6 w-full"> wrapping the flex-row)
    # It's fine to leave them, but let's see.

    with open(filepath, 'w') as f:
        f.write(content)
    
    print("Done restructuring AuditLogs.jsx")

if __name__ == "__main__":
    fix_layout('src/pages/AuditLogs.jsx')
