import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Animated, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import chevron from "../assets/chevron.png"
import { LinearGradient } from "expo-linear-gradient";

import haaland from "../assets/portraits/haaland.png"
import gyokeres from "../assets/portraits/gyokeres.jpg"
import zaire from "../assets/portraits/zaire.png"
import yamal from "../assets/portraits/yamal.jpg"
import dembele from "../assets/portraits/dembele.png"
import bellingham from "../assets/portraits/bellingham.png"
import barcola from "../assets/portraits/barcola.png"
import rodrygo from "../assets/portraits/rodrygo.jpg"
import guller from "../assets/portraits/guller.jpg"
import doue from "../assets/portraits/doue.png"
import kvara from "../assets/portraits/kvara.png"
import goat from "../assets/portraits/goat.jpg"
import darwin from "../assets/portraits/darwin.png"
import salah from "../assets/portraits/salah.png"
import kounde from "../assets/portraits/kounde.jpg"
import endrick from "../assets/portraits/endrick.jpg"
import mbappe from "../assets/portraits/mbappe.png"
import vini from "../assets/portraits/vini.png"
import palmer from "../assets/portraits/palmer.png"
import messi from "../assets/trophees/messi.jpg"
import griezmann from "../assets/portraits/griezmann.png"
import olise from "../assets/portraits/olise.jpg"
import cherki from "../assets/portraits/cherki.jpg"
import rabiot from "../assets/portraits/rabiot.jpg"
import lacazette from "../assets/portraits/lacazette.jpg"
import theo from "../assets/portraits/theo.jpg"
import raphinha from "../assets/portraits/raphinha.png"
import lewandowski from "../assets/portraits/lewandowski.png"
import isak from "../assets/portraits/isak.png"
import ramos from "../assets/portraits/ramos.png"
import garnacho from "../assets/portraits/garnacho.jpg"
import vitinha from "../assets/portraits/vitinha.png"
import pacho from "../assets/portraits/pacho.png"
import joao from "../assets/portraits/joao.png"
import safonov from "../assets/portraits/safonov.png"
import tchouameni from "../assets/portraits/tchouameni.jpg"
import kolo from "../assets/portraits/kolo.png"
import kephren from "../assets/portraits/kephren.png"
import adeyemi from "../assets/portraits/adeyemi.png"
import debruyne from "../assets/portraits/debruyne.png"
import mayulu from "../assets/portraits/mayulu.png"
import diaz from "../assets/portraits/diaz.png"
import macallister from "../assets/portraits/macallister.png"
import gakpo from "../assets/portraits/gakpo.png"
import arnold from "../assets/portraits/arnold.png"
import marmoush from "../assets/portraits/marmoush.png"
import akanji from "../assets/portraits/akanji.png"
import cubarsi from "../assets/portraits/cubarsi.jpg"
import kimpembe from "../assets/portraits/kimpembe.png"
import beraldo from "../assets/portraits/beraldo.png"
import sorloth from "../assets/portraits/sorloth.png"
import alvarez from "../assets/portraits/alvarez.png"
import schik from "../assets/portraits/schik.png"
import wirtz from "../assets/portraits/wirtz.jpg"
import camavinga from "../assets/portraits/camavinga.jpg"
import modric from "../assets/portraits/modric.jpg"
import valverde from "../assets/portraits/valverde.png"
import rudiger from "../assets/portraits/rudiger.jpg"
import antony from "../assets/portraits/antony.jpg"
import isco from "../assets/portraits/isco.jpg"
import leao from "../assets/portraits/Leao.jpg"
import carvajal from "../assets/portraits/carvajal.jpg"
import militao from "../assets/portraits/militao.jpg"
import ugarte from "../assets/portraits/ugarte.png"
import lisandro from "../assets/portraits/lisandro.png"
import szoboszlai from "../assets/portraits/szoboszlai.png"
import bradley from "../assets/portraits/bradley.png"
import saka from "../assets/portraits/saka.png"
import trossard from "../assets/portraits/trossard.png"
import odegard from "../assets/portraits/odegard.png"
import saliba from "../assets/portraits/saliba.png"
import lookman from "../assets/portraits/lookman.png"
import retegui from "../assets/portraits/retegui.png"
import deketelaere from "../assets/portraits/deketelaere.png"
import donarumma from "../assets/portraits/donarumma.png"
import nuno from "../assets/portraits/nuno.png"
import hernandez from "../assets/portraits/hernandez.png"
import hakimi from "../assets/portraits/hakimi.png"
import marquinhos from "../assets/portraits/marquinhos.png"
import ascencio from "../assets/portraits/ascencio.png"
import rashford from "../assets/portraits/rashford.png"
import watkins from "../assets/portraits/watkins.png"
import malen from "../assets/portraits/malen.png"
import rogers from "../assets/portraits/rogers.png"
import rice from "../assets/portraits/rice.png"
import partey from "../assets/portraits/partey.png"
import skelly from "../assets/portraits/skelly.png"
import merino from "../assets/portraits/merino.png"
import balde from "../assets/portraits/balde.jpg"
import pedri from "../assets/portraits/pedri.jpg"
import olmo from "../assets/portraits/olmo.jpg"
import brahim from "../assets/portraits/brahim.jpg"
import beier from "../assets/portraits/beier.png"
import brandt from "../assets/portraits/brandt.png"
import mmd from "../assets/portraits/mmd.png"
import touf from "../assets/portraits/touf.png"
import mikautadze from "../assets/portraits/mikautadze.jpg"
import zirkzee from "../assets/portraits/zirkzee.png"
import hojlund from "../assets/portraits/hojlund.png"
import amad from "../assets/portraits/amad.png"
import mazraoui from "../assets/portraits/mazraoui.png"
import mainoo from "../assets/portraits/mainoo.png"
import deligt from "../assets/portraits/deligt.png"
import marcus from "../assets/portraits/marcus.png"
import doku from "../assets/portraits/doku.png"
import bernardo from "../assets/portraits/bernardo.png"
import rodri from "../assets/portraits/rodri.png"
import fernandez from "../assets/portraits/fernandez.png"
import jackson from "../assets/portraits/jackson.png"
import caicedo from "../assets/portraits/caicedo.png"
import huijsen from "../assets/portraits/huijsen.png"
import ake from "../assets/portraits/ake.png"
import james from "../assets/portraits/james.png"
import neto from "../assets/portraits/neto.png"
import collwill from "../assets/portraits/colwill.png"
import mudryk from "../assets/portraits/mudryk.png"
import cucurella from "../assets/portraits/cucurella.png"
import madueke from "../assets/portraits/madueke.png"
import savinho from "../assets/portraits/savinho.png"
import guirassy from "../assets/portraits/guirassy.png"
import kane from "../assets/portraits/kane.png"
import biereth from "../assets/portraits/biereth.png"
import martinez from "../assets/portraits/martinez.png"

function Classement({ id }) {
  const [openButeurs, setOpenButeurs] = useState(false);
  const [openPasseurs, setOpenPasseurs] = useState(false);
  const [openClassement, setOpenClassement] = useState(false);


  const [tab, setTab] = useState([]);
  const [buteurs, setButeurs] = useState([]);
  const [passeurs, setPasseurs] = useState([]);
  const navigation = useNavigation();

  // États distincts pour chaque animation
  const [rotateClassement, setRotateClassement] = useState(new Animated.Value(0));
  const [rotateButeurs, setRotateButeurs] = useState(new Animated.Value(0));
  const [rotatePasseurs, setRotatePasseurs] = useState(new Animated.Value(0));

  const [heightClassement, setHeightClassement] = useState(new Animated.Value(0));
  const [heightButeurs, setHeightButeurs] = useState(new Animated.Value(0));
  const [heightPasseurs, setHeightPasseurs] = useState(new Animated.Value(0));


  const fetchClassement = () => {
    fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=${id === 71 || id === 253 ||id === 15? 2025 : 2024}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) =>  setTab(id === 15 ? json.response[0].league.standings : json.response[0].league.standings[0] ))
      
      .catch((error) => console.error("Error:", error));

      
  };

  console.log(tab)

  const fetchButeurs = () => {
    fetch(`https://v3.football.api-sports.io/players/topscorers?league=${id}&season=${id === 71 || id === 253 || id === 15 ? 2025 : 2024}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) => setButeurs(json.response.slice(0, 10)))
      .catch((error) => console.error("Error:", error));
  };

  console.log(buteurs)
  const fetchPasseurs = () => {
    fetch(`https://v3.football.api-sports.io/players/topassists?league=${id}&season=${id === 71 || id === 253 || id === 15 ? 2025 : 2024}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) => setPasseurs(json.response.slice(0, 10)))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchClassement();
    fetchButeurs();
    fetchPasseurs();
  }, [id]);

  const collapseClassement = () => {
    setOpenClassement(!openClassement);
    Animated.timing(rotateClassement, {
      toValue: openClassement ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  
    Animated.timing(heightClassement, {
      toValue: openClassement ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    };

  const collapseButeurs = () => {
    setOpenButeurs(!openButeurs);
    Animated.timing(rotateButeurs, {
      toValue: openButeurs ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  
    Animated.timing(heightButeurs, {
      toValue: openButeurs ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();  };

  const collapsePasseurs = () => {
    setOpenPasseurs(!openPasseurs);
    Animated.timing(rotatePasseurs, {
      toValue: openPasseurs ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  
    Animated.timing(heightPasseurs, {
      toValue: openPasseurs ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();  };

    const rotateClassementInterpolate = rotateClassement.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  
    const rotateButeursInterpolate = rotateButeurs.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  
    const rotatePasseursInterpolate = rotatePasseurs.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });



    if(id === 15 ){
      return (
        <View style={styles.container}>
      {/* Classement */}
      <LinearGradient       colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
      style={{ marginBlock: 10, height: 40, justifyContent: "center", borderRadius: 10}}
        >
      <TouchableOpacity onPress={collapseClassement} style={styles.header}>
        <Text style={styles.title}>Classement</Text>
        <Animated.Image
            source={chevron}
            style={[styles.chevron, { transform: [{ rotate: rotateClassementInterpolate }] }]}
          />      </TouchableOpacity>
      </LinearGradient>
      <Animated.View style={tab.length < 20 ? [ styles.content, { height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  1500] // Ajustez la hauteur en fonction du contenu
          }) }] : tab.length < 24 ? [ styles.content, { height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  980] // Ajustez la hauteur en fonction du contenu
          }) }] : [ styles.content, { height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  1800] // Si le classement comporte + de 24 equipes
          }) }]}>
            { tab.map((grp)=> 
            <View style={styles.groupe}>
  <Text style={{fontFamily: "Kanitt"}}>{grp[0].group}</Text>
         <View style={styles.barre}>
            <Text style={{width: "10%", color: "white", fontFamily: "Kanitus"}}>Rang</Text>
            <Text style={{width: "36%", textAlign: "center", marginRight: 2, color: "white", fontFamily: "Kanitus"}}>Equipe</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>J</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>V</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>N</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>D</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>GA</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>Pts</Text>
          </View>
          <View style={{backgroundColor: "rgb(147, 147, 147)", borderRadius: 5, paddingBlock: 3}}>
          {grp.map((equipe)=> 
          <View style={{flexDirection: "row", alignItems: "center", marginBlock: 4}}>
          <Text style={{width: "6%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.rank}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("FicheEquipe", { id: equipe.team.id, league: equipe.group === "Ligue 1" ? 61 : equipe.group === "UEFA Champions League" ? 2 : equipe.group === "Premier League" ? 39 : equipe.group === "LaLiga" ? 140 : equipe.group.indexOf("Super League 1") !== -1 ? 197 : equipe.group === "Bundesliga" ? 78 : equipe.group === "Ligue 2: Regular Season" ? 62 : equipe.group === "Serie A" ? 135 : equipe.group === "UEFA Europa League" ? 3 : equipe.group === "Saudi League" ? 307 : equipe.group === "Eastern Conference" ? 253 : equipe.group === "Primeira Liga" ? 94 : equipe.description === "Promotion - FIFA Club World Cup (Play Offs: 1/8-finals)" ? 15 : equipe.group.indexOf("Group") != -1 ? 15 : null })} style={{width: "38%", flexDirection: "row"}}>
          <Image source={{uri: equipe.team.logo}} style={{objectFit: "contain", height: 20, width: "18%"}} />
            <Text style={{width: "82%", color: "white", fontFamily: "Kanito", textAlign: "center", fontSize: 13}}>{equipe.team.name === "Paris Saint Germain" ? "Paris SG" : equipe.team.name === "Stade Brestois 29" ? "Stade Brestois" : equipe.team.name === "Barcelona" ? "FC Barcelone" : equipe.team.name}</Text>
            </TouchableOpacity>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.all.played}</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.all.win}</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.all.draw}</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.all.lose}</Text>
            <Text style={{width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.goalsDiff}</Text>
            <Text style={{width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.points}</Text>

            </View>
          )}
          </View>
        </View>
          
          
        )}


        </Animated.View>


      {/* Meilleurs Buteurs */}
      <LinearGradient       colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
      style={{ marginBlock: 10, height: 40, justifyContent: "center", borderRadius: 10}}
        >
      <TouchableOpacity onPress={collapseButeurs} style={styles.header}>

        <Text style={styles.title}>Meilleurs Buteurs</Text>
        <Animated.Image
            source={chevron}
            style={[styles.chevron, { transform: [{ rotate: rotateButeursInterpolate }] }]}
          />     
           </TouchableOpacity>
      </LinearGradient>
        <Animated.View style={[ styles.content, { height: heightButeurs.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500]  // Ajustez la hauteur en fonction du contenu
          }) }]}>        <View style={styles.barre}>
        <Text style={{width: "50%", color: "white", paddingStart: 20, fontFamily: "Kanitus"}}>Joueur</Text>
        <Text style={{width: "30%", color: "white", textAlign: "center", fontFamily: "Kanitus"}}>Matchs Joués</Text>
        <Text style={{width: "20%", color: "white", textAlign: "center", fontFamily: "Kanitus"}}>Buts</Text>
        
      </View>
        
        </Animated.View>
      

      {/* Meilleurs Passeurs */}
      <LinearGradient       colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
      style={{ marginBlock: 10, height: 40, justifyContent: "center", borderRadius: 10}}
        >
      <TouchableOpacity onPress={collapsePasseurs} style={styles.header}>
        <Text style={styles.title}>Meilleurs Passeurs</Text>
        <Animated.Image
            source={chevron}
            style={[styles.chevron, { transform: [{ rotate: rotatePasseursInterpolate }] }]}
          />     
           </TouchableOpacity>
      </LinearGradient>
        <Animated.View style={[styles.content, { height: heightPasseurs.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500]  // Ajustez la hauteur en fonction du contenu
          }) }]}>
                    <View style={styles.barre}>
        <Text style={{width: "50%", color: "white", paddingStart: 20, fontFamily: "Kanitus"}}>Joueur</Text>
        <Text style={{width: "30%", color: "white", textAlign: "center", fontFamily: "Kanitus"}}>Matchs Joués</Text>
        <Text style={{width: "20%", color: "white", textAlign: "center", fontFamily: "Kanitus"}}>Passes D</Text>  
      </View>
       
        </Animated.View>
    </View>
      )
    }


  return (
    <View style={styles.container}>
      {/* Classement */}
      <LinearGradient       colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
      style={{ marginBlock: 10, height: 40, justifyContent: "center", borderRadius: 10}}
        >
      <TouchableOpacity onPress={collapseClassement} style={styles.header}>
        <Text style={styles.title}>Classement</Text>
        <Animated.Image
            source={chevron}
            style={[styles.chevron, { transform: [{ rotate: rotateClassementInterpolate }] }]}
          />      </TouchableOpacity>
      </LinearGradient>
      <Animated.View style={tab.length < 18 ? [ styles.content, { height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  780] // Ajustez la hauteur en fonction du contenu
          }) }] : tab.length < 20 ? [ styles.content, { height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  870] // Ajustez la hauteur en fonction du contenu
          }) }] : tab.length < 22 ? [ styles.content, { height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  960] // Ajustez la hauteur en fonction du contenu
          }) }] : tab.length < 26 ? [ styles.content, { height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  1300] // Ajustez la hauteur en fonction du contenu
          }) }] : [ styles.content, { height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  1720] // Si le classement comporte + de 24 equipes
          }) }]}>
          <View style={styles.barre}>
            <Text style={{width: "10%", color: "white", fontFamily: "Kanitus"}}>Rang</Text>
            <Text style={{width: "36%", textAlign: "center", marginRight: 2, color: "white", fontFamily: "Kanitus"}}>Equipe</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>J</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>V</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>N</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>D</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>GA</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanitus"}}>Pts</Text>
          </View>
        <View style={{backgroundColor: "rgb(178, 178, 178)", borderRadius: 5, marginTop: 5, paddingInline: 2}}>
          {tab.map((equipe)=> 
                    <TouchableOpacity onPress={() => navigation.navigate("FicheEquipe", { id: equipe.team.id, league: equipe.group === "Ligue 1" ? 61 : equipe.group === "UEFA Champions League" ? 2 : equipe.group === "Premier League" ? 39 : equipe.group === "LaLiga" ? 140 : equipe.group.indexOf("Super League 1") !== -1 ? 197 : equipe.group === "Bundesliga" ? 78 : equipe.group === "Ligue 2: Regular Season" ? 62 : equipe.group === "Serie A" ? 135 : equipe.group === "UEFA Europa League" ? 3 : equipe.group === "Saudi League" ? 307 : equipe.group === "Eastern Conference" ? 253 : equipe.group === "Primeira Liga" ? 94 : null })} style={{flexDirection: "row", flexDirection: "row", alignItems: "center",  borderBottomWidth: 1, paddingBlock: 12 }}>
          <Text style={{width: "6%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.rank}</Text>
          <Image source={{uri: equipe.team.logo}} style={{objectFit: "contain", height: 20, width: "6%"}} />
            <Text style={{width: "30%", color: "white", fontFamily: "Kanito", textAlign: "center", fontSize: 13}}>{equipe.team.name === "Paris Saint Germain" ? "Paris SG" : equipe.team.name === "Stade Brestois 29" ? "Stade Brestois" : equipe.team.name === "Barcelona" ? "FC Barcelone" : equipe.team.name}</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.all.played}</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.all.win}</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.all.draw}</Text>
            <Text style={{width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.all.lose}</Text>
            <Text style={{width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.goalsDiff}</Text>
            <Text style={{width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center"}}>{equipe.points}</Text>

                        </TouchableOpacity>

          )}
        </View>
        </Animated.View>


      {/* Meilleurs Buteurs */}
      <LinearGradient       colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
      style={{ marginBlock: 10, height: 40, justifyContent: "center", borderRadius: 10}}
        >
      <TouchableOpacity onPress={collapseButeurs} style={styles.header}>

        <Text style={styles.title}>Meilleurs Buteurs</Text>
        <Animated.Image
            source={chevron}
            style={[styles.chevron, { transform: [{ rotate: rotateButeursInterpolate }] }]}
          />     
           </TouchableOpacity>
      </LinearGradient>
        <Animated.View style={[ styles.content, { height: heightButeurs.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 555]  // Ajustez la hauteur en fonction du contenu
          }) }]}>        <View style={styles.barre}>
        <Text style={{width: "55%", color: "white", paddingStart: 20, fontFamily: "Kanitus", textAlign: "center"}}>Joueur</Text>
        <Text style={{width: "28%", color: "white", textAlign: "center", fontFamily: "Kanitus"}}>Matchs Joués</Text>
        <Text style={{width: "17%", color: "white", textAlign: "center", fontFamily: "Kanitus"}}>Buts</Text>
        
      </View>
{buteurs.map((joueur) => 
      <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: joueur.player.id })}>
      <View style={styles.item}>
          <Image source={joueur.player.id === 217 ? martinez : joueur.player.id === 283026 ? biereth : joueur.player.id === 184 ? kane : joueur.player.id === 21393 ? guirassy : joueur.player.id === 116117 ? caicedo : joueur.player.id === 152953 ? collwill : joueur.player.id === 47380 ? cucurella : joueur.player.id === 19545 ? james : joueur.player.id === 5996 ? enzo : joueur.player.id === 63577 ? mudryk : joueur.player.id === 1864 ? neto : joueur.player.id === 136723 ? madueke : joueur.player.id === 283058 ? jackson :joueur.player.id === 284322 ? mainoo : joueur.player.id === 545 ? mazraoui : joueur.player.id === 532 ? deligt : joueur.player.id === 288006 ? hojlund : joueur.player.id === 70100 ? zirkzee : joueur.player.id === 157997 ? amad : joueur.player.id === 180496 ? mikautadze : joueur.player.id === 21509 ? marcus : joueur.player.id === 984 ? brandt : joueur.player.id === 158644 ? beier : joueur.player.id === 744 ? brahim : joueur.player.id === 1323 ? olmo : joueur.player.id === 133609 ? pedri : joueur.player.id === 161928 ? balde : joueur.player.id === 47311 ? merino : joueur.player.id === 313245 ? skelly : joueur.player.id === 49 ? partey : joueur.player.id === 2937 ? rice : joueur.player.id === 909 ? rashford : joueur.player.id === 19366 ? watkins : joueur.player.id === 249 ? malen : joueur.player.id === 746 ? ascencio : joueur.player.id === 19170 ? rogers : joueur.player.id === 1622 ? donarumma : joueur.player.id === 9 ? hakimi : joueur.player.id === 263482 ? nuno : joueur.player.id === 33 ? hernandez : joueur.player.id === 257 ? marquinhos : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 1946 ? trossard : joueur.player.id === 37127 ? odegard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }} style={{height: 35, width: "9%", borderRadius: 50, marginRight: 5}} />
        <Text style={{fontFamily: "Kanitt", width: "37%"}}>{joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
        <Image source={{ uri: joueur.statistics[0].team.logo }} style={styles.logo} />
        <Text style={{fontFamily: "Kanito", width: "35%", textAlign: "center"}}>{joueur.statistics[0].games.appearences}</Text>
        <Text style={{fontFamily: "Kanitt", width: "10%", textAlign:"center"}}>{joueur.statistics[0].goals.total}</Text>

      </View>
    </TouchableOpacity>
)}
        </Animated.View>
      

      {/* Meilleurs Passeurs */}
      <LinearGradient       colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
      style={{ marginBlock: 10, height: 40, justifyContent: "center", borderRadius: 10}}
        >
      <TouchableOpacity onPress={collapsePasseurs} style={styles.header}>
        <Text style={styles.title}>Meilleurs Passeurs</Text>
        <Animated.Image
            source={chevron}
            style={[styles.chevron, { transform: [{ rotate: rotatePasseursInterpolate }] }]}
          />     
           </TouchableOpacity>
      </LinearGradient>
        <Animated.View style={[styles.content, { height: heightPasseurs.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 555]  // Ajustez la hauteur en fonction du contenu
          }) }]}>
                    <View style={styles.barre}>
        <Text style={{width: "50%", color: "white", paddingStart: 20, fontFamily: "Kanitus"}}>Joueur</Text>
        <Text style={{width: "30%", color: "white", textAlign: "center", fontFamily: "Kanitus"}}>Matchs Joués</Text>
        <Text style={{width: "20%", color: "white", textAlign: "center", fontFamily: "Kanitus"}}>Passes D</Text>  
      </View>
        
        {passeurs.map((joueur) => 
      <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: joueur.player.id })}>
      <View style={styles.item}>
          <Image source={joueur.player.id === 217 ? martinez : joueur.player.id === 283026 ? biereth : joueur.player.id === 184 ? kane : joueur.player.id === 21393 ? guirassy : joueur.player.id === 116117 ? caicedo : joueur.player.id === 152953 ? collwill : joueur.player.id === 47380 ? cucurella : joueur.player.id === 19545 ? james : joueur.player.id === 5996 ? enzo : joueur.player.id === 63577 ? mudryk : joueur.player.id === 1864 ? neto : joueur.player.id === 136723 ? madueke : joueur.player.id === 283058 ? jackson :joueur.player.id === 284322 ? mainoo : joueur.player.id === 545 ? mazraoui : joueur.player.id === 532 ? deligt : joueur.player.id === 288006 ? hojlund : joueur.player.id === 70100 ? zirkzee : joueur.player.id === 157997 ? amad : joueur.player.id === 180496 ? mikautadze : joueur.player.id === 21509 ? marcus : joueur.player.id === 984 ? brandt : joueur.player.id === 158644 ? beier : joueur.player.id === 744 ? brahim : joueur.player.id === 1323 ? olmo : joueur.player.id === 133609 ? pedri : joueur.player.id === 161928 ? balde : joueur.player.id === 47311 ? merino : joueur.player.id === 313245 ? skelly : joueur.player.id === 49 ? partey : joueur.player.id === 2937 ? rice : joueur.player.id === 909 ? rashford : joueur.player.id === 19366 ? watkins : joueur.player.id === 249 ? malen : joueur.player.id === 746 ? ascencio : joueur.player.id === 19170 ? rogers : joueur.player.id === 1622 ? donarumma : joueur.player.id === 9 ? hakimi : joueur.player.id === 263482 ? nuno : joueur.player.id === 33 ? hernandez : joueur.player.id === 257 ? marquinhos : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 1946 ? trossard : joueur.player.id === 37127 ? odegard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }} style={{height: 35, width: "9%", borderRadius: 50, marginRight: 5}} />
        <Text style={{fontFamily: "Kanitt", width: "37%"}}>{joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
        <Image source={{ uri: joueur.statistics[0].team.logo }} style={styles.logo} />
        <Text style={{fontFamily: "Kanito", width: "35%", textAlign: "center"}}>{joueur.statistics[0].games.appearences}</Text>
        <Text style={{fontFamily: "Kanitt", width: "10%", textAlign:"center"}}>{joueur.statistics[0].goals.assists}</Text>

      </View>
    </TouchableOpacity>
)}
        </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  header: {
    paddingInline: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Kanitt",
    textAlign: "center",
    color: "white",

  },
  content: {
overflow: "hidden",
justifyContent: "center"
  },
  barre: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "black",
    paddingBlock: 4,
    borderRadius: 5,
    paddingStart: 2
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "100%",
    height: 52
  },
  logo: {
    width: "7%",
    height: 25,
    objectFit: "contain",
    marginRight: 4

  },
  list: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20,
  },
  groupe: {
    marginBlock: 6,
    borderRadius: 10
  }
});

export default Classement;