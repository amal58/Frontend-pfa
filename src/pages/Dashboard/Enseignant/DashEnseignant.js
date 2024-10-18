import React from "react";
import MatiereEnseignant from "../../../components/Enseignant/matiereEnseignant";
import SideBarEnseignant from "../../../components/Enseignant/sideBarEnseignant";
import TopBarEnseignant from "../../../components/Enseignant/topBarEnseignant";

const DashEnseignant = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBarEnseignant />
        <div className="layout-page">
          <TopBarEnseignant />
          <br />
          <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "3%" }}>
            <span className="text-muted">list/</span>
            Matiere
          </h4>
          <hr className="my-1" />
          <div className="container mt-4">
            <div
              className="card"
              style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "2rem",
              }}
            >
              <MatiereEnseignant />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashEnseignant;
