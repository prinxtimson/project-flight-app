import React from "react";

export default function ApplicationLogo({ width = 155, height = 28 }) {
    return (
        <img
            width={width}
            height={height}
            src="/images/logo.png"
            alt="Tritek consulting ltd"
        />
    );
}
