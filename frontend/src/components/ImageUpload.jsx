import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file.name);

    var idxDot = file.name.lastIndexOf(".") + 1;
    var extFile = file.name.slice(idxDot, file.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
      const formData = new FormData();
      formData.append("img", file); // Le nom 'image' doit correspondre à celui attendu par votre middleware multer côté serveur

      try {
        const response = await axios.post("http://localhost:5000/post/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image Uploaded", response.data);
        // Gérer la réponse du serveur ici, par exemple en affichant l'image uploadée
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
}

export default ImageUpload;
