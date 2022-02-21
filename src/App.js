import React, { useState, useEffect } from 'react';
import './App.css';
const axios = require('axios');

function App() {
    const getTableContentsUrl = 'http://localhost:3005/getTableContents';
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(getTableContentsUrl)
            .then(response => {
                setData(response.data);
                console.log('data is here', response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <div className="App">
            <h1>QUIZ RESULTS</h1>
            {data.length > 0 && (
                <table>
                    <tbody>
                        <tr>
                            <th>Question Id</th>
                            <th>User Id</th>
                            <th>Answer</th>
                            <th>Expected Answer</th>
                            <th>Submittion Date</th>
                        </tr>
                        {data.map((val, key) => {
                            return (
                                <tr
                                    className={
                                        val.expected_answer == val.answer
                                            ? 'table-row-true'
                                            : 'table-row-false'
                                    }
                                    key={key}>
                                    <td>{val.question_id}</td>
                                    <td>{val.user_id}</td>
                                    <td>
                                        {val.answer.length > 10
                                            ? val.answer.substring(0, 7) + '...'
                                            : val.answer}
                                    </td>
                                    <td>{val.expected_answer}</td>
                                    <td>
                                        {new Date(
                                            val.submition_time,
                                        ).toString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;
