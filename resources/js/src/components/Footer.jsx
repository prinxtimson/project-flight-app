import { Link } from "react-router-dom";

import ApplicationLogo from "./ApplicationLogo";

const Footer = () => {
    return (
        <div className="tw-w-full border-t">
            <div className="tw-bg-white tw-border-b tw-border-gray-100 tw-py-4">
                <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                    <div className="tw-flex tw-flex-col lg:tw-flex-row tw-w-full tw-items-center">
                        <div className="tw-shrink-0 tw-flex tw-mt-4 tw-items-center tw-flex-col tw-p-2 lg:tw-flex-row">
                            <Link to="/">
                                <ApplicationLogo />
                            </Link>
                        </div>
                        <div className="tw-mx-2 lg:tw-mt-0 tw-mt-4">
                            <h4 className="tw-break-normal tw-text-center lg:tw-text-left">
                                Your trusted source to find highly-vetted
                                mentors & industry professionals to move your
                                career ahead
                            </h4>
                        </div>
                        <div className="tw-flex tw-shrink-0 lg:tw-space-x-5  lg:tw-ml-4 tw-grow tw-flex-col tw-items-center lg:tw-flex-row lg:tw-mt-0 tw-mt-4 tw-justify-center">
                            <Link
                                to="/contact-us"
                                className="tw-underline tw-text-sm tw-text-blue-500 hover:tw-text-blue-800 "
                            >
                                Contact Us
                            </Link>
                            <Link
                                to="/feedback"
                                className="tw-underline tw-text-sm tw-text-blue-500 hover:tw-text-blue-800 "
                            >
                                Provide Feedback
                            </Link>
                            <Link
                                to="/faq"
                                className="tw-underline tw-text-sm tw-text-blue-500 hover:tw-text-blue-800 "
                            >
                                FAQ & Testimonials
                            </Link>
                            <Link
                                to="/faq"
                                className="tw-underline tw-text-sm tw-text-blue-500 hover:tw-text-blue-800 "
                            >
                                Terms and Conditions
                            </Link>
                            <Link
                                to="/faq"
                                className="tw-underline tw-text-sm tw-text-blue-500 hover:tw-text-blue-800 "
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
