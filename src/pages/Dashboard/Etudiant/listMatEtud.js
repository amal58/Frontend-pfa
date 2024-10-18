import React from "react";
import SideBarEtudiant from "../../../components/Etudiant/sideBarEtudiant";
import TopBarEtud from "../../../components/Etudiant/topBarEtud";
import ListMat from "../../../components/Etudiant/matiere/ListeMateElim";
const ListMatEtud = () => {
    return (
  <div className="layout-wrapper layout-content-navbar">
  <div className="layout-container">
  <SideBarEtudiant />
  <div className="layout-page">
  <TopBarEtud />
  <div className="content-wrapper">
<div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Liste/</span>Matiere</h4>
              <hr className="my-5" />
<div className="card">
  <h5 className="card-header">Liste Matiere</h5>
  <div className="card-body">
    <div className="table-responsive text-nowrap">
     <ListMat/>
    </div>
  </div>
</div>
    </div>
    </div> 
  </div>
  </div>
  </div>
      
    )
}


export default ListMatEtud;