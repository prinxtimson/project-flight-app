import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { forgotPass, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

export default function ForgotPassword() {
    const [data, setData] = useState({
        email: "",
    });

    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                email: "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const onHandleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(forgotPass(data));
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8 tw-border">
                    <div className="form-demo">
                        <div className="flex justify-content-center tw-flex-col ">
                            <div className="tw-my-3"></div>
                            <div className="card">
                                <h5 className="text-center">Forgot Password</h5>
                                <form onSubmit={submit} className="p-fluid">
                                    <div className="field">
                                        <span className="p-float-label p-input-icon-right custom-label">
                                            <i className="pi pi-envelope" />
                                            <InputText
                                                id="name"
                                                name="email"
                                                value={data.email}
                                                autoFocus
                                                onChange={onHandleChange}
                                                required
                                            />
                                            <label htmlFor="email" className="">
                                                Email *
                                            </label>
                                        </span>
                                    </div>
                                    <Button
                                        className="tw-mb-2 custom-btn"
                                        id="custom"
                                        type="submit"
                                        label="Reset Password"
                                        disabled={isLoading}
                                    />
                                </form>
                                <div className="tw-mt-5 tw-flex tw-justify-center">
                                    <Link
                                        to="/login"
                                        className=" tw-underline  hover:tw-text-indigo-700"
                                    >
                                        Remember password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
}
