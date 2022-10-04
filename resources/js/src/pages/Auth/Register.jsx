import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { toast } from "react-toastify";

import { login, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

export default function Register() {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <AppContainer>
            <div className="tw-mb-8 tw-mt-2 tw-mx-4">
                <h3 className="tw-text-right">
                    Already have an account, click here{" "}
                    <Link
                        to="/login"
                        className="tw-underline  tw-text-blue-500 hover:tw-text-blue-800 "
                    >
                        Login
                    </Link>{" "}
                    to login?
                </h3>
            </div>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8 tw-border">
                    <div className="tw-text-center tw-mb-8">
                        <h2 className="tw-text-lg tw-font-medium text-center tw-mb-2">
                            Set up an Account
                        </h2>
                    </div>

                    <form className="p-fluid" onSubmit={submit}>
                        <div className="field tw-mb-8">
                            <span className="p-float-label ">
                                <InputText
                                    name="firstname"
                                    type="text"
                                    value={data.firstname}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="firstname" className="">
                                    First name *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-8">
                            <span className="p-float-label ">
                                <InputText
                                    name="lastname"
                                    type="text"
                                    value={data.lastname}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="lastname" className="">
                                    Last name *
                                </label>
                            </span>
                        </div>

                        <div className="field tw-mb-8">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="email" className="">
                                    Email *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-8">
                            <span className="p-float-label custom-label">
                                <Password
                                    name="password"
                                    toggleMask
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                />

                                <label htmlFor="password" className="">
                                    Password *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-8">
                            <span className="p-float-label custom-label">
                                <Password
                                    name="password_confirmation"
                                    toggleMask
                                    value={data.password_confirmation}
                                    onChange={handleOnChange}
                                    required
                                />

                                <label htmlFor="password" className="">
                                    Confirm Password *
                                </label>
                            </span>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            label="Sign Up"
                            className="tw-w-full"
                        />
                    </form>
                </div>
            </div>
        </AppContainer>
    );
}
