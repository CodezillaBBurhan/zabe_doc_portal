import re

with open('src/pages/AuditLogs.jsx', 'r') as f:
    lines = f.readlines()

table_idx = -1
chart_idx = -1
cards_idx = -1

for i, line in enumerate(lines):
    if "Audit Log Table Card" in line:
        table_idx = i
    if "Chart Section" in line:
        chart_idx = i
    if "Right Column (Cards)" in line:
        cards_idx = i

print(f"Table index: {table_idx}")
print(f"Chart index: {chart_idx}")
print(f"Cards index: {cards_idx}")

table_block = lines[table_idx:table_idx+59]
chart_block = lines[chart_idx:chart_idx+32]
cards_block = lines[cards_idx:cards_idx+142]

new_layout = [
    '      {/* Main Content Layout */}\n',
    '      <div className="flex flex-col gap-6 w-full">\n',
    '        \n',
    '        {/* Top Row (Chart & Cards) */}\n',
    '        <div className="flex flex-col xl:flex-row gap-6 w-full">\n',
    '          {/* Left: Chart Section */}\n',
    '          <div className="flex-1 min-w-0 flex flex-col h-full">\n'
]

# Indent chart block if needed, but we can just append it
for line in chart_block:
    new_layout.append('  ' + line.replace('h-40', 'h-64').replace('mb-2', 'mb-6').replace('p-6', 'p-6 h-full flex flex-col'))

new_layout.append('          </div>\n\n')

for line in cards_block:
    if "lg:w-[320px]" in line:
        line = line.replace("lg:w-[320px]", "xl:w-[320px]")
    new_layout.append('  ' + line)

new_layout.append('        </div>\n\n')
new_layout.append('        {/* Bottom Row (Table) */}\n')
new_layout.append('        <div className="w-full flex flex-col">\n')

for line in table_block:
    new_layout.append('  ' + line)

new_layout.append('        </div>\n')
new_layout.append('      </div>\n')

new_lines = lines[:table_idx-4] + new_layout + lines[cards_idx+142:]

with open('src/pages/AuditLogs.jsx', 'w') as f:
    f.writelines(new_lines)
