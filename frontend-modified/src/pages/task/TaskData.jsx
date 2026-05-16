import React, { useState, useEffect } from 'react';
import http from "../../http-common";
import { Navigate, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import CommentSection from '../comment/CommentSection';

const TaskData = ({ user }) => {
    const { id } = useParams();
    const [task, setTask] = useState({
        id: id,
        title: "",
        description: "",
        file_name: "",
        mime_type: ""
    });
    const [categoryId, setCategoryId] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [categories, setCategories] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        function getTask() {
            http
                .get("/taskFile/" + id)
                .then(response => {
                    if (response.data) {
                        setTask(response.data.task);
                        setFileUrl(response.data.file);
                        setCategoryId(response.data.category_id);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
        getTask();
    }, [id]);

    useEffect(() => {
        http.get("/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    }, []);

    const handleChange = event => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    const handleCategoryChange = event => {
        setCategoryId(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        var data = {
            title: task.title,
            description: task.description,
            user_id: user.id,
            category_id: categoryId
        };
        http
            .post("/updateTask/" + task.id, data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    function deleteTask() {
        http
            .post("/deleteTask/" + task.id)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        !submitted ? (
            <div className="container-md mt-3">
                <div className="row">
                    <div className="col-sm-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <input type="text" name="title" value={task.title} placeholder="Заголовок задачи" onChange={handleChange} className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <input type="text" name="description" value={task.description} placeholder="Описание задачи" onChange={handleChange} className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                {task.mime_type.includes("image") &&
                                    <img src={fileUrl} style={{width: '200px'}} alt="Изображение задачи"/>}
                            </div>
                            <div className="form-group mb-3">
                                <select className="form-control" value={categoryId} onChange={handleCategoryChange}>
                                    <option value="">Выберите категорию</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">Открыть файл</a>
                            <div className="row g-2 mt-1">
                                <div className="col-auto">
                                    <input type="submit" value="Обновить" className="btn btn-success"/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-danger" onClick={deleteTask}>Удалить</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-7">
                        <CommentSection taskId={id} />
                    </div>
                </div>
            </div>
        ) : <Navigate to="/myTasks"/>
    )
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(TaskData);