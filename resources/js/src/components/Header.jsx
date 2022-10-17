import { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";

import ApplicationLogo from "./ApplicationLogo";
import LinkButton from "./LinkButton";
import searchData from "../utils/searchData";

const Header = () => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [filteredSearch, setFilteredSearch] = useState([]);
    const [searchShow, setSearchShow] = useState(false);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        let _filteredSearch = searchData.filter(
            (data) =>
                data.content.toLowerCase().includes(searchText.toLowerCase()) ||
                data.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredSearch(_filteredSearch);

        if (searchText === "") {
            setSearchShow(false);
        } else {
            setSearchShow(true);
        }

        return () => setFilteredSearch([]);
    }, [searchText]);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };
    const menu = useRef(null);
    let items = [
        {
            label: "Profile",
            icon: "pi pi-fw pi-user",
            command: () => navigate("/profile"),
        },
        {
            label: "View Bookings",
            icon: "pi pi-fw pi-calendar",
            command: () => navigate("/bookings"),
        },
        {
            label: "Book Session",
            icon: "pi pi-fw pi-calendar-plus",
            command: () => navigate("/bookings/schedule"),
        },
        {
            label: "Change Password",
            icon: "pi pi-fw pi-lock",
            command: () => navigate("/change-password"),
        },
        {
            label: "Logout",
            icon: "pi pi-fw pi-sign-out",
            command: () => onLogout(),
        },
    ];
    return (
        <div className="tw-z-50 tw-sticky tw-top-0 tw-w-full ">
            <nav className="tw-bg-white tw-border-b tw-border-gray-100 tw-pt-2">
                <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                    <div className="tw-flex tw-justify-between tw-h-16">
                        <div className="tw-flex tw-w-full tw-items-center">
                            <div className="tw-shrink-0 tw-flex tw-items-center  tw-p-2">
                                <Link to="/">
                                    <ApplicationLogo />
                                </Link>
                            </div>

                            <div className="tw-hidden tw-items-center tw-grow  lg:tw-flex tw-justify-between tw-shrink-0">
                                <div className="tw-flex tw-space-x-8 sm:tw-my-px sm:tw-ml-10 tw-grow">
                                    <Link to="/">Home</Link>
                                    <Link to="/about-us">About Us</Link>
                                    <Link to="/contact-us">Help</Link>
                                </div>
                                <div className="tw-grow">
                                    <div className="tw-relative">
                                        <span className="p-input-icon-left tw-w-full">
                                            <i className="pi pi-search" />
                                            <InputText
                                                value={searchText}
                                                onChange={(e) =>
                                                    setSearchText(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Search"
                                                className="my-padding tw-w-full"
                                            />
                                            {/* <button
                                                className=""
                                                onClick={() =>
                                                    setSearchText("")
                                                }
                                            >
                                                <i className="pi pi-cancel" />
                                            </button> */}
                                        </span>
                                        <div
                                            className={` tw-absolute tw-shadow-md tw-border tw-w-full tw-h-96 tw-overflow-auto tw-bg-white ${
                                                searchShow
                                                    ? "tw-block"
                                                    : "tw-hidden"
                                            }`}
                                        >
                                            {filteredSearch.map((page) => (
                                                <div
                                                    className="tw-mt-2 tw-mx-2 tw-border-b"
                                                    key={page.id}
                                                >
                                                    <Link
                                                        to={page.link}
                                                        className="tw-p-2 tw-rounded"
                                                    >
                                                        <h2 className="tw-text-lg tw-font-semibold">
                                                            Page
                                                        </h2>
                                                        <div className="tw-flex tw-items-top">
                                                            <h4 className="tw-text-lg tw-font-medium tw-shrink-0">
                                                                {`${page.name} - `}
                                                            </h4>

                                                            <p className="tw-truncate tw-text-ellipsis tw-overflow-hidden">
                                                                {` ${page.content}`}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {user ? (
                                    <div className="tw-relative tw-flex tw-items-center tw-ml-auto">
                                        <div className="tw-flex tw-justify-between">
                                            <div className="tw-flex tw-items-center tw-ml-6 tw-pl-6">
                                                <div className="tw-mr-4">
                                                    <i className="pi pi-bell" />
                                                </div>
                                                <div className="tw-mx-2">
                                                    <Avatar
                                                        image={user?.avatar}
                                                        shape="circle"
                                                        size="large"
                                                        onClick={(event) =>
                                                            menu.current.toggle(
                                                                event
                                                            )
                                                        }
                                                        imageAlt={user?.name}
                                                    />
                                                    <Menu
                                                        model={items}
                                                        popup
                                                        ref={menu}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="tw-flex tw-items-center tw-space-x-4 tw-mx-5">
                                        <LinkButton
                                            to="/register"
                                            className="tw-bg-indigo-700 tw-text-white"
                                        >
                                            Sign up
                                        </LinkButton>
                                        <LinkButton
                                            to="/login"
                                            className="tw-text-indigo-700 tw-border-indigo-700"
                                        >
                                            Login
                                        </LinkButton>
                                    </div>
                                )}
                            </div>
                        </div>

                        {user && (
                            <div className="tw-relative tw-flex tw-items-center tw-ml-auto lg:tw-hidden">
                                <div className="tw-flex tw-justify-between">
                                    <div className="tw-flex tw-items-center tw-ml-6 tw-pl-6">
                                        <div className="tw-mr-4">
                                            <i className="pi pi-bell" />
                                        </div>
                                        <div className="tw-mx-4">
                                            <Avatar
                                                image={user?.avatar}
                                                shape="circle"
                                                size="large"
                                                onClick={(event) =>
                                                    menu.current.toggle(event)
                                                }
                                                imageAlt={user?.name}
                                            />
                                            <Menu
                                                model={items}
                                                popup
                                                ref={menu}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="tw-mr-2 tw-flex tw-items-center lg:tw-hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="tw-inline-flex tw-items-center tw-justify-center tw-p-2 tw-rounded-md tw-text-gray-400 hover:tw-text-gray-500 hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-bg-gray-100 focus:tw-text-gray-500 tw-transition tw-duration-150 tw-ease-in-out"
                            >
                                <svg
                                    className="tw-h-6 tw-w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "tw-inline-flex"
                                                : "tw-hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "tw-inline-flex"
                                                : "tw-hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "tw-block" : "tw-hidden") +
                        " lg:tw-hidden tw-px-8"
                    }
                >
                    <div className="tw-grow tw-my-4">
                        <span className="p-input-icon-left tw-w-full">
                            <i className="pi pi-search" />
                            <InputText
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search"
                                className="my-padding"
                            />
                        </span>
                    </div>
                    <div className="tw-flex tw-flex-col tw-pt-2 tw-pb-3 tw-space-y-4">
                        <Link to="/">Home</Link>
                        <Link to="/about-us">About Us</Link>
                        <Link to="/contact-us">Help</Link>
                    </div>
                    {user ? (
                        <div className="tw-pt-4 tw-pb-1 tw-border-t tw-border-gray-200">
                            <div className="tw-px-4">
                                <div className="tw-font-medium tw-text-base tw-text-gray-800">
                                    {`Jide Timson`}
                                </div>
                                <div className="tw-font-medium tw-text-sm tw-text-gray-500">
                                    {`timson.babajide@gmail.com`}
                                </div>
                            </div>

                            <div className="tw-p-4 tw-space-y-6">
                                <button onClick={onLogout}>Log Out</button>
                            </div>
                        </div>
                    ) : (
                        <div className="tw-pt-4 tw-pb-1 tw-border-t tw-border-gray-200">
                            <div className="tw-flex tw-items-center tw-space-x-4 tw-mb-4">
                                <LinkButton
                                    to="/register"
                                    className="tw-bg-indigo-700 tw-text-white"
                                >
                                    Sign up
                                </LinkButton>
                                <LinkButton
                                    to="/login"
                                    className="tw-text-indigo-700 tw-border-indigo-700"
                                >
                                    Login
                                </LinkButton>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
