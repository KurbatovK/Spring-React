import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from "../../http-common";

const ListCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        http.get("/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col">
                    <Link to="/addCategory" className="btn btn-success mb-3">Добавить категорию</Link>
                </div>
            </div>
            <div className="col-sm-4 mt-2">
                <div className="list-group">
                    {categories.map((category, i) => (
                        <Link to={`/category/${category.id}`} className="list-group-item">{category.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListCategories;
