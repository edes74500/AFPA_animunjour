import axios from "axios";
import React, { useEffect, useState } from "react";

const Jeux = () => {
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/game/all-games").then((res) => {
      setAllGames(res.data);
    });
  }, []);

  useEffect(() => {
    console.log(allGames);
    console.log(allGames.length);
  }, [allGames]);

  return (
    <div>
      <h1>Jeux</h1>
      {allGames.length > 0 &&
        allGames.map((game) => {
          return (
            <div className="card" key={game._id}>
              <h2>{game.name}</h2>
              <p>{game.description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Jeux;
<h1>Jeux</h1>;
