import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

function FicheEquipe(){

    const route = useRoute();
  const { id } = route.params;
    

    const [equipe, setEquipe] = useState()

    useEffect(() => {
        const fetchEquipe = async () => {
          try {
            const response = await fetch(`https://v3.football.api-sports.io/teams?id=${id}`, {
              method: "GET",
              headers: {
                "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                "x-rapidapi-host": "v3.football.api-sports.io",
              },
            });
            const json = await response.json();
            if (json.response.length > 0) {
              setEquipe(json.response[0]);
            }
          } catch (error) {
            console.error("error:", error);
          }
        };
        fetchEquipe();
      }, [id]);

      console.log(equipe)

}

export default FicheEquipe