import React from 'react';

const ToggleButton: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({
    checked,
    onChange,
}) => {
    return (
        <div
            className={`relative inline-block w-9 h-4 align-middle select-none transition duration-200 ease-in`}
        >
            <input
                type="checkbox"
                name="toggle"
                id="toggle"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                style={{ left: checked ? '1.5rem' : '0.25rem' }} // Adjust the position based on the checked state
            />
            <label
                htmlFor="toggle"
                className={`toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer ${checked ? 'bg-[#95a300]' : 'bg-gray-300'
                    }`}
            ></label>
        </div>
    );
};

export default ToggleButton;