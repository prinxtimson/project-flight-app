import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

import { reset, updateUser } from "../features/auth/authSlice";
import AppContainer from "../layouts/AppContainer";
import ProfileAvatar from "../components/ProfileAvatar";

const Profile = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        avatar: "",
        phone: "",
    });

    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );
    console.log(user);
    useEffect(() => {
        if (user) {
            setData({
                firstname: user.profile.firstname,
                lastname: user.profile.lastname,
                email: user.email,
                avatar: user.avatar,
                phone: user.profile.phone || "",
            });
        }
    }, [user]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success("Profile update successful");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(updateUser(data));
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white">
                <div className="tw-card tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8 tw-border">
                    <div className="tw-text-center tw-mb-8">
                        <h2 className="tw-text-lg tw-font-medium text-center tw-mb-2">
                            Profile
                        </h2>
                    </div>

                    <form className="p-fluid" onSubmit={submit}>
                        {/* <div className="tw-flex tw-flex-col tw-items-center tw-mb-8">
                            <ProfileAvatar
                                source={`${
                                    user?.avatar
                                }?${new Date().getTime()}`}
                            />
                        </div> */}
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
                                    readOnly
                                />
                                <label htmlFor="email" className="">
                                    Email *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-8">
                            <span className="p-float-label ">
                                <InputText
                                    name="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="phone" className="">
                                    Phone Number
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

export default Profile;
