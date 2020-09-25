import React from "react";
import axios from "axios";
import Badge from "@material-ui/core/Badge";

function Popup({ selected, closePopup }) {
  const selectedID = selected.imdbID;

  const deleteMovie = (event) => {
    event.preventDefault();
    axios
      .delete(`http://www.omdbapi.com/?apikey=803e6689&i=${selectedID}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  const badgeStyle = {
    position: "absolute",
    left: "540px",
    borderRadius: "30px",
    zIndex: 1,
  };
  const fields = {
    Plot: selected.Plot,
    "Release Date": selected.Released,
    Genre: selected.Genre,
    Director: selected.Director,
    Actors: selected.Actors,
    Language: selected.Language,
    // Rating: selected.imdbRating,
  };

  const adminLogin = sessionStorage.getItem("email") === "admin";

  return (
    <section className="popup">
      <div className="content">
        <h2>
          {selected.Title} <span>({selected.Year})</span>
        </h2>
        <br />
        <br />
        <Badge
          style={badgeStyle}
          badgeContent={selected.imdbRating}
          color="error"
          fullWidth
        ></Badge>
        <div className="plot">
          <img src={selected.Poster} alt="movieResult" />
          <p>
            {Object.keys(fields).map((item, index) => {
              return (
                <>
                  <b>{item}</b> : {fields[item]}
                  <br />
                  <br />
                </>
              );
            })}
          </p>
        </div>
        <button className="close" onClick={closePopup}>
          Close
        </button>
        {adminLogin ? (
          <button className="delete" onClick={deleteMovie}>
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default Popup;
