import React from "react";
// import NewGameForm from "../components/games/NewGameForm";
import GameListMod from "../features/games/GameListMod";
// import GameEditForm from "../components/games/GameEditForm";

const AdminPanel = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <GameListMod />
    </div>
  );
};

export default AdminPanel;
