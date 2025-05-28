import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

let links = [
    { id: "", label: "Font Size Converter" },
    { id: "ratio-calculator", label: "Ratio Calculator" },
    { id: "modular-scale", label: "Modular Font Size Scale" },
    { id: "image-compressor", label: "Image Compressor" },
];

function NavigationMain() {
    let [activeLink, setActiveLink] = useState(links[0].id);

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    {links.map((link) => (
                        <NavLink
                            key={link.id}
                            to={`/${link.id}`}
                            onClick={() => setActiveLink(link.id)}
                            className={(navData) => navData.isActive ? 'current' : ''}
                        >
                            {link.label}
                            {activeLink === link.id && (
                                <motion.span
                                    layoutId="background"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                />
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NavigationMain;
