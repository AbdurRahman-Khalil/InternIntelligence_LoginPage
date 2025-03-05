import useGoTo from "../../hooks/useGoTo";

import { IoIosArrowRoundBack } from "react-icons/io";


export const Form = ({ children, onSubmit }) => {
    const { goBack } = useGoTo();

    return (
        <form onSubmit={onSubmit} className="parent-container">
            <button
                onClick={() => goBack(-1)}
                className="text-[hsl(274,8%,41%)] mb-6 block w-fit border-2 border-[hsl(267,33%,78%)] rounded-[0.8rem] hover:-translate-x-2 transitions"
            >
                <IoIosArrowRoundBack size={33} />
            </button>
            {children}
        </form>
    );
};
