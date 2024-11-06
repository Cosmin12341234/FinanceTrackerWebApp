import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
    const { username } = useParams();
    const [userId, setUserId] = useState(null);
    const [spendings, setSpendings] = useState([]);
    const [form, setForm] = useState({
        amount: '',
        location: '',
        date: '',
        category: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                if (!username) {
                    throw new Error('Username not provided');
                }

                const response = await fetch(`http://localhost:8080/users/getIdByUsername/${username}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch user: ${response.statusText}`);
                }

                const userId = await response.text();
                console.log('User ID fetched:', userId);

                if (!isNaN(userId)) {
                    setUserId(Number(userId));
                } else {
                    console.error('Fetched data is not a valid ID:', userId);
                    setError('User ID not found in the response.');
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            }
        };

        fetchUserId();
    }, [username]);

    useEffect(() => {
        const fetchSpendings = async () => {
            if (userId === null) {
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/spendings/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch spendings: ${response.statusText}`);
                }

                const spendingsData = await response.json();
                console.log('Spendings data fetched:', spendingsData);
                setSpendings(spendingsData);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSpendings();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddSpending = async (e) => {
        e.preventDefault();
        const newSpending = {
            user: {
                id: userId
            },
            amount: parseFloat(form.amount),
            location: form.location,
            date: form.date,
            category: form.category
        };

        try {
            const response = await fetch('http://localhost:8080/spendings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSpending)
            });

            if (!response.ok) {
                throw new Error(`Failed to add spending: ${response.statusText}`);
            }

            const addedSpending = await response.json();
            setSpendings([...spendings, addedSpending]);
            setForm({
                amount: '',
                location: '',
                date: '',
                category: ''
            });
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    const handleRemoveSpending = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/spendings/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete spending: ${response.statusText}`);
            }

            setSpendings(spendings.filter(spending => spending.id !== id));
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <FontAwesomeIcon icon={faPiggyBank} className="logo" />
                <p>{username}</p>
            </div>
            <div className="content">
                {error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <>
                        <div className="form-container">
                            <form className="add-spending-form" onSubmit={handleAddSpending}>
                                <div className="form-group">
                                    <label htmlFor="amount">Amount:</label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={form.amount}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Location:</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={form.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Date:</label>
                                    <input
                                        type="datetime-local"
                                        id="date"
                                        name="date"
                                        value={form.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category:</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={form.category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="add-button">Add Spending</button>
                            </form>
                        </div>
                        <div className="spendings-container">
                            {loading ? (
                                <p>Loading spendings...</p>
                            ) : (
                                <div className="spendings-list">
                                    {spendings.length > 0 ? (
                                        <ul>
                                            {spendings.map((spending) => (
                                                <li key={spending.id}>
                                                    <div><strong>Amount:</strong> {spending.amount.toFixed(2)} LEI</div>
                                                    <div><strong>Location:</strong> {spending.location}</div>
                                                    <div><strong>Date:</strong> {spending.date || 'N/A'}</div>
                                                    <div><strong>Category:</strong> {spending.category}</div>
                                                    <button
                                                        className="remove-button"
                                                        onClick={() => handleRemoveSpending(spending.id)}
                                                        title="Remove Spending"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No spendings found.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;