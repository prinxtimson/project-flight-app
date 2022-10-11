import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";

import AppContainer from "../layouts/AppContainer";
import { getBookings, clear } from "../features/booking/bookingSlice";
import LinkButton from "../components/LinkButton";

const Bookings = () => {
    const dispatch = useDispatch();

    const { bookings, isLoading } = useSelector((state) => state.booking);

    useEffect(() => {
        dispatch(getBookings());

        return () => dispatch(clear());
    }, []);

    const formatDate = (value) => {
        const d = new Date(value);

        return d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };

    const attendanceBodyTemplate = (rowData) => {
        if (rowData.status == "attended") {
            return <i className="pi pi-check-circle"></i>;
        } else if (rowData.status == "missed") {
            return (
                <i
                    className="pi pi-minus-circle p-danger"
                    style={{ fontColor: "red" }}
                ></i>
            );
        }
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white tw-py-8">
                <div className="tw-shadow-md tw-rounded-md tw-p-4 tw-bg-white tw-border">
                    <div className="tw-flex tw-space-x-8 tw-my-4">
                        <LinkButton
                            to="./reschedule"
                            className="tw-bg-indigo-700 tw-text-white"
                        >
                            Reschedule Bookings
                        </LinkButton>
                        <LinkButton
                            to="./cancel"
                            className="tw-bg-indigo-700 tw-text-white"
                        >
                            Cancel Bookings
                        </LinkButton>
                    </div>
                    <DataTable
                        value={bookings}
                        className="p-datatable-staffs"
                        dataKey="id"
                        rowHover
                        emptyMessage="No booking found."
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                    >
                        <Column
                            field="booking_number"
                            header="Booking ID"
                            style={{ minWidth: "6rem" }}
                        />
                        <Column
                            field="date"
                            header="Date"
                            sortable
                            align="center"
                            style={{ minWidth: "10rem" }}
                            body={dateBodyTemplate}
                        />
                        {/* <Column
                            field="time"
                            header="Time"
                            style={{ minWidth: "10rem" }}
                        /> */}
                        <Column
                            field="mentor"
                            header="Mentor"
                            align="center"
                            style={{ minWidth: "14rem" }}
                        />
                        <Column
                            header="Attendance"
                            style={{ minWidth: "10rem" }}
                            align="center"
                            body={attendanceBodyTemplate}
                        />
                    </DataTable>
                    <div className="tw-flex tw-space-x-5 tw-mt-4">
                        <button className="tw-text-blue-600">Attended</button>
                        <button className="tw-text-blue-600">Missed</button>
                        <button className="tw-text-blue-600">
                            Neither attended nor missed
                        </button>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default Bookings;
