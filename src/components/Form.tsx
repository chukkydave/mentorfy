import React, { useState } from 'react';
import { useFormStore } from '../store/form';
import { FormFieldType } from '../types/forms';
import { v4 as uuidv4 } from 'uuid';
import FieldList from './FieldList';
import { LuCircle } from "react-icons/lu";
import { FaRegSquare } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ToggleButton from './ToggleButton';

const Form: React.FC = () => {
    const { addField, resetFields, fields } = useFormStore();
    const [selectedFieldType, setSelectedFieldType] = useState<FormFieldType | null>(null);
    const [label, setLabel] = useState('');
    const [required, setRequired] = useState(false);
    const [options, setOptions] = useState<string[]>(['']);
    const [showExtraCards, setShowExtraCards] = useState(false);
    const [acceptance, setAcceptance] = useState(true);
    const [acceptance2, setAcceptance2] = useState(true);

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
        <div className="max-w-2xl mx-auto my-20">
            <div className='text-center mb-4'>
                <h1 className="text-2xl font-bold mb-1">Create customized User signup forms</h1>
                <p className='text-xs font-normal'>Be in control of data required for users to sign up</p>
            </div>

            {fields.length > 0 && <FieldList />}
            <div className="mb-4 px-8 py-4 bg-white rounded-xl shadow-md ">
                <label className="block text-xs font-medium mb-4">Select your preferred option</label>
                <div className="flex items-center gap-4 mb-8">
                    <button
                        className={`px-4 py-2  font-extralight text-xs flex items-center gap-2 rounded-md ${selectedFieldType === FormFieldType.RADIO ? 'bg-[#95A300] text-white' : 'bg-[#f7f7f7] text-gray-500'}`}
                        onClick={() => setSelectedFieldType(FormFieldType.RADIO)}
                    >
                        <LuCircle /> Radio
                    </button>
                    <button
                        className={`px-4 py-2 font-extralight text-xs flex items-center gap-2 rounded-md ${selectedFieldType === FormFieldType.CHECKBOX ? 'bg-[#95A300] text-white' : 'bg-[#f7f7f7] text-gray-500'}`}
                        onClick={() => setSelectedFieldType(FormFieldType.CHECKBOX)}
                    >
                        <FaRegSquare />  Checkbox
                    </button>
                    <button
                        className={`px-4 py-2 font-extralight text-xs rounded-md ${selectedFieldType === FormFieldType.MULTISELCT ? 'bg-[#95A300] text-white' : 'bg-[#f7f7f7] text-gray-500'}`}
                        onClick={() => setSelectedFieldType(FormFieldType.MULTISELCT)}
                    >
                        Multiple files
                    </button>

                    {/* Updated dropdown for selecting field types */}
                    <div className="flex space-x-2">
                        <select
                            className="px-4 py-2 rounded-md font-extralight text-xs outline-none bg-[#f7f7f7] text-gray-500"
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

                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-4 text-xs border outline-none rounded-md"
                        value={label}
                        placeholder='Enter name of field'
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <label className="block text-xs font-normal mr-2">Is required?</label>

                    <ToggleButton checked={required} onChange={setRequired} />
                </div>

                {(selectedFieldType === FormFieldType.RADIO || selectedFieldType === FormFieldType.CHECKBOX) && (
                    <div className="mb-4">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center mb-4">
                                <input
                                    type="text"
                                    className="w-full p-4 border text-xs outline-none rounded-md"
                                    placeholder={"Option" + " " + `${index + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                                {options.length > 1 && <button
                                    className="ml-2 text-gray-400"
                                    onClick={() => setOptions(options.filter((_, i) => i !== index))}
                                >
                                    <IoClose />
                                </button>}
                            </div>
                        ))}
                        <button
                            className="px-4 py-2 bg-[#f7f7f7] text-black text-xs font-normal rounded-full"
                            onClick={handleAddOption}
                        >
                            Add Option
                        </button> <span className='text-xs font-normal mx-2'>or</span>
                        <button
                            className="px-4 py-2 bg-[#f7f7f7] text-black text-xs font-normal rounded-full"
                            onClick={handleAddOthers}
                        >
                            Add Others
                        </button>
                    </div>
                )}
            </div>



            <button
                className="w-full px-4 py-3 bg-[#95a300] text-xs mt-4 text-white rounded-md"
                onClick={handleNext}
            >
                Next
            </button>

            {showExtraCards && (
                <>
                    <div className='mt-8 p-6 bg-[#f8f9fc] rounded-md shadow-sm '>
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium mb-2">Is mentor acceptance criterion?</label>
                            <ToggleButton checked={acceptance} onChange={setAcceptance} />
                        </div>
                        <p className='text-xs mt-2 font-extralight'>Criteria used by the system to determine eligibility for mentorship in a cohort session based on the information provided in the form field.</p>
                    </div>

                    <div className='mt-8 p-6 bg-[#f8f9fc] rounded-md shadow-sm '>
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium mb-2">Is matching criterion?</label>
                            <ToggleButton checked={acceptance2} onChange={setAcceptance2} />
                        </div>
                        <p className='text-xs mt-2 font-extralight'>The system will utilize the designated form field to match mentors for a cohort session.</p>
                    </div>

                    <div className="mt-4 flex p-6 items-center gap-8">
                        <div>
                            <input type="checkbox" className="mr-2" />
                            <label className='text-xs'>Mentor field</label>
                        </div>
                        <div>
                            <input type="checkbox" className="mr-2" />
                            <label className='text-xs'>Mentee field</label>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            className=" px-3 py-2 bg-transparent hover:bg-[#95a300] hover:text-white border text-xs border-[#95a300] outline-[#95a300] text-[#95a300] rounded-md"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="px-3 py-2 bg-[#95a300] hover:bg-transparent hover:text-[#95a300] border text-xs border-[#95a300] outline-[#95a300] text-white rounded-md"
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