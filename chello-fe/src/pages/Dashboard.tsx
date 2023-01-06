import React, { useEffect, useState } from "react";
import {
  FaChevronRight,
  FaHome,
  FaLayerGroup,
  FaPlus,
  FaTable,
  FaTimes,
} from "react-icons/fa";
import {
  createWorkspace,
  fetchWorkspace,
  patchWorkspace,
} from "../apis/workspace.api";
import ContentDashboard from "../components/ContentDashboard";
import InputAdd from "../components/InputAdd";
import SlideMenu from "../components/SlideMenu";
import { handleSubmitIsPublic } from "../utils/PatchWorkspace";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [showSlideMenu, setShowSlideMenu] = useState(true);
  const [showWorkspaceInfo, setShowWorkspaceInfo] = useState("");
  const [workspace, setWorkspace] = useState([]);
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const onRefresh = () => {
    setRefresh(!refresh);
  };

  const handleMenuLeftClick = (workspaceId: string | undefined) => {
    if (workspaceId === undefined || workspaceId === showWorkspaceInfo) {
      setShowWorkspaceInfo("0");
    } else setShowWorkspaceInfo(workspaceId);
  };

  // Create workspace function + modal
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
    onRefresh();
  };

  // Handle isPublic: private / public
  const handleClickSubmitIsPublic = async (
    workspaceId?: string,
    isPublic?: boolean
  ) => {
    await handleSubmitIsPublic(workspaceId, isPublic);
    fetchData();
    onRefresh();
  };

  // Handle isFavorite
  const handleClickSubmitIsFavorite = async (
    workspaceId?: string,
    isFavorite?: boolean
  ) => {
    // setDataUpdate({ isFavorite: !isFavorite });
    await patchWorkspace({ isFavorite: !isFavorite }, workspaceId);
    fetchData();
    onRefresh();
  };

  const fetchData = async () => {
    const res = await fetchWorkspace();
    setWorkspace(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
                onRefresh={onRefresh}
                fetchData={fetchData}
                handleClickSubmitIsPublic={handleClickSubmitIsPublic}
                handleClickSubmitIsFavorite={handleClickSubmitIsFavorite}
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
                onRefresh={onRefresh}
                fetchData={fetchData}
                handleClickSubmitIsPublic={handleClickSubmitIsPublic}
                handleClickSubmitIsFavorite={handleClickSubmitIsFavorite}
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="content">
        <ContentDashboard
          data={workspace}
          filter={"favorited"}
          isFavorite={true}
          handleSubmit={handleClickSubmitIsFavorite}
        />
        <ContentDashboard
          data={workspace}
          filter={"another"}
          isFavorite={false}
          handleSubmit={handleClickSubmitIsFavorite}
        />
        <ContentDashboard
          data={workspace}
          filter={"mine"}
          isFavorite={false}
          handleSubmit={handleClickSubmitIsFavorite}
        />
        <ContentDashboard
          data={workspace}
          filter={"private"}
          isFavorite={false}
          handleSubmit={handleClickSubmitIsPublic}
        />
      </div>
    </div>
  );
};

export default Dashboard;
