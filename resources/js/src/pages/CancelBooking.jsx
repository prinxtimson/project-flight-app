import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import AppContainer from "../layouts/AppContainer";
import {
    cancelBooking,
    getBookings,
    clear,
    reset,
} from "../features/booking/bookingSlice";
import LinkButton from "../components/LinkButton";

const CancelBooking = () => {
    const [booking, setBooking] = useState(null);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    const { bookings, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.booking
    );

    useEffect(() => {
        dispatch(getBookings());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setValue("");
            setBooking(null);
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!booking || !value) {
            toast.error("complete required field(s)");
            return;
        }
        dispatch(cancelBooking({ id: booking.id, reason: value }));
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white tw-py-8">
                <div className="tw-bg-white tw-p-6 tw-shadow-md tw-rounded-md tw-w-full md:tw-w-[36.5rem] tw-py-8 tw-border">
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
                                    onChange={(e) => setBooking(e.target.value)}
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
                    <LinkButton
                        to="../"
                        className="tw-block tw-text-indigo-700 tw-mt-4 tw-w-full"
                    >
                        Cancel
                    </LinkButton>
                </div>
            </div>
        </AppContainer>
    );
};

export default CancelBooking;
