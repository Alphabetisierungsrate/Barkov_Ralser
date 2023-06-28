import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'

function App() {
    const [users, setUsers] = useState([])

    // const fetchUserData = () => {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             setUsers(data)
    //         })
    // }
    const fetchUserData = () => {
        fetch("http://172.17.0.1:3000/getBalance")
        // fetch("http://localhost:3000/getBalance")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                setUsers(data)
            })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    {users.ids}
                    {users.sums}
                    hello world
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

            { users.length > 0 && (
                <ul>
                    {users.map(user => (
                        <li key={user.ids}>{user.sums}</li>
                    ))}
                    <p>Here should be info about accs</p>
                </ul>
            )}
            </header>

        </div>
    );
}

export default App;
