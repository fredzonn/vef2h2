import React from 'react';
import './Field.css';

interface IFieldProps {
    label: string;
    name: string;
    value?: string;
    type: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    placeHolder?: string;
    inputClass?: string;
}

function Field(props: IFieldProps) {
    const {
        label,
        name,
        value,
        type,
        onChange,
        placeHolder
    } = props;
    let { inputClass } = props;

    if (!inputClass) {
        inputClass = "field__input";
    }

    return (
        <div className="field__container">
            <label>{label}</label>
            <input
                className={inputClass}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
                type={type} />
        </div>
    );
}

export default Field;