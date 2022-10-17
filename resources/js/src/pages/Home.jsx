import AppContainer from "../layouts/AppContainer";

const Home = () => {
    return (
        <AppContainer>
            <div className="tw-grow tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-mb-8">
                    <img
                        src="/images/logo.png"
                        alt="Tritek consulting"
                        width={245}
                    />
                </div>
                <div
                    className="tw-mb-5 tw-flex tw-items-center tw-flex-col"
                    style={{ maxWidth: 550 }}
                >
                    <h1 className="tw-mb-2 tw-font-semibold tw-text-2xl md:tw-text-4xl dark:tw-text-white">
                        1-on-1 Career Mentorship
                    </h1>
                    <h2 className="tw-break-normal tw-font-medium tw-text-lg md:tw-text-2xl dark:tw-text-white tw-mx-4">
                        Master your craft with leading mentors at your side.
                        Grow with every online mentoring session and take the
                        next step in your career. All on your terms, for a flat
                        monthly price.
                    </h2>
                </div>
            </div>
        </AppContainer>
    );
};

export default Home;
