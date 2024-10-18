import { useState, useEffect } from "react";
import axios from "axios";

import { format } from "date-fns";
const NotifList = () => {
    const dateFormat = "dd/MM/yyyy HH:mm:ss";
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
        const token = localStorage.getItem("token");
      const id= localStorage.getItem("idUser")
      const response = await axios.get(
       `http://localhost:5000/notif/getall/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.notifications);
      
    } catch (err) {
      console.log(err.response);
    }
  }
    return (

        <div>
            {data && data.length > 0 ? (
  data.map((e, index) => (
    <div className="row" data-masonry='{"percentPosition": true }' key={index}>
      <div className="col-sm-8 col-lg-8 mb-8">
        <div className="card bg-primary text-white text-center p-3">
          <figure className="mb-0">
            <blockquote className="blockquote">
            <span>{e.contenu}</span>
              {e.elimination && e.elimination.matiere && (
                <span>{e.elimination.matiere.nom}</span>
              )}
            </blockquote>
            {e.date && (
  <figcaption className="blockquote-footer mb-0 text-white">
    {format(new Date(e.date), dateFormat)}
  </figcaption>
)}
          </figure>
        </div>
      </div>
    </div>
  ))
) : (
  <div>No notifications available</div>
)}



        </div>
    )


}


export default NotifList;


