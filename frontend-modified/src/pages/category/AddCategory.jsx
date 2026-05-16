import React, { useState } from 'react';
import http from "../../http-common";
import { Navigate } from 'react-router-dom';

function AddCategory() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name
        };

        http
            .post("/addCategory", data)
            .then(() => {
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col-sm-4">
                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Наименование категории"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success mt-2">Добавить</button>
                        </form>
                    ) : (
                        <Navigate to="/listCategories" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddCategory;