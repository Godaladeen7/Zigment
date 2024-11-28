import React from 'react';
import ReactJson from 'react-json-view';

interface JSONEditorProps {
  schema: string;
  onSchemaChange: (newSchema: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, onSchemaChange }) => {
  const handleSchemaChange = (updatedSchema: any) => {
    onSchemaChange(JSON.stringify(updatedSchema));
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-xl font-bold mb-4">JSON Schema Editor</h2>
      <ReactJson
        src={JSON.parse(schema)}
        onAdd={handleSchemaChange}
        onDelete={handleSchemaChange}
        onEdit={handleSchemaChange}
        theme="monokai"
        displayDataTypes={false}
        displayObjectSize={false}
      />
    </div>
  );
};

export default JSONEditor;
