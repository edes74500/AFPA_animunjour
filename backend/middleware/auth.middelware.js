const jwt = require("jsonwebtoken");
const UserModel = require("../models/users.model");
const { promisify } = require("util");
const jwtVerify = promisify(jwt.verify);

// module.exports.checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   console.log("debut de l'authentification");
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         res.cookie("jwt", "", { maxAge: 1 });
//         next();
//       } else {
//         let user = await UserModel.findById(decodedToken.id);
//         res.locals.user = user;
//         console.log(res.locals.user + " requete autorise");
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     console.log(res.locals.user + " requete autorise");
//     next();
//   }
// };

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Début de l'authentification");

  if (!token) {
    console.log("Aucun token fourni - Requête non autorisée");
    const err = new Error("Aucun token fourni - Requête non autorisée");
    err.status = 401;
    next(err);
    return;
  }

  try {
    const decodedToken = await jwtVerify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decodedToken.id);

    if (!user) {
      const error = new Error("Utilisateur non trouvé");
      error.status = 403;
      next(error);
      return;
    }

    res.locals.user = user;
    console.log(`${user ? user.email : "Utilisateur non trouvé"} - Requête autorisée`);
    next();
  } catch (err) {
    console.error("Erreur de vérification du token - Requête non autorisée");
    res.cookie("jwt", "", { expires: new Date(0) }); // Effacer le cookie jwt
    res.locals.user = null;
    const error = new Error("Token invalide");
    error.status = 403;
    next(error);
  }
};

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.send(200).json("no token");
//       } else {
//         console.log(decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     console.log("No token");
//   }
// };
