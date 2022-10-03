import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import AppContainer from "../layouts/AppContainer";

const CancelBooking = () => {
    const [booking, setBooking] = useState({});
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    const { bookings, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.booking
    );

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
                            Cancel Booking
                        </h2>
                    </div>
                    <form onSubmit={onSubmit} className="p-fluid">
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Dropdown
                                    name="booking"
                                    value={booking}
                                    optionLabel="booking_number"
                                    options={bookings}
                                    onChange={handleOnChange}
                                    placeholder="Select booking"
                                />
                                <label htmlFor="booking" className="">
                                    Select booking *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <InputTextarea
                                    rows={5}
                                    cols={30}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    autoResize
                                />

                                <label htmlFor="reason" className="">
                                    Reason for cancelling this session?
                                </label>
                            </span>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            label="Cancel Session"
                        />
                    </form>
                </div>
            </div>
        </AppContainer>
    );
};

export default CancelBooking;
