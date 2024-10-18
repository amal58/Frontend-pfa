import React from "react";
import SideBar from "../../../components/sideBar";
import TopBar from "../../../components/topBar";
import ClasseList from "../../../components/Admin/Classe/Classe";
const ClasseListPageAdmin = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />
        <div className="layout-page">
          <TopBar />
          <br />
          <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "1%" }}>
            <span className="text-muted">list/</span>
            Classe
          </h4>
          <hr className="my-2" />
          <div className="container mt-4">
            <div
              className="card"
              style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "0.5rem",
              }}
            >
              <ClasseList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClasseListPageAdmin;
