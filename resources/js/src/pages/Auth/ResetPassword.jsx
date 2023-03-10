import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { resetPass, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

export default function ResetPassword() {
    const passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const { token } = useParams();
    const search = new URLSearchParams(useLocation().search);
    const [data, setData] = useState({
        token: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        setData({ ...data, token, email: search.get("email") });
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                token: "",
                email: "",
                password: "",
                password_confirmation: "",
            });
            if (message === "Password reset successfully") {
                dispatch(reset());
                navigate("/login");
            }
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(resetPass(data));
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8">
                    <div className="form-demo">
                        <div className="flex justify-content-center tw-flex-col">
                            <div className="tw-my-3"></div>
                            <div className="card">
                                <h5 className="text-center">Reset Password</h5>
                                <form
                                    onSubmit={submit}
                                    className="tw-py-5 p-fluid"
                                >
                                    <div className="field">
                                        <span className="p-float-label custom-label p-input-icon-right">
                                            <i className="pi pi-envelope" />
                                            <InputText
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                className=""
                                                onChange={handleOnChange}
                                                readOnly
                                            />
                                            <label htmlFor="email" className="">
                                                Email
                                            </label>
                                        </span>
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label custom-label">
                                            <Password
                                                id="password"
                                                name="password"
                                                value={data.password}
                                                toggleMask
                                                feedback={false}
                                                className={
                                                    data.password &&
                                                    !passwordValidation.test(
                                                        data.password
                                                    )
                                                        ? "p-invalid"
                                                        : ""
                                                }
                                                onChange={handleOnChange}
                                                required
                                            />

                                            <label
                                                htmlFor="password"
                                                className=""
                                            >
                                                Password *
                                            </label>
                                        </span>
                                        {data.password &&
                                            !passwordValidation.test(
                                                data.password
                                            ) && (
                                                <small
                                                    id="password-help"
                                                    className="p-error block"
                                                >
                                                    Must contain at least one of
                                                    each sets A-Z, a-z, 0-9 and
                                                    minimum of 8 characters.
                                                </small>
                                            )}
                                    </div>
                                    <div className="field">
                                        <span className="p-float-label custom-label">
                                            <Password
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={handleOnChange}
                                                toggleMask
                                                feedback={false}
                                                className={
                                                    data.password_confirmation &&
                                                    data.password !==
                                                        data.password_confirmation
                                                        ? "p-invalid"
                                                        : ""
                                                }
                                                required
                                            />

                                            <label
                                                htmlFor="password_confirmation"
                                                className=""
                                            >
                                                Confirm password *
                                            </label>
                                        </span>
                                        {data.password_confirmation &&
                                            data.password !==
                                                data.password_confirmation && (
                                                <small
                                                    id="password-help"
                                                    className="p-error block"
                                                >
                                                    Password do not match
                                                </small>
                                            )}
                                    </div>

                                    <Button
                                        className="tw-ml-4 custom-btn mt-2"
                                        id="custom"
                                        type="submit"
                                        label="Change Password"
                                        disabled={isLoading}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
}
