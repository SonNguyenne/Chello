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
import { logout } from "../apis/authenication.api";
import { createWorkspace, fetchWorkspace } from "../apis/workspace.api";
import "../App.css";
import { WorkspaceInterface } from "../types";
import Loading from "./Loading";
import Modal from "./Modal";

const Header = () => {
  const [theme, setTheme] = useState("default");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const res = await fetchWorkspace();
    setLoading(false);
    setWorkspace(res.data);
  };

  const handleLogout = async () => {
    await logout();
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
        {loading && <Loading />}
        {toggleModal && (
          <Modal
            name={modalName}
            type="create"
            handleToggleModal={handleToggleModal}
            handleSubmit={handleSubmitAddWorkspace}
          >
            <div className="modal-body">
              <label htmlFor="modal-input">T??n {modalName}</label>
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
              <img src="../logo.png" alt="logo" className="logo-icon" />
              <span>Chello</span>
            </Link>
            {window.localStorage.getItem("user") && (
              <div className="navbar-responsive">
                <div
                  className="navbar-responsive-toggle"
                  onClick={() => setToggleNav(!toggleNav)}
                >
                  <span>C??ng c???</span>
                  <span>
                    <FaCaretDown />
                  </span>
                </div>
                {toggleNav && (
                  <ul className={"navbar-responsive-item"}>
                    <li>
                      <span>C??c kh??ng gian l??m vi???c</span>
                      <span>
                        <FaCaretDown />
                      </span>
                      <div className="navbar-dropdown">
                        <ul>
                          <h5>Kh??ng gian c???a t??i</h5>
                          {workspace.map((ws: WorkspaceInterface) => (
                            <li key={ws.workspaceId}>
                              <img src={ws.workspaceImage} alt="img" />
                              <span>{ws.workspaceName}</span>
                            </li>
                          ))}
                          <h5>Kh??ng gian ??a th??ch</h5>
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
                                  <div title="Nh???n ????? x??a kh???i danh s??ch ??a th??ch"></div>
                                </li>
                              )}
                            </Fragment>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <span>G???n ????y</span>
                      <span>
                        <FaCaretDown />
                      </span>
                      <div className="navbar-dropdown">
                        <ul>
                          <h5>???? xem g???n ????y</h5>
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
                      <span>??a th??ch</span>
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
                                  <div title="Nh???n ????? x??a kh???i danh s??ch ??a th??ch"></div>
                                </li>
                              )}
                            </Fragment>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <span>M???u</span>
                      <span>
                        <FaCaretDown />
                      </span>
                      <div className="navbar-dropdown">
                        <ul>
                          <h5>C??c m???u h??ng ?????u</h5>
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
                      <span>T???o m???i</span>
                      <span>
                        <FaPlus title="T???o b???ng m???i" />
                      </span>
                      <div className="navbar-dropdown">
                        <ul>
                          <li className="navbar-dropdown-icon-items">
                            <div onClick={() => handleClickToggleModal("b???ng")}>
                              <span>T???o b???ng m???i</span>
                              <p>
                                M???t b???ng ???????c t???o th??nh t??? c??c th??? ???????c s???p x???p
                                trong danh s??ch. S??? d???ng b???ng ????? qu???n l?? c??c d???
                                ??n, theo d??i th??ng tin, ho???c t??? ch???c b???t c??? vi???c
                                g??.
                              </p>
                            </div>
                            <div>
                              <FaTable />
                            </div>
                          </li>
                          <li className="navbar-dropdown-icon-items">
                            <div>
                              <span>B???t ?????u v???i m???u</span>
                              <p>B???t ?????u nhanh h??n v???i m???u b???ng.</p>
                            </div>
                            <div>
                              <FaLayerGroup />
                            </div>
                          </li>
                          <li className="navbar-dropdown-icon-items">
                            <div
                              onClick={() =>
                                handleClickToggleModal("kh??ng gian")
                              }
                            >
                              <span>T???o kh??ng gian l??m vi???c</span>
                              <p>
                                M???t Kh??ng gian l??m vi???c l?? t???p h???p c??c b???ng v??
                                m???i ng?????i. S??? d???ng Kh??ng gian l??m vi???c ????? t???
                                ch???c c??ng ty c???a b???n, h??? tr??? ng?????i b???n r???n, gia
                                ????nh ho???c b???n b??.
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
            )}
          </div>

          {/* Right */}
          <div className="navbar-right">
            {window.localStorage.getItem("user") && (
              <div className="navbar-right-search">
                <span>
                  <FaSearch />
                </span>
                <input placeholder="T??m ki???m" />
              </div>
            )}
            <div className="navbar-right-icons">
              <ul>
                <li>
                  <span>
                    <FaPaintRoller />
                  </span>
                  <div className="navbar-dropdown">
                    <ul>
                      <h5>M??u ch??? ?????</h5>
                      <hr />
                      <span onClick={() => changeTheme("default")}>G???c</span>
                      <span onClick={() => changeTheme("dark")}>T???i</span>
                      <span onClick={() => changeTheme("light")}>S??ng</span>
                      <span onClick={() => changeTheme("time")}>
                        Theo th???i gian
                      </span>
                    </ul>
                  </div>
                </li>
                {window.localStorage.getItem("user") ? (
                  <>
                    <li>
                      <span>
                        <FaBell />
                      </span>
                      <div className="navbar-dropdown navbar-dropdown-noti">
                        <ul>
                          <div>
                            <h3>Th??ng b??o</h3>
                            <div>
                              <label htmlFor="checkbox">
                                Hi???n nh???ng tin nh???n ch??a ?????c
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
                            <span>Kh??ng c?? th??ng b??o n??o!</span>
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
                          <h5>T??i kho???n</h5>
                          <Link to="/profile">
                            <span>H??? s?? v?? hi???n th???</span>
                          </Link>
                          <Link to="/">
                            <span>Ho???t ?????ng</span>
                          </Link>
                          <Link to="/">
                            <span>Th???</span>
                          </Link>
                          <Link to="/">
                            <span>C??i ?????t</span>
                          </Link>
                          <hr />
                          <Link to="#!">
                            <span>Tr??? gi??p</span>
                          </Link>
                          <Link to="#!">
                            <span>Ph??m t???t</span>
                          </Link>
                          <hr />
                          <Link to="/" onClick={handleLogout}>
                            <span>????ng xu???t</span>
                          </Link>
                        </ul>
                      </div>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login">
                      <FaSignInAlt />
                    </Link>
                  </li>
                )}
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
