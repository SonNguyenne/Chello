import React, { useState } from "react";
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
  FaUsers,
} from "react-icons/fa";

const workspace = {
  myWorkspace: [
    {
      id: 1,
      name: "Không gian 1",
      img: "https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952__480.jpg",
    },
    {
      id: 2,
      name: "Lịch học",
      img: "https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952__480.jpg",
    },
    {
      id: 3,
      name: "Project",
      img: "https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952__480.jpg",
    },
  ],
  favWorkspace: [
    {
      name: "Không gian 2",
      img: "https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952__480.jpg",
    },
    {
      name: "Đồ án",
      img: "https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952__480.jpg",
    },
    {
      name: "Assignment",
      img: "https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952__480.jpg",
    },
  ],
};
const Dashboard = () => {
  const [showSlideMenu, setShowSlideMenu] = useState(false);
  const [showWorkspaceInfo, setShowWorkspaceInfo] = useState(0);

  return (
    <div className="dashboard-container">
      <div
        className="slide-menu"
        style={{ left: showSlideMenu ? "0%" : "-32.1%" }}
      >
        <div
          className="btn-open-slide-menu"
          onClick={() => setShowSlideMenu(!showSlideMenu)}
        >
          <FaChevronRight />
        </div>
        <ul>
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
              <div className="slide-menu-workspace-title">
                <span>Các không gian làm việc</span>
                <span>
                  <FaPlus />
                </span>
              </div>
              <div className="slide-menu-workspace-list">
                <ul>
                  {workspace.myWorkspace.map((ws, index) => (
                    <li key={index}>
                      <div
                        className="list-workspace-title"
                        onClick={() =>
                          setShowWorkspaceInfo(
                            ws.id === showWorkspaceInfo ? 0 : ws.id
                          )
                        }
                      >
                        <div>
                          <img src={ws.img} alt="ws" />
                          <span>{ws.name}</span>
                        </div>
                        <FaChevronDown />
                      </div>
                      {ws.id === showWorkspaceInfo && (
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
            {workspace.myWorkspace.map((ws, index) => (
              <div key={index}>
                <img src={ws.img} alt="" />
                <span className="content-body-star-name">{ws.name}</span>
                <span
                  className="content-body-star-icon"
                  onClick={() => alert("Đã hủy")}
                  title="Nhấn để xóa khỏi danh sách ưa thích"
                ></span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="content-title">
            <FaRegClock />
            <h3>Đã xem gần đây</h3>
          </div>
          <div className="content-body">
            {workspace.myWorkspace.map((ws, index) => (
              <div key={index}>
                <img src={ws.img} alt="" />
                <span className="content-body-star-name">{ws.name}</span>
                <span
                  className="content-body-star-icon"
                  onClick={() => alert("Đã hủy")}
                  title="Nhấn để xóa khỏi danh sách ưa thích"
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
            {workspace.myWorkspace.map((ws, index) => (
              <div key={index}>
                <img src={ws.img} alt="" />
                <span className="content-body-star-name">{ws.name}</span>
                <span
                  className="content-body-star-icon"
                  onClick={() => alert("Đã hủy")}
                  title="Nhấn để xóa khỏi danh sách ưa thích"
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
            {workspace.myWorkspace.map((ws, index) => (
              <div key={index}>
                <img src={ws.img} alt="" />
                <span className="content-body-star-name">{ws.name}</span>
                <span
                  className="content-body-star-icon"
                  onClick={() => alert("Đã hủy")}
                  title="Nhấn để xóa khỏi danh sách ưa thích"
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
