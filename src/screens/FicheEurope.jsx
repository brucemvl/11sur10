import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TableauEurope from '../components/TableauEurope';  // Assurez-vous que Tableau est compatible avec React Native
import Classement from '../components/Classement';  // Idem pour ClassementChampionnat
import { useState } from 'react';

function FicheEurope({ route }) {
    const { id } = route.params;  // Récupère l'ID du championnat depuis les paramètres de navigation

    const [filter, setFilter] = useState(null); // initialisation de filter avec null


    return (
        <ScrollView contentContainerStyle={styles.blocChamp}>
            {/* Passer l'ID du championnat et la fonction setFilter aux composants */}
            <TableauEurope id={id} setFilter={setFilter} filter={filter}/>
            <Classement id={id} />
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    blocChamp: {
        flexGrow: 1, // Cette ligne garantit que le contenu du ScrollView occupe l'espace disponible
        padding: 20,
        justifyContent: "flex-start", // Cela assure que le contenu commence en haut
        width: "100%",
    },
});

export default FicheEurope;