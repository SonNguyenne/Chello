import React, { Fragment, useEffect, useState } from "react";
import {
  FaChevronRight,
  FaHome,
  FaInfoCircle,
  FaLayerGroup,
  FaPlus,
  FaRegClock,
  FaRegStar,
  FaTable,
  FaTimes,
} from "react-icons/fa";
import { createWorkspace, fetchWorkspace } from "../apis/workspace.api";
import InputAdd from "../components/InputAdd";
import SlideMenu from "../components/SlideMenu";
import { WorkspaceInterface } from "../types";

const Dashboard = () => {
  // const [refresh, setRefresh] = useState(false);
  const [showSlideMenu, setShowSlideMenu] = useState(true);
  const [showWorkspaceInfo, setShowWorkspaceInfo] = useState("");
  const [workspace, setWorkspace] = useState([]);
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  // const onRefresh = () => {
  //   setRefresh(!refresh);
  // };

  const handleMenuLeftClick = (workspaceId: string | undefined) => {
    if (workspaceId === undefined || workspaceId === showWorkspaceInfo) {
      setShowWorkspaceInfo("0");
    } else setShowWorkspaceInfo(workspaceId);
  };

  const handleShowWorkspaceAdd = () => {
    setShowAddWorkspace(!showAddWorkspace);
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
  const handleSubmitAddWorkspace = async () => {
    if (newWorkspaceName === "") {
      return alert("Please enter card name");
    }
    await createWorkspace({ workspaceName: newWorkspaceName });
    fetchData();
    setShowAddWorkspace(!showAddWorkspace);
  };

  const fetchData = async () => {
    const res = await fetchWorkspace();
    setWorkspace(res.data);
    // onRefresh()
  };

  useEffect(() => {
    fetchData();
  }, [workspace]);

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
                <span>Các không gian công khai</span>
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
              <SlideMenu
                data={workspace}
                showById={showWorkspaceInfo}
                isPublic={true}
                handleClick={handleMenuLeftClick}
              />
            </div>
          </li>
          <hr />
          <li>
            <div>
              <div className="slide-menu-workspace-title">
                <span>Không gian riêng tư</span>
              </div>
              <SlideMenu
                data={workspace}
                showById={showWorkspaceInfo}
                isPublic={false}
                handleClick={handleMenuLeftClick}
              />
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
