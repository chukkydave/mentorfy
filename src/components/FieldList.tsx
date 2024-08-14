import React from 'react';
import { useFormStore } from '../store/form';

const FieldList: React.FC = () => {
    const { fields, deleteField } = useFormStore();

    return (
        <div className="mt-8 p-8 bg-white rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Form Fields</h2>
            {fields.length === 0 ? (
                <p>No fields added yet.</p>
            ) : (
                <ul className="space-y-4">
                    {fields.map((field) => (
                        <li key={field.id} className="border p-4 rounded">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{field.label}</div>
                                    <div className="text-sm text-gray-600">{field.type}</div>
                                    <div className="text-sm text-gray-600">
                                        Required: {field.required ? 'Yes' : 'No'}
                                    </div>
                                    {field.options && (
                                        <div className="mt-2">
                                            <div className="font-medium">Options:</div>
                                            <ul className="list-disc pl-4">
                                                {field.options.map((option, index) => (
                                                    <li key={index}>{option}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="text-red-600"
                                    onClick={() => deleteField(field.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FieldList;