import EtudiantNomEnseignant from "../../../components/Enseignant/EtudiantNomEnseignant";
import SideBarEnseignant from "../../../components/Enseignant/sideBarEnseignant";
import TopBarEnseignant from "../../../components/Enseignant/topBarEnseignant";

const EtudiantNenseignant = () => {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBarEnseignant />
          <div className="layout-page">
            <TopBarEnseignant />
            <br></br>
            <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "3%" }}>
              <span className="text-muted fw-light">Liste/</span>Nominé
            </h4>
            <hr className="my-1" />
            <div style={{ width: "97%", marginLeft: "2%" }}>
              {" "}
              <EtudiantNomEnseignant />
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default EtudiantNenseignant;
