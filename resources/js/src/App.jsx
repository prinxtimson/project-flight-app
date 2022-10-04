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
import ChangePassword from "./pages/Auth/ChangePassword";
import Profile from "./pages/Profile";
import AuthRoute from "./utils/AuthRoute";
import GuestRoute from "./utils/GuestRoute";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Feedbacks from "./pages/Feedbacks";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import { useEffect } from "react";
import { getCurrentUser } from "./features/auth/authSlice";

const App = () => {
    useEffect(() => {
        store.dispatch(getCurrentUser());
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/feedbacks" element={<Feedbacks />} />
                    <Route path="/email/verify" element={<VerifyEmail />} />
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <Login />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <GuestRoute>
                                <Register />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <GuestRoute>
                                <ForgotPassword />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <AuthRoute>
                                <Profile />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <AuthRoute>
                                <ChangePassword />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/password/reset/:token"
                        element={
                            <GuestRoute>
                                <ResetPassword />
                            </GuestRoute>
                        }
                    />

                    <Route path="bookings">
                        <Route
                            path=""
                            element={
                                <AuthRoute>
                                    <Bookings />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="schedule"
                            element={
                                <AuthRoute>
                                    <ScheduleBooking />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="reschedule"
                            element={
                                <AuthRoute>
                                    <RescheduleBooking />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="cancel"
                            element={
                                <AuthRoute>
                                    <CancelBooking />
                                </AuthRoute>
                            }
                        />
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
