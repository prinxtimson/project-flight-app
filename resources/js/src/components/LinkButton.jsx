import { Link } from "react-router-dom";

export default function LinkButton({ to, children, className = "" }) {
    return (
        <Link
            to={to}
            className={`tw-px-4 tw-py-2 tw-border tw-rounded-md tw-font-semibold tw-text-xs tw-uppercase tw-tracking-widest tw-transition tw-ease-in-out text-center tw-duration-150 ${className} `}
        >
            {children}
        </Link>
    );
}
