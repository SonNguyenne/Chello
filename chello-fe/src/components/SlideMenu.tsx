import React, { useState } from "react";
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
// import ReactCSSTransitionGroup from "react-transition-group";

import { deleteWorkspace, putWorkspace } from "../apis/workspace.api";
import { WorkspaceInterface } from "../types";
import Modal from "./Modal";

type SlideMenuType = {
  data: never[];
  showById: string;
  isPublic: boolean;
  handleClick: (id: string | undefined) => void;
  onRefresh: () => void;
  fetchData: () => void;
  handleClickSubmitIsPublic: (
    workspaceId: string | undefined,
    isPublic: boolean | undefined
  ) => void;
  handleClickSubmitIsFavorite: (
    workspaceId: string | undefined,
    isPublic: boolean | undefined
  ) => void;
};

const SlideMenu = (props: SlideMenuType) => {
  const {
    showById,
    data,
    handleClick,
    isPublic,
    onRefresh,
    fetchData,
    handleClickSubmitIsPublic,
    handleClickSubmitIsFavorite,
  } = props;
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
  const handleClickPublicWorkspace = async (
    workspaceId?: string,
    isPublic?: boolean
  ) => {
    await handleClickSubmitIsPublic(workspaceId, isPublic);
    fetchData();
    onRefresh();
  };

  // Handle isFavorite
  const handleClickFavoriteWorkspace = async (
    workspaceId?: string,
    isFavorite?: boolean
  ) => {
    await handleClickSubmitIsFavorite(workspaceId, isFavorite);
    fetchData();
    onRefresh();
  };

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
              T??n
            </label>
            <input
              type="text"
              id="name"
              value={dataUpdate.workspaceName}
              onChange={handleSetName}
            />
            <label className="modal-title" htmlFor="image">
              H??nh ???nh
            </label>
            <input
              type="text"
              id="image"
              value={dataUpdate.workspaceImage}
              onChange={handleSetImage}
            />
            <label className="modal-title">Ch??? ????? hi???n th???</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={dataUpdate.isPublic === true}
                  onChange={handleSetMode}
                />{" "}
                C??ng khai
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={dataUpdate.isPublic === false}
                  onChange={handleSetMode}
                />{" "}
                Ri??ng t??
              </label>
            </div>
            <label className="modal-title">Danh s??ch n???i b???t</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={dataUpdate.isFavorite === true}
                  onChange={handleSetFavorite}
                />{" "}
                Y??u th??ch
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={dataUpdate.isFavorite === false}
                  onChange={handleSetFavorite}
                />{" "}
                H???y y??u th??ch
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
              B???n c?? ch???c ch???n l?? mu???n x??a kh??ng gian n??y?
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
                      <Link to={`/workspace/${ws.workspaceId}`}>
                        <li>
                          <div className="workspace-dropdown-items">
                            <div>
                              <span>
                                <FaTable />
                              </span>
                              <span>B???ng</span>
                            </div>
                            <span className="workspace-downdown-items-icons">
                              <FaChevronRight />
                            </span>
                          </div>
                        </li>
                      </Link>
                      <li
                        onClick={(e) =>
                          handleClickFavoriteWorkspace(
                            ws.workspaceId,
                            ws.isFavorite
                          )
                        }
                      >
                        <div className="workspace-dropdown-items">
                          <div>
                            <span>
                              {ws.isFavorite === true ? (
                                <FaTimes />
                              ) : (
                                <FaStar />
                              )}
                            </span>
                            <span>
                              {ws.isFavorite === true
                                ? "H???y ??a th??ch"
                                : "??a th??ch"}
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
                            <span>Ch???nh s???a</span>
                          </div>
                          <span className="workspace-downdown-items-icons">
                            <FaChevronRight />
                          </span>
                        </div>
                      </li>
                      <li
                        onClick={(e) =>
                          handleClickPublicWorkspace(
                            ws.workspaceId,
                            ws.isPublic
                          )
                        }
                      >
                        <div className="workspace-dropdown-items">
                          <div>
                            <span>
                              {isPublic === true ? <FaArchive /> : <FaGlobe />}
                            </span>
                            <span>
                              Chuy???n v??o{" "}
                              {isPublic === true ? "ri??ng t??" : "c??ng khai"}
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
                            <span>X??a</span>
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
