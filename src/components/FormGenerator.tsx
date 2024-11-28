import React from 'react';
import { useForm, Controller, ValidationRule } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const FormGenerator: React.FC<{ schema: string }> = ({ schema }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  
  // Safely parse and check the schema
  let parsedSchema: FormSchema;
  try {
    parsedSchema = JSON.parse(schema);
  } catch (error) {
    console.error("Invalid schema:", error);
    return <div>Invalid schema format!</div>;
  }

  // Check if the fields array is defined and an array
  const fields = Array.isArray(parsedSchema.fields) ? parsedSchema.fields : [];

  const onSubmit = (data: any) => {
    console.log(data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-xl font-bold mb-2">{parsedSchema.formTitle}</h2>
      <p className="mb-4">{parsedSchema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.length > 0 ? (
          fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-sm font-semibold">{field.label}</label>
              <Controller
                name={field.id}
                control={control}
                defaultValue=""
                rules={{
                  required: field.required,
                  pattern: field.validation?.pattern ?  new RegExp(field.validation.pattern) : undefined,
                }}
                render={({ field: inputField }) => {
                  switch (field.type) {
                    case 'text':
                      return (
                        <input
                          {...inputField}
                          placeholder={field.placeholder}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      );
                    case 'email':
                      return (
                        <input
                          {...inputField}
                          placeholder={field.placeholder}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      );
                    case 'select':
                      return (
                        <select {...inputField} className="w-full p-2 border border-gray-300 rounded">
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      );
                    case 'textarea':
                      return (
                        <textarea
                          {...inputField}
                          placeholder={field.placeholder}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      );
                    case 'radio':
                      return (
                        <div>
                          {field.options?.map((option) => (
                            <label key={option.value} className="mr-4">
                              <input
                                type="radio"
                                {...inputField}
                                value={option.value}
                              />
                              {option.label}
                            </label>
                          ))}
                        </div>
                      );
                    default:
                      return <p>Default switch</p>;
                  }
                }}
              />
              {errors[field.id] && (
                <p className="text-red-500">{field.validation?.message || 'This field is required'}</p>
              )}
            </div>
          ))
        ) : (
          <p>No fields to display</p>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};


export default FormGenerator;
