
export const SubmitBtn = ({ submitBtnText }) => {
    return (
        <button
            type="submit"
            className="btn block flex-1 h-[3.1em] mt-[1.5em] mb-[1.7em] transitions"
        >
            {submitBtnText}
        </button>
    );
};
