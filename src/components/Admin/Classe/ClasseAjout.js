// import TopBar from "../../../components/topBar";
// import SideBar from "../../../components/sideBar";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ClasseAjout = () => {
//   const [etudiants, setEtudiants] = useState([]);
//   const [enseignants, setEnseignants] = useState([]);
//   const [matieres, setMatieres] = useState([]);
//   const [selectedEtudiants, setSelectedEtudiants] = useState([]);
//   const [selectedEnseignants, setSelectedEnseignants] = useState([]);
//   const [selectedMatieres, setSelectedMatieres] = useState([]);
//   const [nomClasse, setNomClasse] = useState("");
//   const [niveau, setNiveau] = useState("");
//   const [datesMatieres, setDatesMatieres] = useState({});

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEtudiants();
//     fetchEnseignants();
//     fetchMatieres();
//   }, []);

//   const fetchEtudiants = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:5000/user/etudiantsList",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setEtudiants(response.data.model);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   const fetchEnseignants = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:5000/user/enseignantsList",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setEnseignants(response.data.model);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const fetchMatieres = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/matiere", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMatieres(response.data.model);
//     } catch (error) {
//       console.error("Error fetching subjects:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       const token = localStorage.getItem("token");
//       const matieresSelectionnees = selectedMatieres.map((matiereId) => {
//         const matiere = matieres.find((m) => m._id === matiereId);
//         console.log(
//           "Date de début pour",
//           matiere._id,
//           ":",
//           datesMatieres[matiere._id].dateDebut
//         );
//         console.log(
//           "Date de fin pour",
//           matiere.nom,
//           ":",
//           datesMatieres[matiere._id].dateFin
//         );

//         return {
//           nomMatiere: matiere._id,
//           dateDebut: datesMatieres[matiere._id].dateDebut,
//           dateFin: datesMatieres[matiere._id].dateFin,
//         };
//       });

//       const response = await axios.post(
//         "http://localhost:5000/classe",
//         {
//           nom: nomClasse,
//           niveau: niveau,
//           etudiants: selectedEtudiants,
//           enseignants: selectedEnseignants,
//           matieres: matieresSelectionnees,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Classe ajoutée avec succès:", response.data);

//       navigate("/dashAdmin/ClasseList");
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de la classe:", error);
//       console.error("Détails de l'erreur:", error.response.data);
//       console.log(
//         nomClasse,
//         niveau,
//         "etud",
//         selectedEtudiants,
//         "ensg",
//         selectedEnseignants,
//         "mat",
//         selectedMatieres
//       );
//     }
//   };

//   const handleCheckboxChange = (id, type) => {
//     switch (type) {
//       case "etudiant":
//         setSelectedEtudiants((prevSelectedEtudiants) =>
//           prevSelectedEtudiants.includes(id)
//             ? prevSelectedEtudiants.filter((item) => item !== id)
//             : [...prevSelectedEtudiants, id]
//         );
//         break;
//       case "enseignant":
//         setSelectedEnseignants((prevSelectedEnseignants) =>
//           prevSelectedEnseignants.includes(id)
//             ? prevSelectedEnseignants.filter((item) => item !== id)
//             : [...prevSelectedEnseignants, id]
//         );
//         break;
//       case "matiere":
//         setSelectedMatieres((prevSelectedMatieres) =>
//           prevSelectedMatieres.includes(id)
//             ? prevSelectedMatieres.filter((item) => item !== id)
//             : [...prevSelectedMatieres, id]
//         );
//         break;
//       default:
//         break;
//     }
//   };

//   const handleDateChange = (matiereId, field, value) => {
//     setDatesMatieres({
//       ...datesMatieres,
//       [matiereId]: {
//         ...datesMatieres[matiereId],
//         [field]: value,
//       },
//     });
//   };

//   return (
//     <>
//       <div className="wrapper">
//         <TopBar />
//         <div className="row">
//           <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
//             <SideBar />
//           </div>
//           <div className="col-md-7 col-lg-8 col-xl-9">
//             <div className="row">
//               <div className="col-md-12">
//                 <h4 className="mb-4 mt-4">Ajouter des Classes</h4>
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label htmlFor="nomClasse">Nom de la classe:</label>
//                         <input
//                           type="text"
//                           id="nomClasse"
//                           className="form-control"
//                           value={nomClasse}
//                           onChange={(e) => setNomClasse(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="niveau">Niveau de la classe:</label>
//                         <input
//                           type="text"
//                           id="niveau"
//                           className="form-control"
//                           value={niveau}
//                           onChange={(e) => setNiveau(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="etudiants">Étudiants:</label>
//                         <ul
//                           className="list-group"
//                           style={{ maxHeight: "200px", overflowY: "scroll" }}
//                         >
//                           {etudiants.map((etudiant) => (
//                             <li
//                               key={etudiant._id}
//                               className="list-group-item d-flex justify-content-between align-items-center"
//                             >
//                               {etudiant.nom} {etudiant.prenom}
//                               <input
//                                 type="checkbox"
//                                 id={`etudiant-${etudiant._id}`}
//                                 onChange={() =>
//                                   handleCheckboxChange(etudiant._id, "etudiant")
//                                 }
//                                 checked={selectedEtudiants.includes(
//                                   etudiant._id
//                                 )}
//                               />
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>Enseignants:</label>
//                         <ul
//                           className="list-group"
//                           style={{ maxHeight: "200px", overflowY: "scroll" }}
//                         >
//                           {enseignants.map((enseignant) => (
//                             <li
//                               key={enseignant._id}
//                               className="list-group-item d-flex justify-content-between align-items-center"
//                             >
//                               {enseignant.nom} {enseignant.prenom}
//                               <input
//                                 type="checkbox"
//                                 id={`enseignant-${enseignant._id}`}
//                                 onChange={() =>
//                                   handleCheckboxChange(
//                                     enseignant._id,
//                                     "enseignant"
//                                   )
//                                 }
//                                 checked={selectedEnseignants.includes(
//                                   enseignant._id
//                                 )}
//                               />
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                       <div className="form-group">
//                         <label>Matieres:</label>
//                         <ul
//                           className="list-group"
//                           style={{ maxHeight: "200px", overflowY: "scroll" }}
//                         >
//                           {matieres.map((matiere) => (
//                             <li
//                               key={matiere._id}
//                               className="list-group-item d-flex justify-content-between align-items-center"
//                             >
//                               <div>
//                                 <span>{matiere.nom}</span>
//                                 <input
//                                   type="checkbox"
//                                   id={`matiere-${matiere._id}`}
//                                   onChange={() =>
//                                     handleCheckboxChange(matiere._id, "matiere")
//                                   }
//                                   checked={selectedMatieres.includes(
//                                     matiere._id
//                                   )}
//                                 />
//                               </div>
//                               <div>
//                                 <label htmlFor={`dateDebut-${matiere._id}`}>
//                                   Date début:
//                                 </label>
//                                 <input
//                                   type="date"
//                                   id={`dateDebut-${matiere._id}`}
//                                   className="form-control"
//                                   onChange={(e) =>
//                                     handleDateChange(
//                                       matiere._id,
//                                       "dateDebut",
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 <label htmlFor={`dateFin-${matiere._id}`}>
//                                   Date fin:
//                                 </label>
//                                 <input
//                                   type="date"
//                                   id={`dateFin-${matiere._id}`}
//                                   className="form-control"
//                                   onChange={(e) =>
//                                     handleDateChange(
//                                       matiere._id,
//                                       "dateFin",
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <button type="submit" className="btn btn-primary mr-2">
//                       Enregistrer
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ClasseAjout;

import TopBar from "../../../components/topBar";
import SideBar from "../../../components/sideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarAlt,
  faChalkboardTeacher,
  faGraduationCap,
  faLevelUpAlt,
  faSave,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ClasseAjout = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [selectedEtudiants, setSelectedEtudiants] = useState([]);
  const [selectedEnseignants, setSelectedEnseignants] = useState([]);
  const [selectedMatieres, setSelectedMatieres] = useState([]);
  const [nomClasse, setNomClasse] = useState("");
  const [niveau, setNiveau] = useState("");
  const [datesMatieres, setDatesMatieres] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchEtudiants();
    fetchEnseignants();
    fetchMatieres();
  }, []);

  const fetchEtudiants = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/user/etudiantsList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEtudiants(response.data.model);
    } catch (error) {
      console.error("Error fetching students:", error);
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

  const fetchMatieres = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/matiere", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatieres(response.data.model);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Vérification de la saisie pour chaque champ requis
      if (
        !nomClasse ||
        !niveau ||
        selectedEtudiants.length === 0 ||
        selectedMatieres.length === 0
      ) {
        throw new Error("Veuillez remplir tous les champs requis.");
      }

      // Vérification de la sélection de l'enseignant pour chaque matière et contrôle de saisie de dates
      const matieresSelectionnees = selectedMatieres.map((matiereId) => {
        const matiere = matieres.find((m) => m._id === matiereId);
        const enseignantId = datesMatieres[matiereId].enseignant;
        const dateDebut = new Date(datesMatieres[matiereId].dateDebut);
        const dateFin = new Date(datesMatieres[matiereId].dateFin);

        if (!enseignantId) {
          throw new Error(
            `Enseignant non sélectionné pour la matière ${matiere.nom}`
          );
        }

        if (dateDebut >= dateFin) {
          throw new Error(
            `La date de début doit être antérieure à la date de fin pour la matière ${matiere.nom}`
          );
        }

        return {
          nomMatiere: matiereId,
          dateDebut: datesMatieres[matiereId].dateDebut,
          dateFin: datesMatieres[matiereId].dateFin,
          enseignant: enseignantId,
        };
      });

      // Vérification de la sélection de l'enseignant pour chaque matière
      if (matieresSelectionnees.length !== selectedMatieres.length) {
        throw new Error(
          "Veuillez sélectionner un enseignant pour chaque matière."
        );
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/classe",
        {
          nom: nomClasse,
          niveau: niveau,
          etudiants: selectedEtudiants,
          matieres: matieresSelectionnees,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Affichage de la swal de succès
      Swal.fire("Succès", "La classe a été créée avec succès", "success");

      console.log("Classe ajoutée avec succès:", response.data);
      navigate("/dashAdmin/ClasseList");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la classe:", error.message);
      // Affichage de l'erreur avec une swal
      Swal.fire("Erreur", error.message, "error");
    }
  };

  const handleCheckboxChange = (id, type) => {
    switch (type) {
      case "etudiant":
        setSelectedEtudiants((prevSelectedEtudiants) =>
          prevSelectedEtudiants.includes(id)
            ? prevSelectedEtudiants.filter((item) => item !== id)
            : [...prevSelectedEtudiants, id]
        );
        break;
      case "enseignant":
        setSelectedEnseignants((prevSelectedEnseignants) =>
          prevSelectedEnseignants.includes(id)
            ? prevSelectedEnseignants.filter((item) => item !== id)
            : [...prevSelectedEnseignants, id]
        );
        break;
      case "matiere":
        setSelectedMatieres((prevSelectedMatieres) =>
          prevSelectedMatieres.includes(id)
            ? prevSelectedMatieres.filter((item) => item !== id)
            : [...prevSelectedMatieres, id]
        );
        break;
      default:
        break;
    }
  };

  const handleDateChange = (matiereId, field, value) => {
    setDatesMatieres({
      ...datesMatieres,
      [matiereId]: {
        ...datesMatieres[matiereId],
        [field]: value,
        enseignant: "", // Initialiser l'enseignant à une chaîne vide lors du changement de date
      },
    });
  };

  return (
    <>
      <div className="col-md-12">
        <h4 className="mb-4 mt-4" style={{ textAlign: "center" }}>
          Ajouter des Classes
        </h4>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nomClasse">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    style={{ marginRight: "5px", color: "#3498db" }}
                  />
                  Nom de la classe:
                </label>
                <input
                  type="text"
                  id="nomClasse"
                  className="form-control"
                  value={nomClasse}
                  onChange={(e) => setNomClasse(e.target.value)}
                  required
                  style={{ borderColor: "#3498db" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="niveau">
                  <FontAwesomeIcon
                    icon={faLevelUpAlt}
                    style={{ marginRight: "5px", color: "#3498db" }}
                  />
                  Niveau de la classe:
                </label>
                <input
                  type="text"
                  id="niveau"
                  className="form-control"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  required
                  style={{ borderColor: "#3498db" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="etudiants">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: "5px", color: "#3498db" }}
                  />
                  Étudiants:
                </label>
                <ul
                  className="list-group"
                  style={{
                    maxHeight: "200px",
                    overflowY: "scroll",
                    borderColor: "#3498db",
                  }}
                >
                  {etudiants.map((etudiant) => (
                    <li
                      key={etudiant._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {etudiant.nom} {etudiant.prenom}
                      <input
                        type="checkbox"
                        id={`etudiant-${etudiant._id}`}
                        onChange={() =>
                          handleCheckboxChange(etudiant._id, "etudiant")
                        }
                        checked={selectedEtudiants.includes(etudiant._id)}
                        style={{ marginLeft: "10px" }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  <FontAwesomeIcon
                    icon={faBook}
                    style={{ marginRight: "5px", color: "#3498db" }}
                  />
                  Matières:
                </label>
                <ul
                  className="list-group"
                  style={{
                    maxHeight: "300px",
                    overflowY: "scroll",
                    borderColor: "#3498db",
                  }}
                >
                  {matieres.map((matiere) => (
                    <li
                      key={matiere._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <span>{matiere.nom}</span>
                        <input
                          type="checkbox"
                          id={`matiere-${matiere._id}`}
                          onChange={() =>
                            handleCheckboxChange(matiere._id, "matiere")
                          }
                          checked={selectedMatieres.includes(matiere._id)}
                          style={{ marginLeft: "10px" }}
                        />
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <label htmlFor={`dateDebut-${matiere._id}`}>
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            style={{ marginRight: "5px", color: "#3498db" }}
                          />
                          Date début:
                        </label>
                        <input
                          type="date"
                          id={`dateDebut-${matiere._id}`}
                          className="form-control"
                          onChange={(e) =>
                            handleDateChange(
                              matiere._id,
                              "dateDebut",
                              e.target.value
                            )
                          }
                          style={{
                            borderColor: "#3498db",
                            marginBottom: "10px",
                          }}
                        />
                        <label htmlFor={`dateFin-${matiere._id}`}>
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            style={{ marginRight: "5px", color: "#3498db" }}
                          />
                          Date fin:
                        </label>
                        <input
                          type="date"
                          id={`dateFin-${matiere._id}`}
                          className="form-control"
                          onChange={(e) =>
                            handleDateChange(
                              matiere._id,
                              "dateFin",
                              e.target.value
                            )
                          }
                          style={{
                            borderColor: "#3498db",
                            marginBottom: "10px",
                          }}
                        />
                        <label htmlFor={`enseignant-${matiere._id}`}>
                          <FontAwesomeIcon
                            icon={faChalkboardTeacher}
                            style={{ marginRight: "5px", color: "#3498db" }}
                          />
                          Enseignant:
                        </label>
                        <select
                          id={`enseignant-${matiere._id}`}
                          className="form-control"
                          onChange={(e) =>
                            setDatesMatieres({
                              ...datesMatieres,
                              [matiere._id]: {
                                ...datesMatieres[matiere._id],
                                enseignant: e.target.value,
                              },
                            })
                          }
                          style={{ borderColor: "#3498db" }}
                        >
                          <option value="">Choisir enseignant</option>
                          {enseignants.map((enseignant) => (
                            <option key={enseignant._id} value={enseignant._id}>
                              {enseignant.nom} {enseignant.prenom}
                            </option>
                          ))}
                        </select>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <br />
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary mr-2"
              style={{
                backgroundColor: "#3498db",
                borderColor: "#3498db",
                marginLeft: "28%",
                width: "40%",
              }}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ClasseAjout;
