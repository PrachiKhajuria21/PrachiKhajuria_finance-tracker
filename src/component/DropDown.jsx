import React from "react";

export default function DropDown({ data, name, setFormData, value }) {
  const handleValue = (e) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <>
      {console.log({ data }, { value })}
      <select
        className="form-control"
        onChange={handleValue}
        name={name}
        value={value ? value: ''} 
        defaultValue={value}
      >
        <option value="" disabled>
          Select Option
        </option>
        {data.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </>
  );
}
