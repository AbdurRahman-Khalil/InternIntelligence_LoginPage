import { useState } from "react";

import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { Form } from "../components/form/Form";
import { Header } from "../components/Header";
import { InputField } from "../components/form/InputField";
import { FormBtns } from "../components/form/FormBtns";
import { ResetBtn } from "../components/form/ResetBtn";
import { SubmitBtn } from "../components/form/SubmitBtn";
import { FormHelper } from "../components/form/FormHelper";



export const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [signingUp, setSigningUp] = useState(false);


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

        if (name === "confirmPassword") {
            if (!value) {
                error = "Please confirm your password";
            } else if (value !== formData.password) {
                error = "Passwords do not match";
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

        if (validateForm()) {
            setSigningUp(true);
            const toastId = toast.loading("Signing up...");

            try {
                // Register user
                await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                // console.log(userCredential.user);

                toast.success("Signed up & Logged in successfully!", { id: toastId });

                // Clear form after successful registeration 
                setFormData({
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

            } catch (err) {
                // console.error(err.code);

                // Handle registration errors
                if (err.code === "auth/email-already-in-use") {
                    toast.error("This email is already in use. Try another email.", { id: toastId });
                    
                } else {
                    toast.error("Registration failed. Please try again.", { id: toastId });
                }

            } finally {
                setSigningUp(false);
            }
        }
    };

    const handleReset = () => {
        setFormData({
            email: "",
            password: "",
            confirmPassword: ""
        });

        setErrors({});
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Header
                headText={"Create an Account"}
                subHeadText={"It's quick and easy."}
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
                    <InputField
                        inputType={"password"}
                        inputName={"confirmPassword"}
                        inputId={"confirmPassword"}
                        inputPlaceholder={"Confirm your password"}
                        inputValue={formData.confirmPassword}
                        inputOnChange={handleChange}
                        error={errors.confirmPassword}
                    />
                </div>
                <FormBtns>
                    <ResetBtn onClick={handleReset} />
                    <SubmitBtn submitBtnText={"Signup"} />
                </FormBtns>
                <FormHelper
                    formHelperText={"Already have an account?"}
                    formHelperLinkDest={"/login"}
                    formHelperLinkText={"Login"}
                />
            </div>
        </Form>
    );
};



