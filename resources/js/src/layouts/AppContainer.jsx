import Footer from "../components/Footer";
import Header from "../components/Header";

const AppContainer = ({ children }) => {
    return (
        <div className="tw-flex tw-flex-col tw-grow">
            <Header />
            <div className="tw-grow tw-flex tw-flex-col">{children}</div>
            <Footer />
        </div>
    );
};

export default AppContainer;
