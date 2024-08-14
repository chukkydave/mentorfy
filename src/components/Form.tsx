import React, { useState } from 'react';
import { useFormStore } from '../store/form';
import { FormFieldType } from '../types/forms';
import { v4 as uuidv4 } from 'uuid';
import FieldList from './FieldList';

const Form: React.FC = () => {
    const { addField, resetFields, fields } = useFormStore();
    const [selectedFieldType, setSelectedFieldType] = useState<FormFieldType | null>(null);
    const [label, setLabel] = useState('');
    const [required, setRequired] = useState(false);
    const [options, setOptions] = useState<string[]>(['']);
    const [showExtraCards, setShowExtraCards] = useState(false);

    const handleAddOption = () => setOptions([...options, '']);

    const handleAddOthers = () => setOptions([...options, 'Others']);

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleNext = () => {
        if (selectedFieldType && label) {
            setShowExtraCards(true);
        }
    };

    const handleDelete = () => {
        resetFields();
        setSelectedFieldType(null);
        setLabel('');
        setRequired(false);
        setOptions(['']);
        setShowExtraCards(false);
    };

    const handleAddMoreQuestions = () => {
        if (selectedFieldType && label) {
            addField({
                id: uuidv4(),
                type: selectedFieldType,
                label,
                required,
                options: selectedFieldType === FormFieldType.RADIO || selectedFieldType === FormFieldType.CHECKBOX ? options : undefined,
            });
            // Reset the form for new question
            setSelectedFieldType(null);
            setLabel('');
            setRequired(false);
            setOptions(['']);
            setShowExtraCards(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Create customized User signup forms</h2>
            {fields.length > 0 && <FieldList />}
            <div className="mb-4 p-8 bg-white rounded shadow-lg ">
                <label className="block text-sm font-medium mb-2">Select your preferred option</label>
                <div className="flex space-x-2">
                    <button
                        className={`px-4 py-2 rounded ${selectedFieldType === FormFieldType.RADIO ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedFieldType(FormFieldType.RADIO)}
                    >
                        Radio
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${selectedFieldType === FormFieldType.CHECKBOX ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedFieldType(FormFieldType.CHECKBOX)}
                    >
                        Checkbox
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${selectedFieldType === FormFieldType.MULTISELCT ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedFieldType(FormFieldType.MULTISELCT)}
                    >
                        Multiple files
                    </button>

                    {/* Updated dropdown for selecting field types */}
                    <div className="flex space-x-2">
                        <select
                            className="px-4 py-2 rounded bg-gray-200"
                            value={selectedFieldType || ''}
                            onChange={(e) => setSelectedFieldType(e.target.value as FormFieldType)}
                        >
                            <option value="" disabled>Select field type</option>
                            <option value={FormFieldType.EMAIL}>Email</option>
                            <option value={FormFieldType.PHONE}>Phone</option>
                            <option value={FormFieldType.DATE}>Date</option>
                            <option value={FormFieldType.URL}>URL</option>
                            <option value={FormFieldType.FILE}>File upload</option>
                            <option value={FormFieldType.SELECT}>Single select dropdown</option>
                            <option value={FormFieldType.MULTISELCT}>Multi select dropdown</option>
                            <option value={FormFieldType.SHORT_ANSWER}>Short answer</option>
                            <option value={FormFieldType.PARAGRAPH}>Paragraph</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Enter name of field</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium mr-2">Is required?</label>
                <input
                    type="checkbox"
                    className="toggle"
                    checked={required}
                    onChange={(e) => setRequired(e.target.checked)}
                />
            </div>

            {(selectedFieldType === FormFieldType.RADIO || selectedFieldType === FormFieldType.CHECKBOX) && (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Options</label>
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <button
                                className="ml-2 text-red-600"
                                onClick={() => setOptions(options.filter((_, i) => i !== index))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        className="px-4 py-2 mt-2 bg-transparent text-black rounded"
                        onClick={handleAddOption}
                    >
                        Add Option
                    </button>
                    <button
                        className="px-4 py-2 mt-2 bg-transparent text-black rounded"
                        onClick={handleAddOthers}
                    >
                        Add Others
                    </button>
                </div>
            )}

            <button
                className="w-full px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleNext}
            >
                Next
            </button>

            {showExtraCards && (
                <>
                    <div className="mt-8 p-4 bg-gray-100 rounded shadow-sm">
                        <label className="block text-sm font-medium mb-2">Is mentor acceptance criterion?</label>
                        <input type="checkbox" className="toggle" />
                    </div>

                    <div className="mt-4 p-4 bg-gray-100 rounded shadow-sm">
                        <label className="block text-sm font-medium mb-2">Is matching criterion?</label>
                        <input type="checkbox" className="toggle" />
                    </div>

                    <div className="mt-4 p-4 bg-gray-100 rounded shadow-sm">
                        <label className="block text-sm font-medium mb-2">Field applicable for:</label>
                        <div>
                            <input type="checkbox" className="mr-2" />
                            <label>Mentor field</label>
                        </div>
                        <div>
                            <input type="checkbox" className="mr-2" />
                            <label>Mentee field</label>
                        </div>
                    </div>

                    <div className="mt-6 flex space-x-2">
                        <button
                            className="w-full px-4 py-2 bg-red-600 text-white rounded"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="w-full px-4 py-2 bg-transparent text-black rounded"
                            onClick={handleAddMoreQuestions}
                        >
                            Add More Questions
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Form;