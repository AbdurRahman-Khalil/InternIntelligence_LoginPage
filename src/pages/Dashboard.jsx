import { Header } from "../components/Header";


export const Dashboard = () => {

    return (
        <section className="parent-container">
            <Header
                headText={"Welcome to the Dashboard!"}
                subHeadText={"Monitor, manage and optimize your experience with our intuitive and customizable Dashboard."}
            />
        </section>
    );
};
