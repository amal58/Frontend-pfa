import EtudiantsListEnseig from "../../../components/Enseignant/EtudiantListeEnseignant";
import SideBarEnseignant from "../../../components/Enseignant/sideBarEnseignant";
import TopBarEnseignant from "../../../components/Enseignant/topBarEnseignant";

const EtudiantLenseignant = () => {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBarEnseignant />
          <div className="layout-page">
            <TopBarEnseignant />
            <br />
            <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "3%" }}>
              <span className="text-muted fw-light">Liste/</span>Etudiant
            </h4>
            <hr className="my-1" />
            <div
              className="card"
              style={{
                margin: "2%",
                padding: "2%",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <EtudiantsListEnseig />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EtudiantLenseignant;
