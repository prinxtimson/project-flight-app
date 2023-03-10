import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { changePass, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

const ChangePassword = () => {
    const passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const [data, setData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
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
                current_password: "",
                password: "",
                password_confirmation: "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(changePass(data));
    };
    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8 tw-border">
                    <div className="tw-text-center tw-mb-8">
                        <div className=" tw-text-2xl tw-font-medium tw-mb-6">
                            Change Password
                        </div>
                    </div>

                    <form className="p-fluid" onSubmit={submit}>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <Password
                                    name="current_password"
                                    className="tw-w-full "
                                    toggleMask
                                    value={data.current_password}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    autoFocus
                                    required
                                />
                                <label htmlFor="current_password" className="">
                                    Current Password *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <Password
                                    name="password"
                                    toggleMask
                                    value={data.password}
                                    onChange={handleOnChange}
                                    feedback={false}
                                    className={
                                        data.password &&
                                        !passwordValidation.test(data.password)
                                            ? "p-invalid"
                                            : ""
                                    }
                                    required
                                />
                                <label htmlFor="password" className="">
                                    New Password *
                                </label>
                            </span>
                            {data.password &&
                                !passwordValidation.test(data.password) && (
                                    <small
                                        id="password-help"
                                        className="p-error block"
                                    >
                                        Must contain at least one of each sets
                                        A-Z, a-z, 0-9 and minimum of 8
                                        characters.
                                    </small>
                                )}
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Password
                                    name="password_confirmation"
                                    toggleMask
                                    value={data.password_confirmation}
                                    onChange={handleOnChange}
                                    required
                                    feedback={false}
                                    className={
                                        data.password_confirmation &&
                                        data.password !==
                                            data.password_confirmation
                                            ? "p-invalid"
                                            : ""
                                    }
                                />
                                <label
                                    htmlFor="password_confirmation"
                                    className=""
                                >
                                    Confirm Password *
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
                            type="submit"
                            disabled={isLoading}
                            label="Submit"
                            className="tw-w-full"
                        />
                    </form>
                </div>
            </div>
        </AppContainer>
    );
};

export default ChangePassword;
