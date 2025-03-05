
export const Header = ({ headText, subHeadText }) => {
    return (
        <div className="mb-[1.8em]">
            <h1 className="text-[2.7rem] font-semibold font-Montserrat leading-[1.2em] mb-[0.15em]">{headText}</h1>
            <p className="text-[1.04rem] font-medium tracking-wide">{subHeadText}</p>
        </div>
    );
};
