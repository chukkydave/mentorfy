import React from 'react';
import { useFormStore } from '../store/form';
import { IoTrashOutline } from "react-icons/io5";
import { FormFieldType } from '../types/forms';

const FieldList: React.FC = () => {
    const { fields, deleteField } = useFormStore();

    return (
        <div className="my-8 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            {fields.length === 0 ? (
                <p>No fields added yet.</p>
            ) : (
                <ul className="space-y-4">
                    {fields.map((field) => (
                        <li key={field.id} className="p-4 rounded">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="font-light text-sm">{field.label}{field.required && <span className='text-red-400'>*</span>}</div>
                                    {field.options && (
                                        <div className="mt-2">
                                            <ul className="font-light text-sm pl-4">
                                                {field.options.map((option, index) => (
                                                    <li className='flex items-center mt-3 gap-2' key={index}>
                                                        {/* Conditional rendering based on field type */}
                                                        {field.type === FormFieldType.RADIO && (
                                                            <>
                                                                <input type="radio" name={field.id} disabled />
                                                                <span>{option}</span>
                                                            </>
                                                        )}
                                                        {field.type === FormFieldType.CHECKBOX && (
                                                            <>
                                                                <input type="checkbox" disabled />
                                                                <span>{option}</span>
                                                            </>
                                                        )}
                                                        {field.type === FormFieldType.SELECT && (
                                                            <select disabled className="p-1 text-sm border rounded">
                                                                <option>{option}</option>
                                                            </select>
                                                        )}
                                                        {field.type === FormFieldType.MULTISELCT && (
                                                            <select multiple disabled className="p-1 text-sm border rounded">
                                                                <option>{option}</option>
                                                            </select>
                                                        )}
                                                        {(field.type === FormFieldType.SHORT_ANSWER || field.type === FormFieldType.PARAGRAPH) && (
                                                            <input type="text" placeholder={option} className="w-full p-1 text-sm border rounded" disabled />
                                                        )}
                                                        {field.type === FormFieldType.NUMBER && (
                                                            <input type="number" placeholder={option} className="w-full p-1 text-sm border rounded" disabled />
                                                        )}
                                                        {field.type === FormFieldType.DATE && (
                                                            <input type="date" placeholder={option} className="w-full p-1 text-sm border rounded" disabled />
                                                        )}
                                                        {field.type === FormFieldType.URL && (
                                                            <input type="url" placeholder={option} className="w-full p-1 text-sm border rounded" disabled />
                                                        )}
                                                        {field.type === FormFieldType.PHONE && (
                                                            <input type="tel" placeholder={option} className="w-full p-1 text-sm border rounded" disabled />
                                                        )}
                                                        {field.type === FormFieldType.EMAIL && (
                                                            <input type="email" placeholder={option} className="w-full p-1 text-sm border rounded" disabled />
                                                        )}
                                                        {field.type === FormFieldType.FILE && (
                                                            <input type="file" className="w-full p-1 text-sm border rounded" disabled />
                                                        )}
                                                        {field.type === FormFieldType.FILES && (
                                                            <input type="file" multiple className="w-full p-1 text-sm border rounded" disabled />
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="text-red-600"
                                    onClick={() => deleteField(field.id)}
                                >
                                    <IoTrashOutline />
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