import React, { Fragment, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaHome,
  FaImage,
  FaInfoCircle,
  FaLayerGroup,
  FaPlus,
  FaRegClock,
  FaRegStar,
  FaStar,
  FaTable,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { fetchWorkspace } from "../apis/workspace.api";
import InputAdd from "../components/InputAdd";
import { WorkspaceInterface } from "../types";

const Dashboard = () => {
  const [showSlideMenu, setShowSlideMenu] = useState(true);
  const [showWorkspaceInfo, setShowWorkspaceInfo] = useState("");
  const [workspace, setWorkspace] = useState([]);
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const handleMenuLeftClick = (workspaceId: string | undefined) => {
    if (workspaceId === undefined || workspaceId === showWorkspaceInfo) {
      setShowWorkspaceInfo("0");
    } else setShowWorkspaceInfo(workspaceId);
  };

  const handleSetNewWorkspaceName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWorkspaceName(e.target.value);
  };
  const handleAddNewWorkspace = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitAddWorkspace();
      setNewWorkspaceName("");
    }
  };
  const handleSubmitAddWorkspace = () => {
    if (newWorkspaceName === "") {
      return alert("Please enter card name");
    }
    // setWorkspace(workspace);
    setShowAddWorkspace(!showAddWorkspace);
  };
  const handleShowWorkspaceAdd = () => {
    setShowAddWorkspace(!showAddWorkspace);
  };

  const fetchData = async () => {
    const res = await fetchWorkspace();
    setWorkspace(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div
        className="slide-menu"
        style={{ width: showSlideMenu ? "300px" : "0" }}
      >
        <div
          className="btn-open-slide-menu"
          onClick={() => setShowSlideMenu(!showSlideMenu)}
          style={{ display: showSlideMenu ? "none" : "block" }}
        >
          <FaChevronRight />
        </div>
        <ul style={{ display: showSlideMenu ? "block" : "none" }}>
          <span
            className="btn-close-slide-menu"
            onClick={() => setShowSlideMenu(!showSlideMenu)}
          >
            <FaTimes />
          </span>
          <li className="slide-menu-top-items">
            <span>
              <FaTable />
            </span>
            <span>Bảng</span>
          </li>
          <li className="slide-menu-top-items">
            <span>
              <FaLayerGroup />
            </span>
            <span>Mẫu</span>
          </li>
          <li className="slide-menu-top-items active">
            <span>
              <FaHome />
            </span>
            <span>Trang chủ</span>
          </li>
          <hr />
          <li>
            <div>
              <div
                className="slide-menu-workspace-title"
                onClick={handleShowWorkspaceAdd}
              >
                <span>Các không gian làm việc</span>
                <span>
                  <FaPlus />
                </span>
              </div>
              {showAddWorkspace && (
                <div className="slide-menu-input-container">
                  <InputAdd
                    handleSetNewName={handleSetNewWorkspaceName}
                    handleAddNew={(e) => handleAddNewWorkspace(e)}
                    handleSubmitAdd={handleSubmitAddWorkspace}
                    handleShowAdd={handleShowWorkspaceAdd}
                    placeholder={"không gian"}
                  />
                </div>
              )}
              <div className="slide-menu-workspace-list">
                <ul>
                  {workspace?.map((ws: WorkspaceInterface) => (
                    <li key={ws.workspaceId}>
                      <div
                        className="list-workspace-title"
                        onClick={() => {
                          handleMenuLeftClick(ws.workspaceId);
                        }}
                      >
                        <div>
                          <img src={ws.workspaceImage} alt="ws" />
                          <span>{ws.workspaceName}</span>
                        </div>
                        <FaChevronDown />
                      </div>
                      {ws.workspaceId === showWorkspaceInfo && (
                        <div className="workspace-dropdown">
                          <ul>
                            <li>
                              <div className="workspace-dropdown-items">
                                <div>
                                  <span>
                                    <FaTable />
                                  </span>
                                  <span>Bảng</span>
                                </div>
                                <span className="workspace-downdown-items-icons">
                                  <FaChevronRight />
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="workspace-dropdown-items">
                                <div>
                                  <span>
                                    <FaStar />
                                  </span>
                                  <span>Điểm nổi bật</span>
                                </div>
                                <span className="workspace-downdown-items-icons">
                                  <FaChevronRight />
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="workspace-dropdown-items">
                                <div>
                                  <span>
                                    <FaImage />
                                  </span>
                                  <span>Hình</span>
                                </div>
                                <span className="workspace-downdown-items-icons">
                                  <FaChevronRight />
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="workspace-dropdown-items">
                                <div>
                                  <span>
                                    <FaUsers />
                                  </span>
                                  <span>Thành viên</span>
                                </div>
                                <span className="workspace-downdown-items-icons">
                                  <FaChevronRight />
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="workspace-dropdown-items">
                                <div>
                                  <span>
                                    <FaCog />
                                  </span>
                                  <span>Cài đặt</span>
                                </div>
                                <span className="workspace-downdown-items-icons">
                                  <FaChevronRight />
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="content">
        <section>
          <div className="content-title">
            <FaRegStar />
            <h3>Các bảng ưa thích</h3>
          </div>
          <div className="content-body">
            {workspace?.map((ws: WorkspaceInterface) => (
              <Fragment key={ws.workspaceId}>
                {ws.isFavorite && (
                  <div key={ws.workspaceId}>
                    <img src={ws.workspaceImage} alt="" />
                    <span className="content-body-star-name">
                      {ws.workspaceName}
                    </span>
                    <span
                      className="content-body-star-icon"
                      onClick={() => alert("Đã hủy")}
                      title="Nhấn để xóa khỏi danh sách ưa thích"
                    ></span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </section>
        <section>
          <div className="content-title">
            <FaRegClock />
            <h3>Đã xem gần đây</h3>
          </div>
          <div className="content-body">
            {workspace?.map((ws: WorkspaceInterface) => (
              <div key={ws.workspaceId}>
                <img src={ws.workspaceImage} alt="" />
                <span className="content-body-star-name">
                  {ws.workspaceName}
                </span>
                <span
                  className="content-body-unstar-icon"
                  onClick={() => alert("Đã hủy")}
                  title="Nhấn để thêm vào danh sách ưa thích"
                ></span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <span className="content-title">
            <FaInfoCircle />
            <h3>CÁC KHÔNG GIAN LÀM VIỆC KHÁCH</h3>
          </span>
          <div className="content-body">
            {workspace?.map((ws: WorkspaceInterface) => (
              <div key={ws.workspaceId}>
                <img src={ws.workspaceImage} alt="" />
                <span className="content-body-star-name">
                  {ws.workspaceName}
                </span>
                <span
                  className="content-body-unstar-icon"
                  onClick={() => alert("Đã hủy")}
                  title="Nhấn để thêm vào danh sách ưa thích"
                ></span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <span className="content-title">
            <h3>CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN</h3>
          </span>
          <div className="content-body">
            {workspace?.map((ws: WorkspaceInterface) => (
              <div key={ws.workspaceId}>
                <img src={ws.workspaceImage} alt="" />
                <span className="content-body-star-name">
                  {ws.workspaceName}
                </span>
                <span
                  className="content-body-unstar-icon"
                  onClick={() => alert("Đã hủy")}
                  title="Nhấn để thêm vào danh sách ưa thích"
                ></span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
