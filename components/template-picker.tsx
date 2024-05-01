import React, { useState, useEffect } from 'react';
import { Template } from '../types/templates';

interface TemplatePickerProps {
  selectedTemplate: string;
  handleTemplateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TemplatePicker: React.FC<TemplatePickerProps> = ({ selectedTemplate, handleTemplateChange }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('api/templates')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTemplates(data);
        setIsLoading(false);
        
        const syntheticEvent = { target: { value: data[0].name } } as React.ChangeEvent<HTMLSelectElement>;; // Create a synthetic event
        handleTemplateChange(syntheticEvent); // Trigger handleTemplateChange with the synthetic event
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading templates: {error}</p>;

  return (
    <select onChange={handleTemplateChange} value={selectedTemplate} className="mb-4 p-2 border rounded">
      {templates.map(template => (
        <option key={template.id} value={template.name}>{template.name} - {template.status} </option>
      ))}
    </select>
  );
};

export default TemplatePicker;