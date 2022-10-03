import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import AppContainer from "../layouts/AppContainer";

const ScheduleBooking = () => {
    const [data, setData] = useState({
        role_applied: "",
        other: "",
        date: "",
        time: "",
        mentor: "",
    });

    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.booking
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            // setData({

            // });
        }

        //dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const selectItems = ["Project Manager", "Business Analyst", "Orthers"];

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white">
                <div className="tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8">
                    <div className="tw-text-center tw-mb-8">
                        <h2 className="tw-text-2xl tw-font-medium text-center tw-mb-2">
                            Book a session
                        </h2>
                    </div>
                    <form onSubmit={onSubmit} className="p-fluid">
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Dropdown
                                    name="role_applied"
                                    value={data.role_applied}
                                    options={selectItems}
                                    onChange={handleOnChange}
                                    placeholder="Role applied for"
                                />
                                <label htmlFor="role_applied" className="">
                                    Role *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputText
                                    name="other"
                                    type="text"
                                    value={data.other}
                                    onChange={handleOnChange}
                                />
                                <label htmlFor="other" className="">
                                    Others
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Dropdown
                                    name="mentor"
                                    value={data.mentor}
                                    options={selectItems}
                                    onChange={handleOnChange}
                                    placeholder="Select mentor"
                                />
                                <label htmlFor="role" className="">
                                    Select mentor *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <Calendar
                                    name="date"
                                    value={data.date}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            date: e.value,
                                        })
                                    }
                                    showIcon
                                    className="tw-w-full"
                                    readOnlyInput
                                    required
                                />
                                <label htmlFor="date" className="">
                                    Date
                                </label>
                            </span>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            label="Book Session"
                            className="tw-w-full"
                        />
                    </form>
                </div>
            </div>
        </AppContainer>
    );
};

export default ScheduleBooking;
