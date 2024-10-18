import React, { useState, useEffect } from "react";
import axios from "axios";

const ListEnsdByEtud = () => {
  const [enseignants, setEnseignants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("idUser");
      const response = await axios.get(
        `http://localhost:5000/user/etudiant/${id}/enseignants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEnseignants(response.data.enseignants);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="col-md">
          <div className="text-light small fw-semibold">Chargement</div>
          <div className="demo-inline-spacing">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Titre</th>
            </tr>
          </thead>
          <tbody>
            {enseignants && enseignants.length > 0 ? (
              enseignants.map((enseignant, index) => (
                <tr key={index}>
                  <td>{enseignant.nom}</td>
                  <td>{enseignant.prenom}</td>
                  <td>{enseignant.email}</td>
                  <td>{enseignant.telephone}</td>
                  <td>{enseignant.titre}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucun enseignant trouvé pour cet étudiant</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ListEnsdByEtud;
