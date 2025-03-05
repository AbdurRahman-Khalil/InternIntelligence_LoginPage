import { Link } from "react-router-dom";

import logoImg from "../assets/logo_img.png";


export const Logo = ({ logoText }) => {
    return (
        <Link
            to={"/"}
            className="logo text-4xl font-semibold text-[#19171c] tracking-wide font-SmoochSans 
            flex items-center gap-[0.23em] motion-preset-bounce"
        >
            <img
                className="max-w-[1.1em] object-cover"
                src={logoImg}
                alt="logo_img"
            />
            {logoText}
        </Link>
    );
};
