import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";

import AppContainer from "../layouts/AppContainer";

const ContactUs = () => {
    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-border tw-shadow-lg tw-rounded-md tw-p-5 md:tw-p-8 tw-bg-white tw-w-auto"></div>
            </div>
        </AppContainer>
    );
};

export default ContactUs;
