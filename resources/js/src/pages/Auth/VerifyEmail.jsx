import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import {
    logout,
    resendVerification,
    reset,
} from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

export default function VerifyEmail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    const onLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const submit = (e) => {
        e.preventDefault();

        dispatch(resendVerification());
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-border tw-shadow-lg tw-rounded-md tw-p-5 md:tw-p-8 tw-bg-white tw-w-full md:tw-w-[36.5rem]">
                    <div className="tw-mb-4 tw-text-gray-600">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                    </div>

                    <form onSubmit={submit} className="tw-py-5">
                        <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between">
                            <Button
                                className="tw-ml-4 custom-btn mt-2"
                                id="custom"
                                type="submit"
                                label="Resend Verification Email"
                                disabled={isLoading}
                            />

                            <button
                                onClick={onLogout}
                                className="tw-underline tw-text-sm tw-text-gray-600 hover:tw-text-gray-900"
                            >
                                Log Out
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppContainer>
    );
}
