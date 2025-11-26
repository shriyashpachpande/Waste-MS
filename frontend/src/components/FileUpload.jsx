import React from "react";
export default function FileUpload({ label, name, multiple = false, accept, onChange }) {
  return (
    <div className="mb-3">
      <label className="block font-medium text-green-700 mb-1">{label}</label>
      <input
        type="file"
        name={name}
        multiple={multiple}
        accept={accept}
        onChange={onChange}
        className="input"
      />
    </div>
  );
}
