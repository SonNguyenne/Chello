import React, { useEffect, useState } from "react";
import {
  FaArchive,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaGlobe,
  FaStar,
  FaTable,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  deleteWorkspace,
  fetchWorkspace,
  patchWorkspace,
  putWorkspace,
} from "../apis/workspace.api";
import { WorkspaceInterface } from "../types";
import Modal from "./Modal";

type SlideMenuType = {
  data: never[];
  showById: string;
  isPublic: boolean;
  handleClick: (id: string | undefined) => void;
};

const SlideMenu = (props: SlideMenuType) => {
  const { showById, data, handleClick, isPublic } = props;
  const [workspace, setWorkspace] = useState(data);
  const [dataUpdate, setDataUpdate] = useState<WorkspaceInterface>({});
  const [dataDelete, setDataDelete] = useState("");
  const [toggleUpdateModal, setToggleUpdateModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

  // Modal update
  const handleOpenUpdateModal = (ws: WorkspaceInterface) => {
    handleToggleUpdateModal();
    setDataUpdate(ws);
  };
  const handleToggleUpdateModal = () => {
    setToggleUpdateModal(!toggleUpdateModal);
  };
  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUpdate((prev) => {
      return { ...prev, workspaceName: e.target.value };
    });
  };
  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUpdate((prev) => {
      return { ...prev, workspaceImage: e.target.value };
    });
  };
  const handleSetMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUpdate((prev) => {
      return { ...prev, isPublic: e.target.value === "true" ? true : false };
    });
  };
  const handleSetFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUpdate((prev) => {
      return { ...prev, isFavorite: e.target.value === "true" ? true : false };
    });
  };
  const handleSubmitUpdate = async () => {
    if (dataUpdate.workspaceName === "" || dataUpdate.workspaceImage === "")
      return alert("Please fill all the fields");
    await putWorkspace(dataUpdate, dataUpdate.workspaceId);
    fetchData();
    handleToggleUpdateModal();
  };

  // Modal delete
  const handleToggleDeleteModal = () => {
    setToggleDeleteModal(!toggleDeleteModal);
  };
  const handleOpenDeleteModal = (workspaceId?: string) => {
    handleToggleDeleteModal();
    handleDataDelete(workspaceId);
  };
  const handleDataDelete = (workspaceId?: string) => {
    setDataDelete(workspaceId!);
  };
  const handleSubmitDelete = async () => {
    await deleteWorkspace(dataDelete);
    fetchData();
    handleToggleDeleteModal();
  };

  // Handle isPublic: private / public
  const handleSubmitIsPublic = async (
    workspaceId?: string,
    isPublic?: boolean
  ) => {
    setDataUpdate({ isPublic: isPublic === true ? false : true });
    await patchWorkspace(dataUpdate, workspaceId);
    fetchData();
  };

  // Handle isFavorite
  const handleSubmitIsFavorite = async (
    workspaceId?: string,
    isFavorite?: boolean
  ) => {
    setDataUpdate({ isFavorite: isFavorite === true ? false : true });
    await patchWorkspace(dataUpdate, workspaceId);
    fetchData();
  };

  // Fetch data
  const fetchData = async () => {
    const res = await fetchWorkspace();
    setWorkspace(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="slide-menu-workspace-list">
      {toggleUpdateModal && (
        <Modal
          type="update"
          handleToggleModal={handleToggleUpdateModal}
          handleSubmit={handleSubmitUpdate}
        >
          <div className="modal-body">
            <label className="modal-title" htmlFor="name">
              Tên
            </label>
            <input
              type="text"
              id="name"
              value={dataUpdate.workspaceName}
              onChange={handleSetName}
            />
            <label className="modal-title" htmlFor="image">
              Hình ảnh
            </label>
            <input
              type="text"
              id="image"
              value={dataUpdate.workspaceImage}
              onChange={handleSetImage}
            />
            <label className="modal-title">Chế độ hiển thị</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={dataUpdate.isPublic === true}
                  onChange={handleSetMode}
                />{" "}
                Công khai
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={dataUpdate.isPublic === false}
                  onChange={handleSetMode}
                />{" "}
                Riêng tư
              </label>
            </div>
            <label className="modal-title">Danh sách nổi bật</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={dataUpdate.isFavorite === true}
                  onChange={handleSetFavorite}
                />{" "}
                Yêu thích
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={dataUpdate.isFavorite === false}
                  onChange={handleSetFavorite}
                />{" "}
                Hủy yêu thích
              </label>
            </div>
          </div>
        </Modal>
      )}
      {toggleDeleteModal && (
        <Modal
          type="delete"
          handleToggleModal={handleToggleDeleteModal}
          handleSubmit={handleSubmitDelete}
        >
          <div className="modal-body">
            <label className="modal-title">
              Bạn có chắc chắn là muốn xóa không gian này?
            </label>
          </div>
        </Modal>
      )}
      <ul>
        {data?.map((ws: WorkspaceInterface) => {
          return (
            ws.isPublic === isPublic && (
              <li key={ws.workspaceId}>
                <div
                  className="list-workspace-title"
                  onClick={() => {
                    handleClick(ws.workspaceId);
                  }}
                >
                  <div>
                    <img src={ws.workspaceImage} alt="ws" />
                    <span>{ws.workspaceName}</span>
                  </div>
                  <FaChevronDown />
                </div>
                {ws.workspaceId === showById && (
                  <div className="workspace-dropdown">
                    <ul>
                      <Link to="/workspace">
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
                      </Link>
                      <li
                        onClick={(e) =>
                          handleSubmitIsFavorite(ws.workspaceId, ws.isFavorite)
                        }
                      >
                        <div className="workspace-dropdown-items">
                          <div>
                            <span>
                              {ws.isFavorite === true ? (
                                <FaStar />
                              ) : (
                                <FaTimes />
                              )}
                            </span>
                            <span>
                              {ws.isFavorite === true
                                ? "Ưa thích"
                                : "Hủy ưa thích"}
                            </span>
                          </div>
                          <span className="workspace-downdown-items-icons">
                            <FaChevronRight />
                          </span>
                        </div>
                      </li>
                      <li onClick={(e) => handleOpenUpdateModal(ws)}>
                        <div className="workspace-dropdown-items">
                          <div>
                            <span>
                              <FaCog />
                            </span>
                            <span>Chỉnh sửa</span>
                          </div>
                          <span className="workspace-downdown-items-icons">
                            <FaChevronRight />
                          </span>
                        </div>
                      </li>
                      <li
                        onClick={(e) =>
                          handleSubmitIsPublic(ws.workspaceId, ws.isPublic)
                        }
                      >
                        <div className="workspace-dropdown-items">
                          <div>
                            <span>
                              {isPublic === true ? <FaArchive /> : <FaGlobe />}
                            </span>
                            <span>
                              Chuyển vào{" "}
                              {isPublic === true ? "riêng tư" : "công khai"}
                            </span>
                          </div>
                          <span className="workspace-downdown-items-icons">
                            <FaChevronRight />
                          </span>
                        </div>
                      </li>{" "}
                      <li
                        onClick={(e) => handleOpenDeleteModal(ws.workspaceId)}
                      >
                        <div className="workspace-dropdown-items">
                          <div>
                            <span>
                              <FaTrash />
                            </span>
                            <span>Xóa</span>
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
            )
          );
        })}
      </ul>
    </div>
  );
};

export default SlideMenu;
