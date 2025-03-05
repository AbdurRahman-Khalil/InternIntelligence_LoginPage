import { RiResetRightLine } from "react-icons/ri";


export const ResetBtn = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick}
            className="flex items-center gap-1 pl-[0.93rem] pr-4 mb-0.5 h-[3.15em] transitions text-[1.08rem] font-semibold tracking-[0.03em]
            bg-[hsl(267,8%,89%)] hover:bg-[hsl(267,8%,95%)] border-2 border-[#655e6e] rounded-[0.8rem] cursor-pointer"
        >
            <RiResetRightLine className="text-lg" /> <span>Reset</span>
        </button>
    );
};
