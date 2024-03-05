import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const verifyToken = () => {
  const token = Cookies.get("jwtToken"); // Assurez-vous que le nom du cookie correspond.
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const user = axios.get("http://localhost:3000/users/" + decodedToken.user);
    // Vous pouvez ajouter d'autres vérifications ici, comme la vérification de l'expiration
    return user.data;
  } catch (error) {
    return false;
  }
};
