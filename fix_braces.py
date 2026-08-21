import json
import re

filepath = 'd:/dlp_project/dlp_project/dlc_react/sandbox-senati/src/data/courses/piad-221.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the extra braces at the end of week 1
text = re.sub(r'(\]\s*\}\s*\}\s*)\}\s*,\s*\{\s*id:\s*"week-02"', r'\1},\n      {\n        id: "week-02"', text)

# Fix the extra braces at the end of week 2
text = re.sub(r'(\]\s*\}\s*\}\s*)\}\s*,\s*\{\s*id:\s*"week-03"', r'\1},\n      {\n        id: "week-03"', text)

# Fix the extra braces at the end of week 3
text = re.sub(r'(\]\s*\}\s*\}\s*)\}\s*,\s*\{\s*id:\s*"week-04"', r'\1},\n      {\n        id: "week-04"', text)

# Fix the end of week 4 and the file
text = re.sub(r'(\]\s*\}\s*)\}\s*\]\s*,\s*theory:\s*\{\s*slides:\s*\[\]\s*\}\s*,\s*workshop:\s*\{\s*slides:\s*\[\]\s*\}\s*\};', r'          ]\n        }\n      }\n    ]\n};', text)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)
