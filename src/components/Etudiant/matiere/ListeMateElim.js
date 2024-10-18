import React, { useState, useEffect } from "react";
import axios from "axios";

const ListMat = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout de l'état loading

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("idUser");
      const response = await axios.get(
        `http://localhost:5000/matiere/list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.tab);
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
          <div className="text-light small fw-semibold">Loading</div>
          <div className="demo-inline-spacing">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Matiere</th>
              <th>Coefficient</th>
              <th>nbHTotal</th>
              <th>NbrHElim</th>
              <th>Nombre Absence</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((matiere, index) => (
                <tr key={index}>
                  <td>
                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                    <strong>{matiere.mat.nom}</strong>
                  </td>
                  <td>{matiere.mat.coeff}</td>
                  <td>{matiere.mat.nbHTotal}</td>
                  <td>{matiere.mat.NbrHElim}</td>
                  <td>{matiere.sumAbsence}</td>
                  <td>
                    {matiere.status === "elimine" && (
                      <span className="badge bg-label-warning me-1">
                        Eliminé
                      </span>
                    )}
                    {matiere.status === "nomine" && (
                      <span className="badge bg-label-info me-1">Nominé</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ListMat;
