import React from "react";
import AppContainer from "../layouts/AppContainer";

const AboutUs = () => {
    return (
        <AppContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white">
                <div className="tw-border tw-shadow-lg tw-rounded-md tw-p-5 md:tw-p-8 tw-bg-white tw-w-full md:tw-w-[40rem]">
                    <div className="tw-text-lg tw-my-5">
                        Tritek has a plethora of highly skilled mentors and
                        trainers, equipped with knowledge, skills and experience
                        to train, mentor and coach all candidates towards
                        achieving their goals.
                    </div>
                    <div className="tw-text-lg tw-my-5">
                        We believe in giving you the essential required
                        mentoring support, while also ensuring you gain the
                        practical experience in Project Management and Business
                        Analysis.
                    </div>
                    <div className="tw-text-lg tw-my-5">
                        We provide you with the relevant information, tools,
                        resources, administration of assessment, self-assessment
                        tools, career guidance, and interview preparation needed
                        to secure your dream job and more.
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default AboutUs;
