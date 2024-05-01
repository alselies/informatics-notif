import React, { useEffect, useState } from 'react';
import { UserInformatics } from '../types/user-informatics';

interface IdPickerProps {
  checkedIds: Set<string>;
  handleCheckboxChange: (isChecked: boolean, nim: string) => void;
}

const IdPicker: React.FC<IdPickerProps> = ({ checkedIds, handleCheckboxChange }) => {
  const [data, setData] = useState<UserInformatics[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/users');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckAll = () => {
    const allChecked = filteredData.every(item => checkedIds.has(item.nim));
    filteredData.forEach(item => {
      handleCheckboxChange(!allChecked, item.nim);
    });
  };

  const filteredData = data.filter(item => item.fullname?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 mr-4 p-2 border rounded"
        onChange={handleSearchChange}
      />
      <button
        onClick={handleCheckAll}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Toggle All
      </button>
        <div style={{ maxHeight: '400px', maxWidth: '400px', overflowY: 'auto' }}>
        {filteredData.map((item) => (
            <div key={item.nim} className="flex items-center space-x-2">
            <input 
                type="checkbox" 
                id={`checkbox-${item.nim}`} 
                checked={checkedIds.has(item.nim)}
                value={item.nim} 
                className="form-checkbox"
                onChange={(e) => handleCheckboxChange(e.target.checked, item.nim || '')}
            />
            <label htmlFor={`checkbox-${item.nim}`} className="text-lg">{item.fullname}</label>
            </div>
        ))}
        </div>

        <div className='mt-4'>
            Checked IDs Count: {checkedIds.size}
        </div>
    </div>
  );
};

export default IdPicker;