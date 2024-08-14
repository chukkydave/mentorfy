import create from 'zustand';
import { FormFieldType } from '../types/forms';

export interface FormField {
    id: string;
    type: FormFieldType;
    label: string;
    required: boolean;
    options?: string[];
}

interface FormStore {
    fields: FormField[];
    addField: (field: FormField) => void;
    updateField: (id: string, updatedField: Partial<FormField>) => void;
    deleteField: (id: string) => void;
    resetFields: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
    fields: [],
    addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
    updateField: (id, updatedField) =>
        set((state) => ({
            fields: state.fields.map((field) =>
                field.id === id ? { ...field, ...updatedField } : field
            ),
        })),
    deleteField: (id) =>
        set((state) => ({
            fields: state.fields.filter((field) => field.id !== id),
        })),
    resetFields: () => set({ fields: [] }),
}));