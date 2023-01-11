import React, { useState } from "react";
import {
  FaArrowUp,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaLinkedin,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { login } from "../apis/authenication.api";
import { UserInterface } from "../types";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitUsername();
    }
  };
  const submitUsername = () => {
    if (username === "") {
      return alert("Please enter a username");
    } else {
      setShowPasswordInput(!showPasswordInput);
    }
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleKeyDownPassword = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!password) {
        alert("Please enter a password");
      } else if (password) {
        handleSubmit();
      }
    }
  };
  const handleSubmit = async () => {
    if (username === "") {
      return alert("Please enter username");
    } else if (password === "") {
      return alert("Please enter password");
    } else {
      const newUser: UserInterface = { email: username, password };
      await login(newUser);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-img-top">
          <img
            src="./logo-border.png"
            alt="logo-border"
            className="logo-border"
          />
          <img src="./logo.png" alt="logo" className="logo-img" />
        </div>
        <div className="login-title">
          {/* <h1>Chello ID</h1> */}
          <h1>Đăng nhập</h1>
        </div>
        <div className="login-social">
          <span className="facebook-icon">
            <FaFacebook />
          </span>
          <span className="google-icon">
            <FaGoogle />
          </span>
          <span className="github-icon">
            <FaGithub />
          </span>
          <span className="linkedin-icon">
            <FaLinkedin />
          </span>
        </div>
        <h3>hoặc</h3>
        <div className="login-content">
          <div
            className="login-username"
            style={{
              borderRadius: showPasswordInput ? "10px 10px 0 0" : "10px",
            }}
          >
            <input
              type="text"
              placeholder="Nhập tài khoản"
              onChange={handleSetUsername}
              autoFocus
              onKeyDown={handleKeyDown}
              onFocus={(e) => setShowPasswordInput(false)}
            />
            {!showPasswordInput && (
              <FaRegArrowAltCircleRight onClick={submitUsername} />
            )}
          </div>
          {showPasswordInput && (
            <div className="login-password">
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                onChange={handleSetPassword}
                autoFocus
                onKeyDown={handleKeyDownPassword}
                required
              />
              <FaRegArrowAltCircleRight onClick={handleSubmit} />
            </div>
          )}
        </div>
        <div className="login-footer">
          <div className="login-footer-checkbox">
            <input type="checkbox" id="rememberCheckbox" />
            <label htmlFor="rememberCheckbox">Nhớ tài khoản</label>
          </div>
          <hr />
          <div className="forgot-password">
            <Link to="">
              <span>
                Quên tài khoản hoặc mật khẩu? <FaArrowUp />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
