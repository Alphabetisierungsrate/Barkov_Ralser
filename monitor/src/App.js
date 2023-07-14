import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import axios from "axios";

function App() {
    const [users, setUsers] = useState([])
    const fetchUserData = async () => {
        await axios.get("http://localhost:8080/api/getBalance")
            .then(response => {
                console.log(response.data)
                setUsers(response.data)
            })
    }

    useEffect(() => {
        fetchUserData().then(r => r)
    }, [])

    return (
        <div className="App">
            <h1>Verteilte Systeme - Monitor</h1>
            {users.length > 0 && (
                <ol>
                    {users.map(user => (
                        <li key={user._id}>
                            <p>id: {user._id}</p>
                            <p>balance: {user.balance}</p>
                            <p>operations: {user.operations.toString()}</p>
                        </li>
                    ))}
                </ol>
            )}


        </div>
    );
}

export default App;
