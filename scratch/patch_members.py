import re

with open('src/pages/Members.jsx', 'r') as f:
    content = f.read()

# Replace imports
import_addition = """import React, { useState, useEffect } from 'react';
import { MembersAPI } from '../mocks/api';
import Spinner from '../components/atoms/Spinner';
import EmptyState from '../components/molecules/EmptyState';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
"""
content = re.sub(r"import React, { useState, useEffect } from 'react';\n", import_addition, content)

# Remove initialMembers mock
content = re.sub(r"// Mock initial data\nconst initialMembers = \[.*?\];\n", "", content, flags=re.DOTALL)

# Update states and useEffect
state_addition = """export default function Members() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const data = await MembersAPI.getAll();
      setMembers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
"""
content = re.sub(r"export default function Members\(\) {\n  const \[members, setMembers\] = useState\(initialMembers\);\n", state_addition, content)

with open('src/pages/Members.jsx', 'w') as f:
    f.write(content)
