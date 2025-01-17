import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PredictionPage from './components/PredictionPage';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ marginBottom: '50px' }}> {/* To avoid footer overlap */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/prediction" element={<PredictionPage />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
