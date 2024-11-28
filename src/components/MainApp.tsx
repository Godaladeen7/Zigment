import React, { useState } from 'react';
import JSONEditor from './JSONEditor.tsx';
import FormGenerator from './FormGenerator.tsx';

const initialSchema = JSON.stringify({
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address",
      },
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" },
      ],
    },
    {
      id: "industry",
      type: "radio",
      label: "Industry",
      required: true,
      options: [
        { value: "tech", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share...",
    },
  ],
});

// const MainApp: React.FC = () => {
//   const [schema, setSchema] = useState(initialSchema);

//   const handleSchemaChange = (newSchema: string) => {
//     setSchema(newSchema);
//   };

//   return (
//     <div className="flex flex-wrap p-6">
//       <JSONEditor schema={schema} onSchemaChange={handleSchemaChange} />
//       <FormGenerator schema={schema} />
//     </div>
//   );
// };
const MainApp = () => {
  const [schema, setSchema] = useState(initialSchema);

  const handleSchemaChange = (newSchema: string) => {
    setSchema(newSchema);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-center text-2xl font-bold mb-4">Dynamic Form Generator</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Column - JSON Editor */}
        <div className="w-full lg:w-1/2 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
          {/* Render JSONEditor */}
          <JSONEditor schema={schema} onSchemaChange={handleSchemaChange}/>
        </div>

        {/* Right Column - Generated Form */}
        <div className="w-full lg:w-1/2 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold mb-2">Generated Form</h2>
          {/* Render FormGenerator */}
          <FormGenerator schema={schema} />
        </div>
      </div>
    </div>
  );
};


export default MainApp;
