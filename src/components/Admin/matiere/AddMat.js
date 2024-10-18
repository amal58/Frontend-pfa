import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

const AddMat = () => {
  const [nom, setNom] = useState("");
  const [code, setCode] = useState("");
  const [coeff, setCoeff] = useState("");
  const [nbHTotal, setNbHTotal] = useState("");
  const [NbrHElim, setNbrHElim] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/matiere/", {
        nom,
        code,
        coeff: parseFloat(coeff),
        nbHTotal: parseFloat(nbHTotal),
        NbrHElim: parseFloat(NbrHElim),
      });

      Swal.fire("Success", "Matière créée avec succès!", "success").then(() => {
        navigate("/Matiere");
      });

      // Réinitialiser les champs après soumission réussie
      setNom("");
      setCode("");
      setCoeff("");
      setNbHTotal("");
      setNbrHElim("");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Erreur lors de la création de la matière",
        "error"
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow rounded">
          <div className="card-header bg-primary text-white text-center">
            <h5 className="mb-0" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faPencil} className="me-2" />
              Ajouter une Matière
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <br></br>
                <label className="form-label" htmlFor="nom">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="code">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="coeff">
                  Coefficient
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="coeff"
                  value={coeff}
                  onChange={(e) => setCoeff(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="nbHTotal">
                  Nombre d'heures total
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="nbHTotal"
                  value={nbHTotal}
                  onChange={(e) => setNbHTotal(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="NbrHElim">
                  Nombre d'heures éliminatoire
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="NbrHElim"
                  value={NbrHElim}
                  onChange={(e) => setNbrHElim(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary d-block mx-auto">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMat;
