import React, { useEffect, useState } from 'react';
import TemplatePicker from '../components/template-picker';
import IdPicker from '../components/id-picker';

const HomePage: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleCheckboxChange = (isChecked: boolean, nim: string) => {
    setCheckedIds(prev => {
      const newChecked = new Set(prev);
      if (isChecked) {
        newChecked.add(nim);
      } else {
        newChecked.delete(nim);
      }
      return newChecked;
    });
  };

  const sendMessage = async () => {
    try {

      console.log(checkedIds)
      const response = await fetch('/api/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          list: Array.from(checkedIds),
          template: selectedTemplate
         }),
      });
      if (response.ok) {
        console.log(response.statusText)
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(event.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">Welcome to my Next.js app!</h1>
      <TemplatePicker selectedTemplate={selectedTemplate} handleTemplateChange={handleTemplateChange} />
      <IdPicker checkedIds={checkedIds} handleCheckboxChange={handleCheckboxChange} />
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default HomePage;