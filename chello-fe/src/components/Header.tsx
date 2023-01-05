import { Fragment, useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaCaretDown,
  FaPlus,
  FaTable,
  FaUsers,
  FaLayerGroup,
  FaPaintRoller,
  FaSignInAlt,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { createWorkspace, fetchWorkspace } from "../apis/workspace.api";
import "../App.css";
import { WorkspaceInterface } from "../types";
import Modal from "./Modal";

const Header = () => {
  const [theme, setTheme] = useState("default");
  const [toggleNav, setToggleNav] = useState(true);
  const [workspace, setWorkspace] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const handleClickToggleModal = (name: string) => {
    handleToggleModal();
    handleModalName(name);
  };
  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };
  const handleModalName = (name: string) => {
    setModalName(name);
  };

  const handleSetNewWorkspaceName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWorkspaceName(e.target.value);
  };

  const handleSubmitAddWorkspace = async () => {
    if (newWorkspaceName === "") {
      return alert("Please enter card name");
    }
    await createWorkspace({ workspaceName: newWorkspaceName });
    setToggleModal(!toggleModal);
    fetchData();
  };

  const fetchData = async () => {
    const res = await fetchWorkspace();
    setWorkspace(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const changeTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <>
      <header className={theme}>
        {toggleModal && (
          <Modal
            name={modalName}
            type="create"
            handleToggleModal={handleToggleModal}
            handleSubmit={handleSubmitAddWorkspace}
          >
            <div className="modal-body">
              <label htmlFor="modal-input">Tên {modalName}</label>
              <input
                type="text"
                id="modal-input"
                onChange={handleSetNewWorkspaceName}
              />
            </div>
          </Modal>
        )}
        <div className="navbar">
          {/* Left */}
          <div className="navbar-left">
            <Link to="/">
              <img src="./logo.png" alt="logo" className="logo-icon" />
              <span>Chello</span>
            </Link>
            <div className="navbar-responsive">
              <div
                className="navbar-responsive-toggle"
                onClick={() => setToggleNav(!toggleNav)}
              >
                <span>Công cụ</span>
                <span>
                  <FaCaretDown />
                </span>
              </div>
              {toggleNav && (
                <ul className={"navbar-responsive-item"}>
                  <li>
                    <span>Các không gian làm việc</span>
                    <span>
                      <FaCaretDown />
                    </span>
                    <div className="navbar-dropdown">
                      <ul>
                        <h5>Không gian của tôi</h5>
                        {workspace.map((ws: WorkspaceInterface) => (
                          <li key={ws.workspaceId}>
                            <img src={ws.workspaceImage} alt="img" />
                            <span>{ws.workspaceName}</span>
                          </li>
                        ))}
                        <h5>Không gian ưa thích</h5>
                        {workspace.map((ws: WorkspaceInterface) => (
                          <Fragment key={ws.workspaceId}>
                            {ws.isFavorite && (
                              <li
                                key={ws.workspaceId}
                                className="navbar-dropdown-star-items"
                              >
                                <div>
                                  <img src={ws.workspaceImage} alt="img" />
                                  <span>{ws.workspaceName}</span>
                                </div>
                                <div title="Nhấn để xóa khỏi danh sách ưa thích"></div>
                              </li>
                            )}
                          </Fragment>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <span>Gần đây</span>
                    <span>
                      <FaCaretDown />
                    </span>
                    <div className="navbar-dropdown">
                      <ul>
                        <h5>Đã xem gần đây</h5>
                        {workspace.map((ws: WorkspaceInterface) => (
                          <li key={ws.workspaceId}>
                            <img src={ws.workspaceImage} alt="img" />
                            <span>{ws.workspaceName}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <span>Ưa thích</span>
                    <span>
                      <FaCaretDown />
                    </span>
                    <div className="navbar-dropdown">
                      <ul>
                        {workspace.map((ws: WorkspaceInterface) => (
                          <Fragment key={ws.workspaceId}>
                            {ws.isFavorite && (
                              <li
                                key={ws.workspaceId}
                                className="navbar-dropdown-star-items"
                              >
                                <div>
                                  <img src={ws.workspaceImage} alt="img" />
                                  <span>{ws.workspaceName}</span>
                                </div>
                                <div title="Nhấn để xóa khỏi danh sách ưa thích"></div>
                              </li>
                            )}
                          </Fragment>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <span>Mẫu</span>
                    <span>
                      <FaCaretDown />
                    </span>
                    <div className="navbar-dropdown">
                      <ul>
                        <h5>Các mẫu hàng đầu</h5>
                        {workspace.map((ws: WorkspaceInterface) => (
                          <li key={ws.workspaceId}>
                            <img src={ws.workspaceImage} alt="img" />
                            <span>{ws.workspaceName}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <span>Tạo mới</span>
                    <span>
                      <FaPlus title="Tạo bảng mới" />
                    </span>
                    <div className="navbar-dropdown">
                      <ul>
                        <li className="navbar-dropdown-icon-items">
                          <div onClick={() => handleClickToggleModal("bảng")}>
                            <span>Tạo bảng mới</span>
                            <p>
                              Một bảng được tạo thành từ các thẻ được sắp xếp
                              trong danh sách. Sử dụng bảng để quản lý các dự
                              án, theo dõi thông tin, hoặc tổ chức bất cứ việc
                              gì.
                            </p>
                          </div>
                          <div>
                            <FaTable />
                          </div>
                        </li>
                        <li className="navbar-dropdown-icon-items">
                          <div>
                            <span>Bắt đầu với mẫu</span>
                            <p>Bắt đầu nhanh hơn với mẫu bảng.</p>
                          </div>
                          <div>
                            <FaLayerGroup />
                          </div>
                        </li>
                        <li className="navbar-dropdown-icon-items">
                          <div
                            onClick={() => handleClickToggleModal("không gian")}
                          >
                            <span>Tạo không gian làm việc</span>
                            <p>
                              Một Không gian làm việc là tập hợp các bảng và mọi
                              người. Sử dụng Không gian làm việc để tổ chức công
                              ty của bạn, hỗ trợ người bận rộn, gia đình hoặc
                              bạn bè.
                            </p>
                          </div>
                          <div>
                            <FaUsers />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="navbar-right">
            <div className="navbar-right-search">
              <span>
                <FaSearch />
              </span>
              <input placeholder="Tìm kiếm" />
            </div>
            <div className="navbar-right-icons">
              <ul>
                <li>
                  <span>
                    <FaPaintRoller />
                  </span>
                  <div className="navbar-dropdown">
                    <ul>
                      <h5>Màu chủ đề</h5>
                      <hr />
                      <span onClick={() => changeTheme("default")}>Gốc</span>
                      <span onClick={() => changeTheme("dark")}>Tối</span>
                      <span onClick={() => changeTheme("light")}>Sáng</span>
                      <span onClick={() => changeTheme("time")}>
                        Theo thời gian
                      </span>
                    </ul>
                  </div>
                </li>
                <li>
                  <span>
                    <FaBell />
                  </span>
                  <div className="navbar-dropdown navbar-dropdown-noti">
                    <ul>
                      <div>
                        <h3>Thông báo</h3>
                        <div>
                          <label htmlFor="checkbox">
                            Hiện những tin nhắn chưa đọc
                            <input type="checkbox" id="checkbox" />
                          </label>
                        </div>
                      </div>
                      <hr />
                      <div className="navbar-dropdown-noti-content">
                        <img
                          src="https://a.trellocdn.com/prgb/dist/images/taco-sleep.ee2660df9335718b1a80.svg"
                          alt="no-noti"
                        />
                        <span>Không có thông báo nào!</span>
                      </div>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link to="/profile">
                    <img
                      className="avatar"
                      src="https://i.ibb.co/xMdsc1K/WBS.png"
                      alt="avatar"
                    />
                  </Link>
                  <div className="navbar-dropdown">
                    <ul>
                      <h5>Tài khoản</h5>
                      <Link to="/profile">
                        <span>Hồ sơ và hiển thị</span>
                      </Link>
                      <Link to="/">
                        <span>Hoạt động</span>
                      </Link>
                      <Link to="/">
                        <span>Thẻ</span>
                      </Link>
                      <Link to="/">
                        <span>Cài đặt</span>
                      </Link>
                      <hr />
                      <Link to="#!">
                        <span>Trợ giúp</span>
                      </Link>
                      <Link to="#!">
                        <span>Phím tắt</span>
                      </Link>
                      <hr />
                      <Link to="#!">
                        <span>Đăng xuất</span>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link to="/login">
                    <FaSignInAlt />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
