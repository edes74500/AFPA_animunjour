import axios from "axios";
import React, { useEffect, useState } from "react";
import GameEditForm from "./GameEditForm";
import NewGameForm from "./NewGameForm";

const GameListMod = () => {
  const [allGames, setAllGames] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [editGameId, setEditGameId] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/games/all-games`).then((res) => {
      setAllGames(res.data);
    });
  }, []);

  // useEffect(() => {
  //   console.log(allGames);
  //   console.log(allGames.length);
  // }, [allGames]);

  const deleteCurrentGame = (id) => {
    const confirmation = window.confirm("Voulez-vous vraiment supprimer ce jeu ?");
    if (confirmation) {
      axios.delete(`${import.meta.env.VITE_API_URL}/games/delete-game/${id}`).then((res) => {
        console.log(res.data);
      });
    }
  };

  const editCurrentGame = (id) => {
    setShowNewGameModal(false);
    setShowEditModal(true);
    setEditGameId(id);
  };

  const addNewGame = () => {
    setShowEditModal(false);
    setShowNewGameModal(true);
  };

  return (
    <div>
      {/* {showEditModal && (
       
      )} */}
      {showNewGameModal && (
        <div className="modal">
          <NewGameForm setShowNewGameModal={setShowNewGameModal} />
        </div>
      )}
      <h1>Liste des jeux actuels :</h1>
      <input type="button" value="add a new game" onClick={addNewGame} />
      {allGames.length > 0 &&
        allGames.map((game) => (
          <div key={game._id}>
            {!showEditModal || editGameId !== game._id ? (
              <>
                <h3>{game.name}</h3>
                <p>{game.description}</p>
                <span onClick={() => deleteCurrentGame(game._id)}>delete</span>
                <span onClick={() => editCurrentGame(game._id)}>edit</span>
              </>
            ) : (
              <div className="modal">
                <GameEditForm id={editGameId} setShowEditModal={setShowEditModal} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default GameListMod;
