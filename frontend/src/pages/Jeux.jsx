import React from "react";
import { useSelector } from "react-redux";

const Jeux = () => {
  const allGames = useSelector((state) => state.games);

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
