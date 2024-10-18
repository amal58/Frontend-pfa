import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBuildingUser,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const DepartementAjout = () => {
  const [classes, setClasses] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedEnseignants, setSelectedEnseignants] = useState([]);
  const [nom, setNom] = useState("");
  const [universite, setUniversite] = useState("");
  const [chef, setChef] = useState("");
  const [chefDepartement, setChefDepartement] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
    fetchEnseignants();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/classe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClasses(response.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchEnseignants = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/user/enseignantsList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEnseignants(response.data.model);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  //*********** */

  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const token = localStorage.getItem("token");

  //     const response = await axios.post(
  //       "http://localhost:5000/depart",
  //       {
  //         nom: nom,
  //         universite: universite,
  //         classe: selectedClasses,
  //         chef: chef,
  //         enseignants: selectedEnseignants,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Département ajouté avec succès:", response.data);

  //     Swal.fire({
  //       icon: "success",
  //       title: "Succès!",
  //       text: "Département ajouté avec succès",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });

  //     navigate("/dashAdmin/Depart");
  //   } catch (error) {
  //     console.error("Erreur lors de l'ajout du département:", error);
  //     console.error("Détails de l'erreur:", error.response.data);
  //     console.log(
  //       nom,
  //       universite,
  //       "classe",
  //       selectedClasses,
  //       "chef",
  //       chef,
  //       "ensg",
  //       selectedEnseignants
  //     );
  //   }
  // };

  // const handleCheckboxChange = (id, type) => {
  //   switch (type) {
  //     case "classe":
  //       setSelectedClasses((prevSelectedClasses) =>
  //         prevSelectedClasses.includes(id)
  //           ? prevSelectedClasses.filter((item) => item !== id)
  //           : [...prevSelectedClasses, id]
  //       );
  //       break;
  //     case "enseignant":
  //       setSelectedEnseignants((prevSelectedEnseignants) =>
  //         prevSelectedEnseignants.includes(id)
  //           ? prevSelectedEnseignants.filter((item) => item !== id)
  //           : [...prevSelectedEnseignants, id]
  //       );
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const backClick = () => {
    navigate(`/dashAdmin/Depart`);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/depart",
        {
          nom: nom,
          universite: universite,
          classe: selectedClasses,
          chef: chef,
          enseignants: selectedEnseignants,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Département ajouté avec succès:", response.data);

      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Département ajouté avec succès",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashAdmin/Depart");
    } catch (error) {
      console.error("Erreur lors de l'ajout du département:", error);
      console.error("Détails de l'erreur:", error.response.data);

      // Récupération du message spécifique d'erreur
      const errorMessage = error.response.data.error;
      // Vérification si le message d'erreur contient "Cette classe est déjà associée à un autre département"
      if (
        errorMessage.includes(
          "Cette classe est déjà associée à un autre département"
        )
      ) {
        // Récupération du nom de la classe concernée
        const className = errorMessage.split(":")[1].trim();
        // Affichage de l'erreur avec SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Erreur!",
          text: `La classe ${className} est déjà associée à un autre département`,
        });
      } else {
        console.log(
          "Une erreur est survenue lors de l'ajout du département:",
          errorMessage
        );
      }

      console.log(
        nom,
        universite,
        "classe",
        selectedClasses,
        "chef",
        chef,
        "ensg",
        selectedEnseignants
      );
    }
  };

  const handleCheckboxChange = (id, type) => {
    switch (type) {
      case "classe":
        setSelectedClasses((prevSelectedClasses) =>
          prevSelectedClasses.includes(id)
            ? prevSelectedClasses.filter((item) => item !== id)
            : [...prevSelectedClasses, id]
        );
        break;
      case "enseignant":
        setSelectedEnseignants((prevSelectedEnseignants) =>
          prevSelectedEnseignants.includes(id)
            ? prevSelectedEnseignants.filter((item) => item !== id)
            : [...prevSelectedEnseignants, id]
        );
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ marginTop: "-5%" }}>
      <div
        className="container my-5"
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2
              className="text-center mb-4 mt-4"
              style={{ color: "#007bff", fontWeight: "bold" }}
            >
              <FontAwesomeIcon icon={faBuildingUser} /> Ajouter Département
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label
                      htmlFor="nomClasse"
                      className="form-label"
                      style={{ fontWeight: "bold", color: "#555" }}
                    >
                      Nom :
                    </label>
                    <input
                      type="text"
                      id="nomClasse"
                      className="form-control"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                      style={{
                        borderRadius: "0.5rem",
                        borderColor: "#007bff",
                        padding: "0.75rem",
                      }}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label
                      htmlFor="universite"
                      className="form-label"
                      style={{ fontWeight: "bold", color: "#555" }}
                    >
                      Université :
                    </label>
                    <input
                      type="text"
                      id="universite"
                      className="form-control"
                      value={universite}
                      onChange={(e) => setUniversite(e.target.value)}
                      required
                      style={{
                        borderRadius: "0.5rem",
                        borderColor: "#007bff",
                        padding: "0.75rem",
                      }}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label
                      htmlFor="chef"
                      className="form-label"
                      style={{ fontWeight: "bold", color: "#555" }}
                    >
                      Chef département :
                    </label>
                    <select
                      id="chef"
                      className="form-control"
                      value={chef}
                      onChange={(e) => setChef(e.target.value)}
                      required
                      style={{
                        borderRadius: "0.5rem",
                        borderColor: "#007bff",
                        padding: "0.75rem",
                      }}
                    >
                      <option value="">
                        Sélectionner un chef de département
                      </option>
                      {enseignants.map((enseignant) => (
                        <option key={enseignant._id} value={enseignant._id}>
                          {enseignant.nom} {enseignant.prenom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label
                      htmlFor="classes"
                      className="form-label"
                      style={{ fontWeight: "bold", color: "#555" }}
                    >
                      Classes :
                    </label>
                    <ul
                      className="list-group"
                      style={{
                        maxHeight: "200px",
                        overflowY: "scroll",
                        borderRadius: "0.5rem",
                        borderColor: "#007bff",
                        padding: "0.75rem",
                      }}
                    >
                      {classes &&
                        classes.map((classe) => (
                          <li
                            key={classe._id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ border: "none", padding: "0.5rem" }}
                          >
                            {classe.nom}
                            <input
                              type="checkbox"
                              id={`classe-${classe._id}`}
                              onChange={() =>
                                handleCheckboxChange(classe._id, "classe")
                              }
                              checked={selectedClasses.includes(classe._id)}
                              required
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="form-group mb-4">
                    <label
                      htmlFor="enseignants"
                      className="form-label"
                      style={{ fontWeight: "bold", color: "#555" }}
                    >
                      Enseignants :
                    </label>
                    <ul
                      className="list-group"
                      style={{
                        maxHeight: "200px",
                        overflowY: "scroll",
                        borderRadius: "0.5rem",
                        borderColor: "#007bff",
                        padding: "0.75rem",
                      }}
                    >
                      {enseignants &&
                        enseignants.map((enseignant) => (
                          <li
                            key={enseignant._id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ border: "none", padding: "0.5rem" }}
                          >
                            {enseignant.nom} {enseignant.prenom}
                            <input
                              type="checkbox"
                              id={`enseignant-${enseignant._id}`}
                              onChange={() =>
                                handleCheckboxChange(
                                  enseignant._id,
                                  "enseignant"
                                )
                              }
                              checked={selectedEnseignants.includes(
                                enseignant._id
                              )}
                              required
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ borderRadius: "0.5rem" }}
                >
                  <FontAwesomeIcon icon={faSave} /> Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartementAjout;
