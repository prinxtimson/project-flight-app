import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import {
    getBookings,
    rescheduleBooking,
    clear,
    reset,
} from "../features/booking/bookingSlice";

import AppContainer from "../layouts/AppContainer";
import LinkButton from "../components/LinkButton";

const RescheduleBooking = () => {
    const [selectedBooking, setSelectedBooking] = useState();
    const [data, setData] = useState({
        id: "",
        date: "",
    });

    const dispatch = useDispatch();

    const { bookings, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.booking
    );

    useEffect(() => {
        dispatch(getBookings());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (selectedBooking) {
            setData({ ...data, id: selectedBooking.id });
        }
    }, [selectedBooking]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                id: "",
                date: "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!data.id || !data.date) {
            toast.error("complete required field(s)");
            return;
        }
        dispatch(rescheduleBooking(data));
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white tw-py-8">
                <div className="tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8 tw-border">
                    <div className="tw-text-center tw-mb-8">
                        <h2 className="tw-text-2xl tw-font-medium text-center tw-mb-2">
                            Reschedule Booking
                        </h2>
                    </div>
                    <form onSubmit={onSubmit} className="p-fluid">
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Dropdown
                                    name="booking"
                                    value={selectedBooking}
                                    optionLabel="booking_number"
                                    options={bookings}
                                    onChange={(e) =>
                                        setSelectedBooking(e.target.value)
                                    }
                                    placeholder="Select booking"
                                />
                                <label htmlFor="booking" className="">
                                    Select booking *
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
                            label="Rebook Session"
                        />
                    </form>
                    <LinkButton
                        to="../"
                        className="tw-block tw-text-indigo-700 tw-mt-4 tw-w-full "
                    >
                        Cancel
                    </LinkButton>
                </div>
            </div>
        </AppContainer>
    );
};

export default RescheduleBooking;
