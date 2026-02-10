import axios from 'axios';

const API_KEY = "5ff22ea19db11151a018c36f7fd0213b";

const apiSports = axios.create({
  baseURL: `https://v3.football.api-sports.io/`,
  headers: {
    "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
  },
});

export async function fetchLigue1Matches() {
  const res = await apiSports.get('/fixtures', {
    params: {
      league: 2,
      season: 2025,
      status: 'NS',
    },
  });

  return res.data.response;
}