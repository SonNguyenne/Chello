import React, { useState } from "react";
import {
  FaArchive,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaGlobe,
  FaStar,
  FaTable,
} from "react-icons/fa";
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
  const [toggleUpdateModal, setToggleUpdateModal] = useState(false);

  // Modal update
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [mode, setMode] = useState("true");
  const [favorite, setFavorite] = useState("");
  const handleToggleModal = () => {
    setToggleUpdateModal(!toggleUpdateModal);
  };
  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };
  const handleSetMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setMode(e.target.value);
  };
  const handleSetFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFavorite(e.target.value);
  };
  const handleSubmitUpdate = () => {
    if (name === "" || image === "" || mode === "" || favorite === "")
      return alert("Please fill all the fields");

    alert(
      `Name: ${name}\nImage: ${image}\nMode: ${mode}\nFavorite: ${favorite}`
    );
  };

  return (
    <div className="slide-menu-workspace-list">
      {toggleUpdateModal && (
        <Modal
          name={"Chỉnh sửa"} // Tên workspace
          type="update"
          handleToggleModal={handleToggleModal}
          handleSubmit={handleSubmitUpdate}
        >
          <div className="modal-body">
            <label htmlFor="name">Tên</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleSetName}
            />
            <label htmlFor="image">Hình ảnh</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={handleSetImage}
            />
            <label htmlFor="mode">Chế độ hiển thị</label>
            <select id="mode" value={mode} onChange={handleSetMode}>
              <option value="true">Công khai</option>
              <option value="false">Riêng tư</option>
            </select>
            <label>
              <input
                type="radio"
                value="true"
                checked={favorite === "true"}
                onChange={handleSetFavorite}
              />{" "}
              Yêu thích
            </label>
            <label>
              <input
                type="radio"
                value="false"
                checked={favorite === "false"}
                onChange={handleSetFavorite}
              />{" "}
              Hủy yêu thích
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
                            <span>Ưa thích</span>
                          </div>
                          <span className="workspace-downdown-items-icons">
                            <FaChevronRight />
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="workspace-dropdown-items">
                          <div onClick={handleToggleModal}>
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
                      <li>
                        <div className="workspace-dropdown-items">
                          {isPublic === true ? (
                            <div>
                              <span>
                                <FaArchive />
                              </span>
                              <span>Riêng tư</span>
                            </div>
                          ) : (
                            <div>
                              <span>
                                <FaGlobe />
                              </span>
                              <span>Công khai</span>
                            </div>
                          )}
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
