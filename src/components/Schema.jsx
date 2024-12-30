import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import field from "../assets/field.png"
import field2 from "../assets/field2.png"

function Schema({ compoDom, compoExt }) {
  // Récupération des dimensions de l'écran pour un ajustement réactif
  const { width } = Dimensions.get('window');
  const fieldWidth = width * 0.45; // Chaque terrain occupe 80% de la largeur de l'écran
  const fieldHeight = fieldWidth * 1.2; // Hauteur ajustée du terrain pour lui donner une forme rectangulaire

  // Organiser les joueurs par ligne
  const organizePlayersByLine = (compo) => {
    const lines = { G: [], D: [], M: [], F: [] };

    compo.startXI.forEach(item => {
      const { player } = item;
      if (player.pos === 'G') lines.G.push(player); // Gardien
      if (player.pos === 'D') lines.D.push(player); // Défense
      if (player.pos === 'M') lines.M.push(player); // Milieu
      if (player.pos === 'F') lines.F.push(player); // Attaquant
    });

    return lines;
  };

  const linesDom = organizePlayersByLine(compoDom);
  const linesExt = organizePlayersByLine(compoExt);

  // Fonction pour calculer la position horizontale des joueurs dans chaque ligne
  const generatePositionStyle = (index, numPlayersInLine, linePosition) => {
    const playerWidth = 15;  // Largeur du joueur
    const totalPlayerWidth = playerWidth * numPlayersInLine;
    const totalSpacing = fieldWidth - totalPlayerWidth; // Espace restant sur le terrain
    const spaceBetweenPlayers = totalSpacing / (numPlayersInLine + 1); // Espacement entre les joueurs

    // Calculer la position horizontale
    const left = spaceBetweenPlayers * (index + 1) + playerWidth * index; // Espacement ajusté

    // Ajuster la position verticale en fonction de la ligne
    let top;
    if (linePosition === 1) {
      top = (fieldHeight * 0); // Gardien
    } else if (linePosition === 2) {
      top = (fieldHeight * 0.18); // Défense
    } else if (linePosition === 3) {
      top = (fieldHeight * 0.5); // Milieu
    } else if (linePosition === 4) {
      top = (fieldHeight * 0.7); // Attaquant
    } else if (linePosition === 5) {
        top = (fieldHeight * 0.9); // Attaquant
      }
       else {
      top = (fieldHeight * linePosition) / 5;
    }

    return {
      position: 'absolute',
      left,
      top,
    };
  };

  return (
    <View style={styles.container}>
      {/* Disposition des terrains de football l'un sous l'autre */}
      <View style={styles.fieldsContainer}>
      <ImageBackground source={field} style={{objectFit: "contain"}} >
        <View style={[styles.field, { width: fieldWidth, height: fieldHeight }]}>
            
          {/* Gardien */}
          {linesDom.G.map((player, index) => (
            <View key={index} style={[generatePositionStyle(index, linesDom.G.length, 1)]}>
              <View style={styles.player}>
                <Text style={styles.playerPos}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
            </View>
          ))}
          {/* Défenseurs */}
          {linesDom.D.map((player, index) => (
            <View key={index} style={[generatePositionStyle(index, linesDom.D.length, 2)]}>
              <View style={styles.player}>
                <Text style={styles.playerPos}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
            </View>
          ))}
          {/* Milieux */}
          {linesDom.M.map((player, index) => (
            <View key={index} style={[generatePositionStyle(index, linesDom.M.length, 3)]}>
              <View style={styles.player}>
                <Text style={styles.playerPos}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
            </View>
          ))}
          {/* Attaquants */}
          {linesDom.F.map((player, index) => (
            <View key={index} style={[generatePositionStyle(index, linesDom.F.length, 4)]}>
              <View style={styles.player}>
                <Text style={styles.playerPos}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
            </View>
          ))}
        </View>
</ImageBackground>
        {/* Terrain 2 avec compoExt - Miroir du terrain 1 */}
        <ImageBackground source={field} style={{objectFit: "contain"}}>
        <View style={[styles.field, { width: fieldWidth, height: fieldHeight }]}>
          {/* Attaquants (inversés pour compoExt) */}
          {linesExt.F.map((player, index) => (
            <View key={index} style={[generatePositionStyle(index, linesExt.F.length, 4)]}>
              <View style={styles.player}>
                <Text style={styles.playerPos}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
            </View>
          ))}
          {/* Milieux */}
          {linesExt.M.map((player, index) => (
            <View key={index} style={[generatePositionStyle(index, linesExt.M.length, 3)]}>
              <View style={styles.player}>
                <Text style={styles.playerPos}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
            </View>
          ))}
          {/* Défenseurs */}
          {linesExt.D.map((player, index) => (
            <View key={index} style={[generatePositionStyle(index, linesExt.D.length, 2)]}>
              <View style={styles.player}>
                <Text style={styles.playerPos}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
            </View>
          ))}
          {/* Gardien */}
          {linesExt.G.map((player, index) => (
            <View key={index} style={[generatePositionStyle(index, linesExt.G.length, 1)]}>
              <View style={styles.player}>
                <Text style={styles.playerPos}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
            </View>
          ))}
        </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  coachName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formation: {
    fontSize: 18,
    marginTop: 10,
  },
  fieldsContainer: {
    flexDirection: 'row', // Disposition des terrains l'un sous l'autre
    justifyContent: 'space-between', // Espacement égal entre les terrains
    marginTop: 20,
    gap: 10
  },
  field: {
    position: 'relative',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',  // Centrage vertical du terrain
    alignItems: 'center',  // Centrage horizontal du terrain
  },
  player: {
    width: 15,  // Taille des joueurs
    height: 15,
    backgroundColor: '#ff0000', // Couleur des joueurs
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  playerName: {
    fontSize: 9,
    color: '#fff',
    right: "30%",
    fontFamily: "Kanitus"
  },
  playerPos: {
    fontSize: 8,
    color: '#fff',
    fontFamily: "Kanito"
  }
});

export default Schema;