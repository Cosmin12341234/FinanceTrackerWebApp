import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Signup from './Components/Signup';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard/:username" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;