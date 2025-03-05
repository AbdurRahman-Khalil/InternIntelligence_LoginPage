import { Link } from "react-router-dom";

export const FormHelper = ({ formHelperText, formHelperLinkDest, formHelperLinkText }) => {
    return (
        <p className="form-helper-text whitespace-nowrap">
            {formHelperText}
            <Link to={formHelperLinkDest} className="text-[#262329] underline">
                {" "}{formHelperLinkText}
            </Link>
        </p>
    );
};
