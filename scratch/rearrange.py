import re

with open('src/pages/Incidents.jsx', 'r') as f:
    content = f.read()

main_layout_start = content.find('{/* ── Main 2-column layout ── */}')
drawers_start = content.find('{/* ── Drawers ── */}')

left_start = content.find('{/* LEFT: Filter + Table */}', main_layout_start)
right_start = content.find('{/* RIGHT: Sidebar widgets */}', main_layout_start)

left_content = content[left_start:right_start].strip()
right_content = content[right_start:drawers_start].strip()

# right_content looks like:
# {/* RIGHT: Sidebar widgets */}
# <div className="w-full xl:w-[280px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 shrink-0">
#   {/* Incidents by Severity */} ...
# </div>
# </div>

inner_right_start = right_content.find('{/* Incidents by Severity */}')
inner_right_end = right_content.rfind('</div>\n      </div>')

widgets_content = right_content[inner_right_start:inner_right_end].strip()

new_structure = f"""      {{/* ── Top Charts & Widgets ── */}}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 w-full">
        {widgets_content}
      </div>

      {{/* ── Bottom: Filter + Table ── */}}
      <div className="w-full min-w-0">
        {left_content}
"""

part1 = content[:main_layout_start]
part3 = content[drawers_start:]

new_content = part1 + new_structure + "\n      " + part3

with open('src/pages/Incidents.jsx', 'w') as f:
    f.write(new_content)

print("Done")
