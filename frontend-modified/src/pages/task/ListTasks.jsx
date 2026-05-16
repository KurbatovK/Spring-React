import React, { useEffect, useState } from 'react';
import http from "../../http-common";

const ListTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        http.get("/tasks")
            .then(response => {
                setTasks(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    }, []); // Пустой массив зависимостей означает, что эффект будет вызываться только один раз после монтирования компонента

    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col-sm-4 mt-2">
                    <div className="list-group">
                        {tasks.map((task, i) => (
                            <div className="list-group-item">
                                {i + 1}. {task.title} ({task.description})
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListTasks;
