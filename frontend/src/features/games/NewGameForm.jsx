import React from "react";
import { useDispatch } from "react-redux";
import { addGame } from "./games.slice";

const NewGameForm = ({ setShowNewGameModal }) => {
  const formRef = React.useRef();
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const elements = formRef.current.elements;
    let isFormValid = true;

    const age = {
      startAge: e.target.elements.startAge.value,
      endAge: e.target.elements.endAge.value,
    };
    formData.age = age;

    if (!age.startAge || !age.endAge) {
      isFormValid = false;
      alert("Les champs d'âge sont requis.");
    }

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.id && !element.value && element.type !== "file") {
        isFormValid = false;
        alert(`Le champ ${element.name} est requis.`);
        break;
      }

      if (element.id) {
        formData[element.name] = element.value;
      }
    }
    if (isFormValid) {
      dispatch(addGame(formData));
      setShowNewGameModal(false);
    } else {
      console.log("Le formulaire est incomplet.");
    }
  };

  const cancelNewGame = () => {
    setShowNewGameModal(false);
  };

  return (
    <div className="newGameForm">
      <h1>New Game Form</h1>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Name" />
        </div>
        <div className="form-group">
          <span>Age</span>
          <div className="form-control" id="age">
            <input type="number" name="startAge" placeholder="Age début" />
            {" à "}
            <input type="number" name="endAge" placeholder="Age fin" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duree en mn</label>
          <input type="number" id="duration" name="duration" />
        </div>
        <div className="form-group">
          <label htmlFor="playersNumber">Nombre de joueurs</label>
          <input type="number" id="playersNumber" name="playersNumber" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Regle du jeu</label>
          <textarea id="description" required={true} name="description"></textarea>
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
