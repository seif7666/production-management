import React from "react";
import "../css/form.css";
type FormProps = {
  name: string;
  setter;
  idName?: string;
  isNumber?:boolean;
};
const Form = (data: FormProps) => {
  return (
    <div style={{ margin: "1em 0em 1em 0em" }}>
      <div className="input-div-container">
        <div className="div-label">
          <label>{data.name}</label>
        </div>
        <div className="div-input">
          <input
            id={data.idName}
            placeholder={data.name}
            type={typeof(data.isNumber)!==undefined && data.isNumber ? "number": "text" }
            onChange={(e) => {
              data.setter(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
