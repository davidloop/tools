import { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

let links = [
    { id: "", label: "Font Size Converter" },
    { id: "ratio-calculator", label: "Ratio Calculator" },
    { id: "modular-scale", label: "Modular Font Size Scale" },
    { id: "image-compressor", label: "Image Compressor" },
];

function NavigationMain() {
    const location = useLocation();
    const currentPath = location.pathname.replace(/^\/+|\/+$/g, '');

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    {links.map((link) => {
                        const isActive = currentPath === link.id;

                        return (
                            <NavLink
                                key={link.id}
                                to={`/${link.id}`}
                                className={({ isActive }) => isActive ? 'current' : ''}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="background"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                    />
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default NavigationMain;
