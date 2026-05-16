import React, { useState, useEffect } from 'react';
import http from "../../http-common";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";

const AddTask = ({ user }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        submitted: false,
        file: null,
        selectedCategory: ""
    });

    const [categories, setCategories] = useState([]);

    const { title, description, submitted, file, selectedCategory } = formData;

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
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleFileChange = event => {
        setFormData({ ...formData, file: event.target.files[0] });
    };

    const handleCategoryChange = event => {
        setFormData({ ...formData, selectedCategory: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("user_id", user.id);
        formData.append("category_id", selectedCategory);
        formData.append("file", file);

        http
            .post("/addTask", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                setFormData({ ...formData, submitted: true });
            })
            .catch(e => {
                console.log(e);
            });
    };

    if (submitted) {
        return <Navigate to="/myTasks" />;
    }

    return (
        <div className="container-md mt-3">
            <div className="col-sm-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input type="text" name="title" value={title} placeholder="Заголовок задачи" onChange={handleChange} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="description" value={description} placeholder="Описание задачи" onChange={handleChange} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <select className="form-control" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <input className="form-control" type="file" id="file" onChange={handleFileChange} required/>
                    </div>
                    <input type="submit" value="Добавить" className="btn btn-success"/>
                </form>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(AddTask);