import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store";

import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import ScheduleBooking from "./pages/ScheduleBooking";
import RescheduleBooking from "./pages/RescheduleBooking";
import CancelBooking from "./pages/CancelBooking";
// import ChangePassword from "./pages/Auth/ChangePassword";
// import Profile from "./pages/Profile";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                    {/* <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />*/}
                    <Route
                        path="/password/reset/:token"
                        element={<ResetPassword />}
                    />
                    <Route path="bookings">
                        <Route path="" element={<Bookings />} />
                        <Route path="schedule" element={<ScheduleBooking />} />
                        <Route
                            path="reschedule"
                            element={<RescheduleBooking />}
                        />
                        <Route path="cancel" element={<CancelBooking />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </Provider>
    );
};

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
