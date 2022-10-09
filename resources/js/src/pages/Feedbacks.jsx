import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { InputTextarea } from "primereact/inputtextarea";

import {
    getFeedbacks,
    sendFeedback,
    clear,
    reset,
} from "../features/feedback/feedbackSlice";
import AppContainer from "../layouts/AppContainer";

const Feedbacks = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [data, setData] = useState({
        name: "",
        feedback: "",
    });

    const dispatch = useDispatch();

    const { feedbacks, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.feedback
    );

    useEffect(() => {
        dispatch(getFeedbacks());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setData({
                name: "",
                feedback: "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(sendFeedback(data));
    };

    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-w-auto">
                    <div className="">
                        <ul>
                            {feedbacks?.data.slice(start, end).map((val) => (
                                <li
                                    key={val.id}
                                    className="tw-border-b tw-mt-4"
                                >
                                    <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-center md:tw-items-start tw-py-2 tw-space-x-0 md:tw-space-x-5">
                                        <div className="">
                                            <img
                                                src={
                                                    val.user?.avatar ||
                                                    "/images/no_img.png"
                                                }
                                                width={100}
                                                alt={val.name}
                                            />
                                        </div>
                                        <div className="tw-grow tw-mt-2 md:tw-mt-0">
                                            <h4 className="tw-font-semibold tw-text-center md:tw-text-left">
                                                {val.name}
                                            </h4>
                                            <p className="tw-text-lg">
                                                {val.feedback}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="tw-p-5">
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
                                <span className="p-float-label ">
                                    <InputTextarea
                                        name="feedback"
                                        rows={5}
                                        cols={30}
                                        value={data.feedback}
                                        onChange={handleOnChange}
                                        autoResize
                                    />

                                    <label htmlFor="feedback" className="">
                                        Feedback *
                                    </label>
                                </span>
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                label="Submit"
                                className="tw-w-full"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default Feedbacks;
