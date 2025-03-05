import { useEffect, useState } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { Loader } from "../components/Loader";



export const AuthRoute = ({ restricted, redirectTo }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [fetching, setIsFetching] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsFetching(false);
        });

        return () => unsubscribe();
    }, []);

    if (fetching) return <Loader />;

    // If user exists & route is restricted, redirect them
    if (user && restricted) return <Navigate to={redirectTo} replace />;

    // If user doesn't exist & route is private, redirect them
    if (!user && !restricted) return <Navigate to={redirectTo} replace />;

    return <Outlet />;
};
