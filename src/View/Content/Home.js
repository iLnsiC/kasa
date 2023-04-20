import React from "react";
import { useState, useEffect } from "react";
import Card from "../../Component/Card";
import "./Home.css";
import { createClient } from "pexels";

const client = createClient(
  "IUYd1xTYs3jOIKIQMrVB5nQrBu6uZ2puDY8kZnqqCD6PClurqoReoeva"
);
const query = "Landscape";
const perPage = 80; // number of photos to retrieve per page
const randomPage = Math.floor(Math.random() * 10) + 1; // get a random page between 1 and 10

client.photos
  .search({
    query,
    per_page: perPage,
    page: randomPage,
    orientation: "landscpae",
  })
  .then((photos) => {
    const randomIndex = Math.floor(Math.random() * perPage); // get a random index within the retrieved photos
    const randomPhoto = photos.photos[randomIndex]; // get the random photo
    console.log(randomPhoto);
  });
export default function Home() {
  const [housing, setHousing] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/logement-data.json`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("La réponse du serveur n'est pas OK");
        }
        return response.json();
      })
      .then((data) => {
        setHousing(data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  }, []);

  return (
    <div className="home-container">
      <Card
        rounded={10}
        content={"Chez vous, partout et ailleurs"}
        isBanner={true}
        image={
          "https://img.freepik.com/photos-gratuite/jetee-au-bord-lac-hallstatt-autriche_181624-44201.jpg"
        }
      />
      <Card rounded={25} isGrey={true}>
        {housing.map((e) => (
          <Card
            key={e.id}
            id={e.id}
            rounded={10}
            gradient={true}
            content={e.title}
            isLocation={true}
            image={e.cover}
            data={e}
          />
        ))}
      </Card>
    </div>
  );
}
