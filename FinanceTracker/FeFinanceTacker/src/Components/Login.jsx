import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [spendings, setSpendings] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8080/users/loginUsername/${username}`;
            console.log(`Fetching data from: ${url}`);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Raw response:', response);

            if (!response.ok) {
                throw new Error(`User not found or API error: ${response.status}`);
            }
            const userData = await response.json();
            console.log('Parsed JSON response:', userData);
            if (password === userData.password) {
                setMessage('Login successful');
                setSpendings(userData.spendings);

                navigate(`/dashboard/${username}`);
            } else {
                setMessage('Password incorrect');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setMessage('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <FontAwesomeIcon icon={faPiggyBank} className="icon" />
                <h2>Login</h2>
                {message && <p>{message}</p>}
                <div className="input-group">
                    <label htmlFor="username">
                        <FontAwesomeIcon icon={faUser} /> Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">
                        <FontAwesomeIcon icon={faLock} /> Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>

                <button type="submit" className="button">Login</button>
                <button type="button" className="button signup-button" onClick={() => navigate('/signup')}>
                    Sign Up
                </button>
            </form>
            {spendings.length > 0 && (
                <div>
                    <h3>Spending List</h3>
                    <ul>
                        {spendings.map((item, index) => (
                            <li key={index}>{item.description}: ${item.amount}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Login;