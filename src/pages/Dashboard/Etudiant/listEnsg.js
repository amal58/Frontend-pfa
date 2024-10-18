import React from "react";
import SideBarEtudiant from "../../../components/Etudiant/sideBarEtudiant";
import TopBarEtud from "../../../components/Etudiant/topBarEtud";
import ListEnsdByEtud from "../../../components/Etudiant/ListEnsByEtud";

const ListEnsg = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBarEtudiant />
        <div className="layout-page">
          <TopBarEtud />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">List/</span>Enseignants
              </h4>
              <hr className="my-5" />
              <div className="card">
                <h5 className="card-header">Liste des enseignants </h5>
                <div className="card-body">
                  <div className="table-responsive text-nowrap">
                    <ListEnsdByEtud />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEnsg;
