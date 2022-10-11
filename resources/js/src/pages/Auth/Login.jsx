import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Captcha } from "primereact/captcha";
import { toast } from "react-toastify";

import { login, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";
import LinkButton from "../../components/LinkButton";

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const { email, password, remember } = data;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            dispatch(reset());
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(data));
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-border tw-shadow-lg tw-rounded-md tw-p-5 md:tw-p-8 tw-bg-white tw-w-auto">
                    <h1 className="tw-my-5 text-center tw-text-3xl tw-font-semibold">
                        Welcome to Tritek Mentorship
                    </h1>
                    <div className="tw-flex tw-flex-col md:tw-flex-row tw-space-x-8 ">
                        <div className="md:tw-w-1/2 ">
                            <div className="form-demo tw-my-5 ">
                                <div className="card">
                                    <h4 className="text-center tw-text-xl tw-font-medium">
                                        Already have an account?
                                    </h4>
                                    <form
                                        onSubmit={onSubmit}
                                        className="p-fluid"
                                    >
                                        <div className="field">
                                            <span className="p-float-label custom-label p-input-icon-right">
                                                <i className="pi pi-envelope" />
                                                <InputText
                                                    id="email"
                                                    name="email"
                                                    className=""
                                                    value={email}
                                                    autoComplete="off"
                                                    onChange={handleOnChange}
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className="tw-text-white"
                                                >
                                                    Email *
                                                </label>
                                            </span>
                                        </div>
                                        <div className="field">
                                            <span className="p-float-label custom-label">
                                                <Password
                                                    id="password"
                                                    name="password"
                                                    toggleMask
                                                    value={password}
                                                    autoComplete="off"
                                                    feedback={false}
                                                    onChange={handleOnChange}
                                                    className=""
                                                />

                                                <label
                                                    htmlFor="password"
                                                    className=""
                                                >
                                                    Password *
                                                </label>
                                            </span>
                                        </div>
                                        <div className="tw-flex tw-mb-4 tw-justify-between">
                                            <div className="field-checked tw-text-gray-900">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    value={remember}
                                                    onChange={handleOnChange}
                                                    checked={data.remember}
                                                    className="tw-mr-2"
                                                />

                                                <label
                                                    htmlFor="accept"
                                                    className=""
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                            <Link
                                                to="/forgot-password"
                                                className="tw-underline tw-text-sm tw-text-blue-500 hover:tw-text-blue-800 tw-float-right"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <div className="tw-mb-8">
                                            <Captcha siteKey="6Le5UWwiAAAAAOqjfyFOAtKk8mdx3Q8ay4S1kZuG" />
                                        </div>
                                        <Button
                                            id="custom"
                                            type="submit"
                                            label="LOGIN"
                                            disabled={isLoading}
                                            className="custom-btn "
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="tw-hidden md:tw-block tw-mx-4 tw-border" />

                        <div className="tw-hidden md:tw-block tw-w-1/2 tw-my-5">
                            <div className="tw-flex tw-flex-col tw-items-center">
                                <h1 className="tw-text-xl tw-font-medium text-center tw-mb-6">
                                    Don't have an account?
                                </h1>
                                <h2 className="tw-text-lg tw-font-medium text-center tw-mb-2">
                                    Set up an Account
                                </h2>
                                <h4 className="tw-text-lg text-center">
                                    By clicking "Set up Account", you agree to
                                    the Privacy Policy.
                                </h4>
                                <div className="tw-my-8">
                                    <LinkButton
                                        to="/register"
                                        className="tw-text-indigo-700 tw-border-indigo-700 hover:tw-text-white hover:tw-bg-indigo-700 tw-py-5 tw-px-6"
                                    >
                                        Set up Account
                                    </LinkButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
}
