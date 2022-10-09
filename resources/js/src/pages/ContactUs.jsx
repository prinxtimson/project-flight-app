import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";
import axios from "axios";

import AppContainer from "../layouts/AppContainer";

const ContactUs = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        enquiry: "",
    });

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios
            .post("/api/contact", data)
            .then((res) => {
                setLoading(false);
                toast.success("Contact us form submitted successfully");
                setData({
                    name: "",
                    phone: "",
                    email: "",
                    enquiry: "",
                });
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.message);
                setLoading(false);
            });
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white">
                <div className="tw-border tw-shadow-lg tw-rounded-md tw-p-5 md:tw-p-8 tw-bg-white tw-w-full md:tw-w-[36.5rem]">
                    <div className="tw-text-center tw-mb-8">
                        <h2 className="tw-text-2xl tw-font-medium text-center tw-mb-2">
                            Contact Us
                        </h2>
                    </div>

                    <form className="p-fluid" onSubmit={submit}>
                        <div className="field tw-mb-8">
                            <span className="p-float-label ">
                                <InputText
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="name" className="">
                                    Name *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-8">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="email" className="">
                                    Email *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-8">
                            <span className="p-float-label ">
                                <InputText
                                    name="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="phone" className="">
                                    Phone Number
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-8">
                            <span className="p-float-label ">
                                <InputTextarea
                                    rows={5}
                                    cols={30}
                                    value={data.enquiry}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            enquiry: e.target.value,
                                        })
                                    }
                                    autoResize
                                />

                                <label htmlFor="Enquiry" className="">
                                    Enquiry
                                </label>
                            </span>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            label="Submit"
                            className="tw-w-full"
                        />
                    </form>
                </div>
            </div>
        </AppContainer>
    );
};

export default ContactUs;
