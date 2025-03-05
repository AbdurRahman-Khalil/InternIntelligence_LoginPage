import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import useGoTo from "../hooks/useGoTo";

import { TbLogout2 } from "react-icons/tb";



export const LogoutBtn = ({ hideSeek }) => {
    const [user, setUser] = useState(null);

    const { goToLogin } = useGoTo();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");

        try {
            await signOut(auth);
            toast.success("Logged out successfully!", { id: toastId });
            goToLogin(); // Redirect user to login page

        } catch (err) {
            toast.error("Logout failed. Please try again.", { id: toastId });
            console.error("Logout Error:", err);
        }
    };

    // Show logout button only if the user is logged in
    if (!user) return null;


    return (
        <button
            onClick={handleLogout}
            className={`absolute top-[3.05rem] right-[5.25em] motion-preset-bounce
            text-[hsl(300,8%,97%)] max-[730px]:text-[hsl(270,8%,20%)] ${hideSeek}
            max-[950px]:right-[4.2em] max-[834px]:right-[4em] max-[730px]:right-[3em] 
            max-[480px]:right-[2.7em] max-[432px]:right-[2.4em] max-[375px]:right-[2em]
            max-[343px]:right-[1.8em] max-[327px]:right-[1.5em] transitions`}
        >
            <TbLogout2 size={26} />
        </button>
    );
};
