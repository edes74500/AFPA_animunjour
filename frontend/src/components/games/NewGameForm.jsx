import axios from "axios";
import React, { useEffect } from "react";

const NewGameForm = ({ setShowNewGameModal }) => {
  const formRef = React.useRef();

  useEffect(() => {
    // console.log(formRef.current);
  }, [formRef]);

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
      .post("http://localhost:5000/game/new-game", formData)
      .then((response) => {
        console.log(response);
        // Gérer la réponse de la requête
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error);
      });
    console.log(formData);
    setShowNewGameModal(false);
  };

  const cancelNewGame = () => {
    setShowNewGameModal(false);
  };

  return (
    <div>
      <h1>New Game Form</h1>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Name" />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>

          <div className="form-control" id="age">
            <input type="text" name="startAge" placeholder="Age début" />
            {" à "}
            <input type="text" name="endAge" placeholder="Age fin" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duree en mn</label>
          <input type="text" id="duration" name="duration" />
        </div>
        <div className="form-group">
          <label htmlFor="playersNumber">Nombre de joueurs</label>
          <input type="text" id="playersNumber" name="playersNumber" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Regle du jeu</label>
          <textarea id="description" name="description"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" className="form-control" id="image" name="image" />
        </div>

        <div>
          <input type="submit" />
          <input type="button" value="cancel" onClick={cancelNewGame} />
        </div>
      </form>
    </div>
  );
};

export default NewGameForm;
