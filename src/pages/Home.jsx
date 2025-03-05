import { Link } from "react-router-dom";
import { Header } from "../components/Header";


export const Home = () => {
    return (
        <section className="parent-container pb-3.5">
            <Header
                headText={"Innovate, Create and Thrive. Unlock Your Potential."}
                subHeadText={"Empowering individuals and businesses to reach new heights. Join us as we redefine what's possible."}
            />
            <hr className="mb-3.5 opacity-0 pointer-events-none"/>
            <Link
                to={"/login"}
                className="btn px-[1.8em] py-[0.8em]"
            >
                Get Started
            </Link>
        </section>
    );
};
