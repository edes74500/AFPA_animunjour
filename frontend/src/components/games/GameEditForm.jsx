import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

const GameEditForm = ({ id, setShowEditModal }) => {
  const formRef = React.useRef();
  const [currentGame, setCurrentGame] = useState({});
  const [loading, setLoading] = useState(true); // État pour suivre le chargement des données

  useEffect(() => {
    axios.get(`http://localhost:5000/games/get-game/${id}`).then((res) => {
      setCurrentGame(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(currentGame);
  }, [currentGame]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formRef.current);
    const formData = {};
    const elements = formRef.current.elements;
    const age = {
      startAge: e.target.elements.startAge.value,
      endAge: e.target.elements.endAge.value,
    };
    formData.age = age;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.id) {
        formData[element.name] = element.value;
      }
    }
    axios
      .put(`http://localhost:5000/games/update-game/${id}`, formData)
      .then((response) => {
        console.log(response);
        // Gérer la réponse de la requête
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error);
      });
    console.log(formData);
    setShowEditModal(false);
  };

  const cancelEditGame = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <h1>Edit {currentGame.name}</h1>
      {!loading && (
        <form ref={formRef} onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" defaultValue={currentGame.name} />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>

            <div className="form-control" id="age">
              <input type="text" name="startAge" placeholder="Age début" defaultValue={currentGame.age.startAge} />
              {" à "}
              <input type="text" name="endAge" placeholder="Age fin" defaultValue={currentGame.age.endAge} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duree en mn</label>
            <input type="text" id="duration" name="duration" defaultValue={currentGame.duration} />
          </div>
          <div className="form-group">
            <label htmlFor="playersNumber">Nombre de joueurs</label>
            <input type="text" id="playersNumber" name="playersNumber" defaultValue={currentGame.playersNumber} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Regle du jeu</label>
            <textarea id="description" name="description" defaultValue={currentGame.description}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control" id="image" name="image" />
          </div>

          <div>
            <input type="submit" />
            <input type="button" value="cancel" onClick={cancelEditGame} />
          </div>
        </form>
      )}
    </div>
  );
};

export default GameEditForm;
