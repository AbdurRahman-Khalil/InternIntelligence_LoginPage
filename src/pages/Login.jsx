import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { Form } from "../components/form/Form";
import { Header } from "../components/Header";
import { InputField } from "../components/form/InputField";
import { FormBtns } from "../components/form/FormBtns";
import { ResetBtn } from "../components/form/ResetBtn";
import { SubmitBtn } from "../components/form/SubmitBtn";
import { FormHelper } from "../components/form/FormHelper";



const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds


export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loggingIn, setLoggingIn] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);


    useEffect(() => {
        const storedAttempts = localStorage.getItem("loginAttempts");
        const lockTimestamp = localStorage.getItem("lockTime");

        if (storedAttempts) setAttempts(parseInt(storedAttempts, 10));

        if (lockTimestamp) {
            const timeRemaining = parseInt(lockTimestamp, 10) - Date.now();
            if (timeRemaining > 0) {
                setIsLocked(true);
                setTimeout(() => {
                    setIsLocked(false);
                    localStorage.removeItem("lockTime");
                    setAttempts(0);
                    localStorage.removeItem("loginAttempts");
                }, timeRemaining);
            }
        }
    }, []);


    const validateFields = (name, value) => {
        let error = "";

        if (name === "email") {
            if (!value) {
                error = "Email is required";

            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = "Invalid email format";
            }
        }

        if (name === "password") {
            const numberCount = (value.match(/\d/g) || []).length;
            const specialCharCount = (value.match(/[!@#$%^&*]/g) || []).length;

            if (!value) {
                error = "Password is required";

            } else if (value.length < 8) {
                error = "Password must be at least 8 characters";

            } else if (value.length > 24) {
                error = "Password must be at most 24 characters";

            } else if (numberCount < 3) {
                error = "Password must include at least 3 numbers";

            } else if (specialCharCount < 3) {
                error = "Password must include at least 3 special characters (!@#$%^&*)";
            }
        }

        return error;
    };

    const validateForm = () => {
        let newErrors = {};

        Object.keys(formData).forEach((field) => {
            const error = validateFields(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateFields(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLocked) {
            const lockTimestamp = parseInt(localStorage.getItem("lockTime"), 10);
            const timeRemaining = Math.ceil((lockTimestamp - Date.now()) / 60000); // Convert ms to minutes
    
            if (timeRemaining > 0) {
                toast.error(`Too many failed attempts. Please try again after ${timeRemaining} min${timeRemaining > 1 ? 's' : ''}.`);
                return;
            } else {
                // Unlock when time is up
                setIsLocked(false);
                setAttempts(0);
                localStorage.removeItem("lockTime");
                localStorage.removeItem("loginAttempts");
            }
        }

        if (validateForm()) {
            setLoggingIn(true);
            const toastId = toast.loading("Logging in...");

            try {
                // Login user
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                // console.log(userCredential.user);

                toast.success("Logged in successfully!", { id: toastId });

                // Clear form after successful login 
                setFormData({ email: "", password: "" });

                // remove login_attempts and locktime
                setAttempts(0);
                localStorage.removeItem("loginAttempts");
                localStorage.removeItem("lockTime");

            } catch (err) {
                // console.error(err.code);

                // Handle authentication errors
                if (err.code === "auth/invalid-credential") {
                    toast.error("Incorrect email or password. Please try again.", { id: toastId });

                    const newAttempts = attempts + 1;
                    setAttempts(newAttempts);
                    localStorage.setItem("loginAttempts", newAttempts);

                    if (newAttempts >= MAX_ATTEMPTS) {
                        const lockTime = Date.now() + LOCK_TIME;
                        localStorage.setItem("lockTime", lockTime);
                        setIsLocked(true);
                        toast.error("Too many failed attempts. Please try again in 15 minutes.");
                    }

                } else {
                    toast.error("Login failed. Please try again.", { id: toastId });
                }

            } finally {
                setLoggingIn(false);
            }
        }
    };

    const handleReset = () => {
        setFormData({
            email: "",
            password: "",
        });

        setErrors({});
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Header
                headText={"Welcome Back!"}
                subHeadText={"Enter your Email and Password to login our dashboard."}
            />
            <div className="form-things">
                <div className="credentials space-y-4">
                    <InputField
                        inputType={"email"}
                        inputName={"email"}
                        inputId={"email"}
                        inputPlaceholder={"Enter your email"}
                        inputValue={formData.email}
                        inputOnChange={handleChange}
                        error={errors.email}
                    />
                    <InputField
                        inputType={"password"}
                        inputName={"password"}
                        inputId={"password"}
                        inputPlaceholder={"Enter your password"}
                        inputValue={formData.password}
                        inputOnChange={handleChange}
                        error={errors.password}
                    />
                </div>
                <label htmlFor="remember_me" className="form-helper-text">
                    <input className="mt-4" type={"checkbox"} name={"remember_me"} id={"remember_me"} />{" "}Remember me
                </label>
                <FormBtns>
                    <ResetBtn onClick={handleReset} />
                    <SubmitBtn submitBtnText={"Login"} />
                </FormBtns>
                <FormHelper
                    formHelperText={"Don't have an account?"}
                    formHelperLinkDest={"/signup"}
                    formHelperLinkText={"Sign up"}
                />
                <Link to={"/"} className="form-helper-text text-[#262329] underline">
                    Forget Password?
                </Link>
            </div>
        </Form>
    );
};




