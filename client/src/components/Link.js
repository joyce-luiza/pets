import React from "react";
import PropTypes from "prop-types";
import "./styles/Link.css";

const Link = ({ href, children }) => {
    return (
        <a href={href} className="link">
            {children}
        </a>
    );
};

Link.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Link;
