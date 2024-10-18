import TopBar from "../../../components/topBar";
import EnseignantsList from "../../../components/Admin/Enseig/EnseignantsList";
import SideBar from "../../../components/sideBar";

const EnseignantsPageAdmin = () => {
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
                  <span className="text-muted">list/</span>
                  Enseignants
                </h4>
                <hr className="my-2" />
                <div className="card">
                  <br></br>
                  <h3
                    className="demo menu-text fw-bolder ms-2"
                    style={{ textAlign: "center" }}
                  >
                    Liste Des Enseignants
                  </h3>
                  <div className="card-body">
                    <div className="table-responsive text-nowrap">
                      <EnseignantsList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnseignantsPageAdmin;
