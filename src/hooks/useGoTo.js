import { useNavigate } from "react-router-dom";

const useGoTo = () => {
    const navigate = useNavigate();

    return {
        goBack: (path = -1) => navigate(path),
        goToLogin: () => navigate("/login"),
        goToSignup: () => navigate("/signup"),
        goToDashboard: () => navigate("/dashboard"),
    };
};

export default useGoTo;