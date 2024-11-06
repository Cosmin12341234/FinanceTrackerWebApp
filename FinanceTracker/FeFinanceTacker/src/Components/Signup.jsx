import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8080/users`;
            console.log(`Sending data to: ${url}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            console.log('Raw response:', response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Parsed error response:', errorData);
                if (response.status === 409 && response.statusText === "") {
                    setMessage('User already exists. Please use a different username.');
                } else {
                    throw new Error(`Signup failed: ${response.statusText}`);
                }
            } else {
                const responseData = await response.json();
                console.log('Parsed JSON response:', responseData);

                setMessage('Signup successful. Please log in.');
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.message !== 'User already exists. Please use a different username.') {
                setMessage('Username taken! Please try again.');
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <FontAwesomeIcon icon={faPiggyBank} className="icon" />
                <h2>Signup</h2>
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

                <button type="submit" className="button">Signup</button>
            </form>
        </div>
    );
};

export default Signup;