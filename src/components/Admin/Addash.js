import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function DashAdmin() {
  const [departments, setDepartments] = useState(0);
  const [classes, setClasses] = useState(0);
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [eliminated, setEliminated] = useState(0);
  const [nominated, setNominated] = useState(0);
  const [matieres, setMatieres] = useState(0);
  const [absence, setAbsence] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const departmentsResponse = await axios.get(
        "http://localhost:5000/depart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("hedha depart", departmentsResponse.data.model);
      setDepartments(departmentsResponse.data.model.length);

      const classesResponse = await axios.get("http://localhost:5000/classe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("hedha classe", classesResponse.data.classes);
      setClasses(classesResponse.data.classes.length);

      const studentsResponse = await axios.get(
        "http://localhost:5000/user/etudiantsList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("etudiant", studentsResponse.data.model);
      setStudents(studentsResponse.data.model.length);

      const teachersResponse = await axios.get(
        "http://localhost:5000/user/enseignantsList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeachers(teachersResponse.data.model.length);
      console.log(" setTeachers", teachersResponse.data.model.length);

      const eliminatedResponse = await axios.get(
        "http://localhost:5000/elimine/elim",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hedha eliminer", eliminatedResponse.data.length);
      setEliminated(eliminatedResponse.data.length);

      const absenceResponse = await axios.get(
        "http://localhost:5000/absence/abs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAbsence(absenceResponse.data.length);
      console.log("hedha absence", absenceResponse.data.length);

      const nominatedResponse = await axios.get(
        "http://localhost:5000/elimine/nomi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hedha nominé", nominatedResponse.data.length);
      setNominated(nominatedResponse.data.length);

      const matieresResponse = await axios.get(
        "http://localhost:5000/matiere/mat",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMatieres(matieresResponse.data.length);
      console.log("hedhy matiere", matieresResponse.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const data = [
    // { title: "Éliminés", value: eliminated, color: "#4dc1ff" },
    { title: "Nominés", value: nominated, color: "#2470ff" },
    { title: "Étudiants", value: students, color: "#8fe9ff" },
  ];

  const data2 = [
    { title: "Éliminés", value: eliminated, color: "#4dc1ff" },
    { title: "Étudiants", value: students, color: "#8fe9ff" },
  ];

  const data1 = [
    { title: "Enseignants", value: teachers, color: "#4dc1ff" },
    { title: "Classes", value: classes, color: "#2470ff" },
    { title: "Départements", value: departments, color: "#8fe9ff" },
  ];

  //******************** */

  const barData = {
    labels: [
      "Départements",
      "Classes",
      "Enseignants",
      "Étudiants",
      "Éliminés",
      "Nominés",
      "Absence",
      "Matières",
    ],
    datasets: [
      {
        label: "Statistiques",
        data: [
          departments,
          classes,
          teachers,
          students,
          eliminated,
          nominated,
          absence,
          matieres,
        ],
        backgroundColor: [
          "#8fe9ff",
          "#69d2ff",
          "#6ebeff",
          "#8ac2ff",
          "#abe4ff",
          "#3db1ff",
          "#097ad6",
          "#6ebeff",
        ],
        borderColor: [
          "#4dc1ff",
          "#2470ff",
          "#4dc1ff",
          "#4dc1ff",
          "#4dc1ff",
          "#4dc1ff",
          "#4dc1ff",
          "#4dc1ff",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  //********************** */

  return (
    <div>
      <h3 style={{ fontFamily: "georgia, sans-serif", fontSize: "24px" }}>
        Espace Admin
      </h3>
      <br />
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow" style={{ borderRadius: "10px" }}>
            <div
              className="card-body"
              style={{
                backgroundColor: "#8fe9ff",
                color: "white",
                fontSize: "18px",
              }}
            >
              <label className="card-title" style={{ marginRight: "7%" }}>
                Départements{" "}
              </label>
              {"    "}
              <label className="card-text" style={{ fontSize: "24px" }}>
                {departments}
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow" style={{ borderRadius: "10px" }}>
            <div
              className="card-body"
              style={{
                backgroundColor: "#69d2ff",
                color: "white",
                fontSize: "18px",
              }}
            >
              <label className="card-title" style={{ marginRight: "7%" }}>
                Classes
              </label>
              <label className="card-text" style={{ fontSize: "24px" }}>
                {classes}
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow" style={{ borderRadius: "10px" }}>
            <div
              className="card-body"
              style={{
                backgroundColor: "#6ebeff",
                color: "white",
                fontSize: "18px",
              }}
            >
              <label className="card-title" style={{ marginRight: "7%" }}>
                Étudiants
              </label>
              <label className="card-text" style={{ fontSize: "24px" }}>
                {students}
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow" style={{ borderRadius: "10px" }}>
            <div
              className="card-body"
              style={{
                backgroundColor: "#8ac2ff",
                color: "white",
                fontSize: "18px",
              }}
            >
              <label className="card-title" style={{ marginRight: "7%" }}>
                Enseignants
              </label>
              <label className="card-text" style={{ fontSize: "24px" }}>
                {teachers}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="card shadow" style={{ borderRadius: "10px" }}>
            <div
              className="card-body"
              style={{
                backgroundColor: "#abe4ff",
                color: "white",
                fontSize: "18px",
              }}
            >
              <label className="card-title">Étudiants Éliminés</label>
              <label className="card-text" style={{ fontSize: "24px" }}>
                {eliminated}
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow" style={{ borderRadius: "10px" }}>
            <div
              className="card-body"
              style={{
                backgroundColor: "#3db1ff",
                color: "white",
                fontSize: "18px",
              }}
            >
              <label className="card-title">Étudiants Nominés</label>
              <label className="card-text" style={{ fontSize: "24px" }}>
                {nominated}
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow" style={{ borderRadius: "10px" }}>
            <div
              className="card-body"
              style={{
                backgroundColor: "#097ad6",
                color: "white",
                fontSize: "18px",
              }}
            >
              <label className="card-title" style={{ marginRight: "7%" }}>
                Absence Total
              </label>
              <label className="card-text" style={{ fontSize: "24px" }}>
                {absence}
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow" style={{ borderRadius: "10px" }}>
            <div
              className="card-body"
              style={{
                backgroundColor: "#6ebeff",
                color: "white",
                fontSize: "18px",
              }}
            >
              <label className="card-title" style={{ marginRight: "7%" }}>
                Matières
              </label>
              <label className="card-text" style={{ fontSize: "24px" }}>
                {matieres}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4">
          <label style={{ fontSize: "18px" }}>Étudiants Nominés:</label>
          <PieChart
            data={data}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            labelStyle={{
              fontSize: "12px",
              fontFamily: "sans-serif",
              fill: "#000",
              fontWeight: "bold",
            }}
            lineWidth={60}
            startAngle={-90}
            paddingAngle={5}
          />
        </div>

        <div className="col-4">
          <label style={{ fontSize: "18px" }}>Étudiants Éliminés :</label>
          <PieChart
            data={data2}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            labelStyle={{
              fontSize: "12px",
              fontFamily: "sans-serif",
              fill: "#000",
              fontWeight: "bold",
            }}
            lineWidth={60}
            startAngle={-90}
            paddingAngle={5}
          />
        </div>

        <div className="col-4">
          <label style={{ fontSize: "18px" }}>Départements :</label>
          <PieChart
            data={data1}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            labelStyle={{
              fontSize: "12px",
              fontFamily: "sans-serif",
              fill: "#000",
              fontWeight: "bold",
            }}
            lineWidth={60}
            startAngle={-90}
            paddingAngle={5}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <label style={{ fontSize: "18px" }}>Statistiques Globales :</label>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default DashAdmin;
