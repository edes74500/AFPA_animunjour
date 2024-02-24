import React from "react";
import NewGameForm from "../components/NewGameForm";
import GameListMod from "../components/GameListMod";
import GameEditForm from "../components/GameEditForm";

const AdminPanel = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <GameListMod />
    </div>
  );
};

export default AdminPanel;
