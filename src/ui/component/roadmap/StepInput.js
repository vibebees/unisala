import React from "react"
import { IonInput } from "@ionic/react"

const StepInput = ({
  currentstep,
  label,
  inputType,
  placeholder,
  setInput,
  inputValue,
  defaultValue,
  name
}) => {
  return (
    <>
      <div className="border-b border-neutral-400 border-opacity-40 pb-2 ">
        <span className="text-sm text-neutral-400">{currentstep}</span>
        <div className="flex items-center h-fit gap-4 py-2">
          <label htmlFor="Gpa" className="text-sm h-fit">
            {label}
          </label>
          <IonInput
            placeholder={placeholder}
            name={name}
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, [e.target.name]: e.target.value }
              })
            }
            value={inputValue}
            type={inputType}
            defaultValue={defaultValue}
            className="w-fit h-3  placeholder:text-neutral-400   placeholder:text-xs placeholder:text-opacity-40"
          ></IonInput>
          {inputValue && inputValue !== "" && (
            <button className="text-xs border border-neutral-700 bg-neutral-300 text-neutral-700 hover:bg-neutral-400 hover:text-neutral-900 h-fit rounded-md px-2 py-1 ">
              Save
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default StepInput
