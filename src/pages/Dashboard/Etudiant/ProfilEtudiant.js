import SideBarEtudiant from "../../../components/Etudiant/sideBarEtudiant";
import TopBarEtud from "../../../components/Etudiant/topBarEtud";
import Profil from "../../../components/Etudiant/profile/Profile";
const ProfilEtudiant = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
    <SideBarEtudiant />
    <div className="layout-page">
    <TopBarEtud />
    <div className="content-wrapper">
  <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Profile</h4>
            
              <div className="col-xxl">
                  <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Update Profile</h5>
                      
                    </div>
                    <div className="card-body">
                       <Profil/>
                    </div>
                  </div>
                </div>
      </div>
      </div>
        
    </div>
    </div>
    </div>
        
      )
  
};

export default ProfilEtudiant;
