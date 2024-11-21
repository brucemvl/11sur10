import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Tableau from '../components/Tableau';  // Assurez-vous que Tableau est compatible avec React Native
import Classement from '../components/Classement';  // Idem pour ClassementChampionnat
import PropTypes from 'prop-types';

function FicheChampionnat({ route, setFilter }) {
    const { id } = route.params;  // Récupère l'ID du championnat depuis les paramètres de navigation

    return (
        <ScrollView contentContainerStyle={styles.blocChamp}>
            {/* Passer l'ID du championnat et la fonction setFilter aux composants */}
            <Tableau id={id} setFilter={setFilter} />
            <Classement id={id} />
        </ScrollView>
    );
}

FicheChampionnat.propTypes = {
    setFilter: PropTypes.func.isRequired,  // Assurez-vous que setFilter est une fonction
};

const styles = StyleSheet.create({
    blocChamp: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        width: "100%"
    },
});

export default FicheChampionnat;