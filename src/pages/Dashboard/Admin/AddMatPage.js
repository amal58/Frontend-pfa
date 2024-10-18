import TopBar from "../../../components/topBar";
import AddMat from "../../../components/Admin/matiere/AddMat";
import SideBar from "../../../components/sideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

const AddMatPage = () => {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />
          <div className="layout-page">
            <TopBar />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-1 mb-2" style={{ marginLeft: "1%" }}>
                  <span className="text-muted">list/ Matiére/</span>
                  Ajout
                </h4>
                <hr className="my-2" />
                <a href="/Matiere" style={{ fontSize: "120%" }}>
                  <FontAwesomeIcon icon={faReply} /> retour
                </a>
                <AddMat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMatPage;
