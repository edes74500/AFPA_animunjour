import axios from "axios";
import React, { useEffect, useState } from "react";
import GameEditForm from "./GameEditForm";
import NewGameForm from "./NewGameForm";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteGameById, fetchGamesList, selectAllGames } from "./games.slice";

const GameListMod = () => {
  const dispatch = useDispatch();
  const allGames = useSelector(selectAllGames);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [editGameId, setEditGameId] = useState(null);

  const deleteCurrentGame = (id) => {
    dispatch(deleteGameById(id));
  };

  const editCurrentGame = (gameId) => {
    setShowNewGameModal(false);
    setShowEditModal(true);
    setEditGameId(gameId);
  };

  const addNewGame = () => {
    setShowEditModal(false);
    setShowNewGameModal(true);
  };

  return (
    <StyledGameListMod>
      <h1>Liste des jeux actuels :</h1>
      <input type="button" value="add a new game" onClick={addNewGame} />
      {showNewGameModal && (
        <div className="modal">
          <NewGameForm setShowNewGameModal={setShowNewGameModal} />
        </div>
      )}
      {allGames.length > 0 &&
        allGames.map((game, index) => {
          const createdDate = new Date(game.createdAt).toLocaleDateString("fr-FR");

          return (
            <div key={index} className="singleGameCard">
              {!showEditModal || editGameId !== game._id ? (
                <>
                  <h3>{game.name}</h3>
                  <p>{game.description}</p>
                  <div className="infos">
                    <span>Durée : {game.duration} mn</span>
                    <span>Pour {game.playersNumber} joueurs</span>
                    <span>Créé le {createdDate}</span>
                  </div>
                  <input type="button" onClick={() => deleteCurrentGame(game._id)} value="delete" />
                  <input type="button" onClick={() => editCurrentGame(game._id)} value="edit" />
                </>
              ) : (
                <div className="modal">
                  <GameEditForm id={editGameId} setShowEditModal={setShowEditModal} />
                </div>
              )}
            </div>
          );
        })}
    </StyledGameListMod>
  );
};

export default GameListMod;

const StyledGameListMod = styled.div`
  padding: 20px;
  background-color: grey;
  color: white;

  .singleGameCard,
  .newGameForm {
    padding: 10px;
    border: 1px solid white;
    margin: 10px;
    .infos {
      display: flex;
      gap: 40px;
      width: 100%;
      justify-content: flex-start;
      span {
        font-size: 12px;
        color: lightblue;
        font-style: italic;
      }
    }
  }
`;
