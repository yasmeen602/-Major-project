import React, { forwardRef, useId } from 'react'
// forwordRef: It is a utility in react that allow a component to forward its ref, to a child component
const Input = forwardRef(function Input(
  { label, type = "text", className = "",  ...probs },
  ref
) {
  const defaultClassName = "px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full";
  const id = useId();
  return (
    <div className="w-full">
    {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
   <input 
   type={type}
   className={`${defaultClassName} ${className}`}
   ref={ref} 
   {...probs} 
   id={id} 
   />
  </div>
  );
});

export default Input;
