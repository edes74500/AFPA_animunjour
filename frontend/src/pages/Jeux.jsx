import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllGames } from "../features/games/games.slice";

const Jeux = () => {
  const allGames = useSelector(selectAllGames);

  useEffect(() => {
    console.log(allGames);
  }, [allGames]);

  return (
    <StyledJeux>
      <h1>Jeux</h1>
      {allGames.length > 0 &&
        allGames.map((game) => {
          const createdDate = new Date(game.createdAt).toLocaleDateString("fr-FR");
          return (
            <div className="card single-game" key={game._id}>
              <h2>{game.name}</h2>
              <p>{game.description}</p>
              <div className="infos">
                <span>Duree : {game.duration} mn</span>
                <span>Pour {game.playersNumber} joueurs</span>
                <span>Cree le {createdDate}</span>
              </div>
            </div>
          );
        })}
    </StyledJeux>
  );
};

export default Jeux;

const StyledJeux = styled.div`
  .single-game {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    background-color: gray;
    color: white;
    gap: 10px;
    .infos {
      display: flex;
      gap: 40px;
      width: 100%;
      justify-content: flex-end;
      span {
        font-size: 12px;
        color: lightblue;
        font-style: italic;
      }
    }
  }
`;
