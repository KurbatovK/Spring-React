import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import auth from "../../actions/auth";

const Register = ({ dispatch, isRegistered, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [successful, setSuccessful] = useState(undefined);

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);

    dispatch(auth.register(username, password, role))
        .then(() => {
          setSuccessful(true);
          window.location.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
      <div className="container-md mt-3">
        <div className="col-md-5">
          <form onSubmit={handleRegister}>
            <div className="form-group mt-2">
              <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
            <div className="form-group mt-2">
              <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            <div className="form-group mt-2">
              <select
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={handleRoleChange}
                  required
              >
                <option value="">Выберите роль</option>
                <option value="ROLE_USER">Пользователь</option>
                <option value="ROLE_ADMIN">Администратор</option>
              </select>
            </div>
            <div className="form-group mt-2">
              <button className="btn btn-primary btn-block">Зарегистрировать</button>
            </div>
            {message && successful !== undefined && (
                <div className="form-group">
                  <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                    {message}
                  </div>
                </div>
            )}
          </form>
        </div>
      </div>
  );
};

const mapStateToProps = state => ({
  isRegistered: state.auth.isRegistered,
  message: state.message.message
});

export default connect(mapStateToProps)(Register);
