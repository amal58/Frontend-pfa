import SideBarEnseignant from "../../../components/Enseignant/sideBarEnseignant";
import TopBarEnseignant from "../../../components/Enseignant/topBarEnseignant";
import Profil from "../../../components/Enseignant/Profil/Profil";

const ProfilEnseignant = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBarEnseignant />
        <div className="layout-page">
          <TopBarEnseignant />
          <br />
          <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "3%" }}>
            <span className="text-muted"></span>
            <i className="bx bx-user"></i> Profil
          </h4>
          <hr className="my-1" />
          <div style={{ width: "90%", marginLeft: "5%" }}>
            <div className="card" style={{ backgroundColor: "white" }}>
              <div className="card-body">
                <Profil />
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilEnseignant;
