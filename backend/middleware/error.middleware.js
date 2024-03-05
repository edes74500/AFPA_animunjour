module.exports.errorHandler = (err, req, res, next) => {
  if (err.source === "getAllGames") {
    console.log("L'erreur provient de getAllGames");
    // Traitement spécifique à cette erreur...
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // const error = err.originalErr;
  res.status(status).json({ error: message });
};
