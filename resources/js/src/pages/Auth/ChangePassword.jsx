import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { resetPass, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

const ChangePassword = () => {
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
        dispatch(resetPass(data));
    };
    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8">
                    <div className="tw-text-center tw-mb-5">
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
                                    className="tw-w-full "
                                    toggleMask
                                    value={data.password}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="password" className="">
                                    New Password *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Password
                                    name="password_confirmation"
                                    toggleMask
                                    className="tw-w-full "
                                    value={data.password_confirmation}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    required
                                />
                                <label
                                    htmlFor="password_confirmation"
                                    className=""
                                >
                                    Confirm Password *
                                </label>
                            </span>
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
