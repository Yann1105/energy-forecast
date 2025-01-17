import React from 'react';

const Contact = () => {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h1>
            <form className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Your name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Message</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Your message"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;
