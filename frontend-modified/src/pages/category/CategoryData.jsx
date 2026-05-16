import React, { useState, useEffect } from 'react';
import http from "../../http-common";
import { Navigate, useParams } from 'react-router-dom';

const CategoryData = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get(`/category/${id}`)
            .then(response => {
                setName(response.data.name);
            })
            .catch(e => {
                console.log(e);
            });
    }, [id]);

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name
        };

        http.post(`/updateCategory/${id}`, data)
            .then(() => {
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteBrand = () => {
        http
            .post(`/deleteCategory/${id}`)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }


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
                            <div className="btn-group mt-2">
                                <button type="submit" className="btn btn-success rounded">Обновить</button>
                                <button className="btn btn-danger mx-1 rounded" onClick={deleteBrand}>Удалить</button>
                            </div>
                        </form>
                    ) : (
                        <Navigate to="/listCategories" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryData;
