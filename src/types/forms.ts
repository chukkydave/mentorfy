export enum FormFieldType {
    NUMBER = 'number',
    DATE = 'date',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select',
    MULTISELCT = 'multiselect',
    URL = 'url',
    PHONE = 'phone',
    FILE = 'file',
    FILES = 'files',
    SHORT_ANSWER = 'short_answer',
    PARAGRAPH = 'paragraph',
    EMAIL = 'email',
}

export const SELECTABLE_FIELDS = [
    FormFieldType.CHECKBOX,
    FormFieldType.RADIO,
    FormFieldType.SELECT,
    FormFieldType.MULTISELCT,
];

export enum FormFieldEnabledFor {
    MENTOR = 'mentor',
    MENTEE = 'mentee',
    BOTH = 'both',
    NONE = 'none',
}

export interface FormField {
    name: string;
    label: string;
    type: FormFieldType;
    options: string[];
    enabled_for: FormFieldEnabledFor;
    for_matching: boolean;
    for_mentor_acceptance: boolean;
    for_mentor_acceptance_values: string[];
    required: boolean;
}

export interface Form {
    id: string;
    name: string;
    fields: FormField[]; // Dynamic form fields
}

export interface SubmissionField {
    name: string; // Name of the form field
    value: string | string[]; // Value(s) entered
}

export interface Submission {
    role: string; // Role of the user (mentor/mentee)
    submissions: SubmissionField[]; // List of fields and their values
    form_id: string; // ID of the form submitted
}
