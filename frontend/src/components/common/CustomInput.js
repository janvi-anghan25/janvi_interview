import React from "react";
import { Input } from "reactstrap";

function CustomInput({
  type = "text",
  values,
  name,
  placeholder,
  errors,
  touched,
  handleChange,
  className,
  style,
  disabled = false,
  isIcon = true,
  defaultValue,
  checked,
  iconName,
  isPassword,
  min,
  max,
  step,
}) {
  const isError = errors[name] && touched[name];

  return (
    <React.Fragment>
      <div className="has-wrapper mb-20">
        <Input
          value={values[name]}
          name={name}
          className={
            className ? className : `${isError ? "border-danger " : ""}`
          }
          step={step}
          placeholder={placeholder}
          autoComplete="off"
          style={style}
          onChange={handleChange}
          disabled={disabled}
          defaultValue={defaultValue}
          checked={checked}
          min={min}
          max={max}
        />
        {isError && (
          <div
            style={{ fontSize: 14, display: "flex", flexDirection: "column" }}
            className="text-left mt-1 text-danger"
          >
            {errors[name]}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default CustomInput;
