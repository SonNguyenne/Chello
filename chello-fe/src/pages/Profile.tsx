import React, { useEffect, useState } from "react";

const api = {
  userId: 1,
  username: "tienthanh25",
  password: "123456",
  avatar: "https://i.ibb.co/xMdsc1K/WBS.png",
  mail: "example@gmail.com",
  notifications: {},
};

const Profile = () => {
  if (window.localStorage.getItem("user") == null) {
    window.location.href = "/login";
  }

  const [user, setUser] = useState(api);
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [mail, setMail] = useState(user.mail);

  useEffect(() => {
    return () => {
      previewAvatar && URL.revokeObjectURL(previewAvatar);
    };
  }, [previewAvatar]);
  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let file = e.target.files[0];
      setPreviewAvatar(URL.createObjectURL(file));
      e.target.value = "";
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (username === "") {
      return alert("username is required");
    }
    if (mail === "") {
      return alert("mail is required");
    }
    if (password === "") {
      return alert("password is required");
    }
    return alert(`Username: ${username}\nMail: ${mail}\nPassword: ${password}`);
  };

  return (
    <div className="profile-container">
      <div className="profile-top">
        <img src={previewAvatar} alt="profile-avatar" />
        <span>
          <span className="profile-top-name">{user.username}</span>
          <span className="profile-top-mail">{user.mail}</span>
        </span>
      </div>
      <div className="profile-content">
        <div className="profile-content-input">
          <label htmlFor="username">T??n hi???n th???</label>
          <input
            type="text"
            placeholder="Nh???p t??n hi???n th??? m???i"
            id="username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="profile-content-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Nh???p mail m???i"
            id="email"
            value={mail}
            onChange={handleMail}
          />
        </div>
        <div className="profile-content-input">
          <label htmlFor="password">M???t kh???u</label>
          <input
            type="password"
            placeholder="Nh???p m???t kh???u m???i"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="profile-content-input">
          <label htmlFor="avatar">H??nh ?????i di???n</label>
          <input type="file" onChange={handlePreviewImage} id="avatar" />
        </div>
        <button className="btn-save-update" onClick={handleSubmit}>
          L??u thay ?????i
        </button>
      </div>
    </div>
  );
};

export default Profile;
