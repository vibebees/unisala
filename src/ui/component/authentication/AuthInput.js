// eslint-disable-next-line no-use-before-define
import React from "react"
import "./auth.css"

export const AuthInput = ({ type, name, value, HandleChange, validation }) => {
    return (
        <div className="auth-input-val-div">
            <input
                onChange={HandleChange}
                type={type}
                name={name}
                value={value}
                className="auth-input"
            />
            <div className="auth-validation-div">
                {validation && (
                    <div className="auth-validation">
                        <p> {validation}</p>
                        <div className="h-2 w-2 left-3 transform rotate-45 -top-1 absolute bg-red-500"></div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default AuthInput
