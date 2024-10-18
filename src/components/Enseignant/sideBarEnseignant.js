import React from "react";

const sideBarEnseignant = () => {
  return (
    <div className="layout-menu menu-vertical menu bg-menu-theme">
       <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <a href="" className="app-brand-link">
              <span className="app-brand-logo demo">
               
              </span>
              <span className="app-brand-text demo menu-text fw-bolder ms-2">ISAMM</span>
            </a>

          </div>

          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1">
        
            <li className="menu-item active">
              <a href="/dashEtudiant" className="menu-link">
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div >Matieres Liste</div>
              </a>
            </li>
            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Pages</span>
            </li>
            <li className="menu-item">
              <a href="/dashEnseignant/etudiant" className="menu-link ">
                <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
                <div >Liste Etudiants</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="/dashEnseignant/elimineList" className="menu-link ">
                <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
                <div >Elimination List</div>
              </a>
             
            </li>
            <li className="menu-item">
              <a href="/dashEnseignant/etudiant" className="menu-link ">
                <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
                <div >Nomination List</div>
              </a>
             
            </li>
           
      
           
            <li className="menu-item">
              <a href="/dashEnseignant/profil" className="menu-link ">
                <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
                <div >Profile Settings</div>
              </a>
             
            </li>
  
          </ul>
        </aside>
    </div>
  );
};
export default sideBarEnseignant;
