import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import http from '../../http-common';

const UserTasks = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [displayContent, setDisplayContent] = useState(false);

    useEffect(() => {
        setDisplayContent(user ? true : false);
        if (user) {
            http.get(`/tasks/userId=${user.id}`)
                .then(response => {
                    setTasks(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [user]);

    return (
        <div className="container-md mt-3">
            {displayContent ? (
                <div className="col-sm-4 mt-2">
                    <Link to="/addTask" className="btn btn-success">Добавить задачу</Link>
                    <div className="list-group mt-2">
                        {tasks.map((task, i) => (
                            <div className="list-group-item">
                                <Link key={i} to={`/task/${task.id}`} param1={task.id}>
                                    {i + 1}. {task.title} ({task.description})
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                'Контент доступен только авторизованным пользователям'
            )}
        </div>
    );
};

const mapStateToProps = state => {
    const { user } = state.auth;
    return {
        user
    };
};

export default connect(mapStateToProps)(UserTasks);
