import { useEffect, useState } from "react";

import { MdAlternateEmail } from "react-icons/md";
import { TbLock, TbLockCheck } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";



export const InputField = ({ inputType, inputName, inputId, inputPlaceholder, inputValue, inputOnChange, error }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (inputValue === "") {
            setIsVisible(false);
        }
    }, [inputValue]);


    const handleVisibility = (e) => {
        e.preventDefault();
        setIsVisible((isVisible) => !isVisible);
    }

    const getIconComponent = () => {
        switch (inputId) {
            case "email":
                return <MdAlternateEmail />;
            case "password":
                return <TbLock />;
            case "confirmPassword":
                return <TbLockCheck />;
            default:
                return null;
        }
    };


    return (
        <div className="relative max-w-fit">
            <span className="absolute top-[1.2rem] left-3 text-lg text-[hsl(268,8%,45%)]">
                {getIconComponent()}
            </span>
            <input
                className={`text-[1.017rem] font-semibold tracking-wider text-[hsl(270,8%,15%)] block transitions
                    hover:bg-[hsl(270,10%,96%)] focus:bg-[hsl(270,10%,96%)] focus:outline-[hsl(268,8%,32%)]
                    w-[23em] max-w-full h-[3.5em] px-[2.2em] border rounded-[0.8rem]
                    placeholder:font-medium placeholder:text-[hsl(268,8%,65%)] 
                    ${error ? "border-red-500" : "border-[hsl(267,8%,27%)]"}`}
                type={inputType === "password" ? (isVisible ? "text" : "password") : inputType}
                name={inputName}
                id={inputId}
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={inputOnChange}
            />
            {inputType === "password" && (
                <button
                    type="button"
                    onClick={handleVisibility}
                    className="absolute top-[1.2rem] right-3 text-lg text-[hsl(268,8%,58%)]"
                >
                    {isVisible ? <AiOutlineEye className="motion-preset-expand" /> : <AiOutlineEyeInvisible className="motion-preset-expand" />}
                </button>
            )}
            {error && <p className="text-red-500 text-sm mt-1 w-[23.25em] motion-preset-bounce">{error}</p>}
        </div>
    );
};



