import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";

import AppContainer from "../layouts/AppContainer";
import {
    getBookings,
    getBookingsByPage,
    clear,
} from "../features/booking/bookingSlice";

const Bookings = () => {
    const [first, setFirst] = useState(0);
    const dispatch = useDispatch();

    const { bookings, isLoading } = useSelector((state) => state.booking);

    useEffect(() => {
        dispatch(getBookings());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (bookings) {
            setFirst(bookings.current_page - 1);
        }
    }, [bookings]);

    const formatDate = (value) => {
        const d = new Date(value);

        return d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.created_at);
    };

    const attendanceBodyTemplate = (rowData) => {
        return "attendance";
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white">
                <div className="tw-shadow-md tw-rounded-md tw-p-4 tw-bg-white">
                    <DataTable
                        value={bookings?.data}
                        className="p-datatable-staffs"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        dataKey="id"
                        rowHover
                        emptyMessage="No booking found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        first={first}
                        onPage={(e) => dispatch(getBookingsByPage(e.first + 1))}
                    >
                        <Column
                            field="id"
                            header="ID"
                            style={{ minWidth: "6rem" }}
                        />
                        <Column
                            field="date"
                            header="Date"
                            sortable
                            style={{ minWidth: "10rem" }}
                            body={dateBodyTemplate}
                        />
                        <Column
                            field="time"
                            header="Time"
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            field="mentor"
                            header="Mentor"
                            style={{ minWidth: "14rem" }}
                        />
                        <Column
                            header="Attendance"
                            style={{ minWidth: "10rem" }}
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
