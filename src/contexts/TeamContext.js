import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TeamContext = createContext({
  selectedTeamId: null,
  setSelectedTeamId: () => {}
});

export const TeamProvider = ({ children }) => {
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    const loadSavedTeam = async () => {
      try {
        const saved = await AsyncStorage.getItem('teamId');
        if (saved) {
          setSelectedTeamId(parseInt(saved, 10));
        }
      } catch (err) {
        console.error("Erreur lecture teamId", err);
      }
    };
    loadSavedTeam();
  }, []);

  // (Optionnel) Si tu veux sauvegarder quand l'utilisateur change d'équipe
  useEffect(() => {
    if (selectedTeamId !== null) {
      AsyncStorage.setItem('teamId', selectedTeamId.toString()).catch(err => {
        console.error("Erreur sauvegarde teamId", err);
      });
    }
  }, [selectedTeamId]);

  return (
    <TeamContext.Provider value={{ selectedTeamId, setSelectedTeamId }}>
      {children}
    </TeamContext.Provider>
  );
};