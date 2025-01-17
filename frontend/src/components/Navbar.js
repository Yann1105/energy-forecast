import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-2xl font-bold">Energy Forecast</h1>
                <ul className="flex space-x-6">
                    <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
                    <li><Link to="/prediction" className="hover:text-gray-200">Prediction</Link></li>
                    <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
