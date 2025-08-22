import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Animated, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import chevron from "../assets/chevron.png"
import { LinearGradient } from "expo-linear-gradient";

import haaland from "../assets/portraits/haaland.png"
import gyokeres from "../assets/portraits/gyokeres.png"
import zaire from "../assets/portraits/zaire.png"
import yamal from "../assets/portraits/yamal.jpg"
import dembele from "../assets/portraits/dembele.png"
import bellingham from "../assets/portraits/bellingham.png"
import barcola from "../assets/portraits/barcola.png"
import rodrygo from "../assets/portraits/rodrygo.jpg"
import guller from "../assets/portraits/guller.jpg"
import doue from "../assets/portraits/doue.png"
import kvara from "../assets/portraits/kvara.png"
import goat from "../assets/portraits/messi.webp"
import suarez from "../assets/portraits/suarez.png"
import darwin from "../assets/portraits/darwin.png"
import salah from "../assets/portraits/salah.png"
import kounde from "../assets/portraits/kounde.jpg"
import endrick from "../assets/portraits/endrick.jpg"
import mbappe from "../assets/portraits/mbappe.png"
import vini from "../assets/portraits/vini.png"
import palmer from "../assets/portraits/palmer.png"
import messi from "../assets/trophees/messi.jpg"
import griezmann from "../assets/portraits/griezmann.png"
import olise from "../assets/portraits/olise.png"
import cherki from "../assets/portraits/cherki.png"
import rabiot from "../assets/portraits/rabiot.png"
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
import tchouameni from "../assets/portraits/tchouameni.png"
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
import elanga from "../assets/portraits/elanga.png"
import wirtz from "../assets/portraits/wirtz.png"
import camavinga from "../assets/portraits/camavinga.jpg"
import modric from "../assets/portraits/modric.png"
import valverde from "../assets/portraits/valverde.png"
import rudiger from "../assets/portraits/rudiger.jpg"
import antony from "../assets/portraits/antony.jpg"
import isco from "../assets/portraits/isco.jpg"
import leao from "../assets/portraits/leao.png"
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
import mikautadze from "../assets/portraits/mikautadze.png"
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
import enzo from "../assets/portraits/fernandez.png"
import jackson from "../assets/portraits/jackson.png"
import caicedo from "../assets/portraits/caicedo.png"
import cristiano from "../assets/portraits/cristiano.png"
import mane from "../assets/portraits/mane.png"
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
import bruno from "../assets/portraits/bruno.png"
import nkunku from "../assets/portraits/nkunku.png"
import gusto from "../assets/portraits/gusto.png"
import delap from "../assets/portraits/delap.png"
import pedro from "../assets/portraits/pedro.png"
import benseghir from "../assets/portraits/benseghir.png"
import akliouche from "../assets/portraits/akliouche.png"
import greenwood from "../assets/portraits/greenwood.png"
import fermin from "../assets/portraits/fermin.png"
import blas from "../assets/portraits/blas.png"
import sekofofana from "../assets/portraits/sekofofana.png"
import pogba from "../assets/portraits/pogba.png"
import minamino from "../assets/portraits/minamino.png"
import fati from "../assets/portraits/fati.png"
import maupay from "../assets/portraits/maupay.png"
import gouiri from "../assets/portraits/gouiri.png"
import harit from "../assets/portraits/harit.png"
import aubameyang from "../assets/portraits/aubameyang.png"
import rowe from "../assets/portraits/rowe.png"
import ekitike from "../assets/portraits/ekitike.png"
import chiesa from "../assets/portraits/chiesa.png"
import maguire from "../assets/portraits/maguire.png"
import casemiro from "../assets/portraits/casemiro.png"
import mbeumo from "../assets/portraits/mbeumo.png"
import cunha from "../assets/portraits/cunha.png"
import dalot from "../assets/portraits/dalot.png"
import yoro from "../assets/portraits/yoro.png"
import mount from "../assets/portraits/mount.png"
import ruiz from "../assets/portraits/ruiz.png"
import lee from "../assets/portraits/lee.png"
import reijnders from "../assets/portraits/reijnders.png"
import lewis from "../assets/portraits/lewis.png"
import musiala from "../assets/portraits/musiala.png"
import davies from "../assets/portraits/davies.png"
import gnabry from "../assets/portraits/gnabry.png"

const playerImages = {
  340626: fermin,
  157: suarez,
  304: mane,
  874: cristiano,
  153430: elanga,
  343320: benseghir,
  274300: akliouche,
  1485: bruno,
  161948: delap,
  10329: pedro,
  269: nkunku,
  217: martinez,
  283026: biereth,
  184: kane,
  21393: guirassy,
  116117: caicedo,
  152953: collwill,
  47380: cucurella,
  19545: james,
  5996: enzo,
  63577: mudryk,
  1864: neto,
  136723: madueke,
  283058: jackson,
  284322: mainoo,
  545: mazraoui,
  532: deligt,
  288006: hojlund,
  70100: zirkzee,
  157997: amad,
  180496: mikautadze,
  21509: marcus,
  984: brandt,
  158644: beier,
  744: brahim,
  1323: olmo,
  133609: pedri,
  161928: balde,
  47311: merino,
  313245: skelly,
  49: partey,
  2937: rice,
  909: rashford,
  19366: watkins,
  249: malen,
  746: ascencio,
  19170: rogers,
  1622: donarumma,
  9: hakimi,
  263482: nuno,
  33: hernandez,
  257: marquinhos,
  6420: retegui,
  147859: deketelaere,
  18767: lookman,
  22090: saliba,
  1946: trossard,
  37127: odegard,
  1460: saka,
  372: militao,
  733: carvajal,
  51494: ugarte,
  2467: lisandro,
  1096: szoboszlai,
  180317: bradley,
  22236: leao,
  745: isco,
  9971: antony,
  2207: camavinga,
  756: valverde,
  754: modric,
  2285: rudiger,
  794: schik,
  203224: wirtz,
  6009: alvarez,
  8492: sorloth,
  307835: beraldo,
  262: kimpembe,
  396623: cubarsi,
  5: akanji,
  81573: marmoush,
  283: arnold,
  2489: diaz,
  6716: macallister,
  247: gakpo,
  409216: mayulu,
  629: debruyne,
  116: kephren,
  7334: adeyemi,
  21104: kolo,
  1271: tchouameni,
  2068: safonov,
  1100: haaland,
  161904: barcola,
  336657: zaire,
  153: dembele,
  129718: bellingham,
  386828: yamal,
  10009: rodrygo,
  18979: gyokeres,
  291964: guller,
  343027: doue,
  483: kvara,
  154: goat,
  306: salah,
  51617: darwin,
  1257: kounde,
  278: mbappe,
  377122: endrick,
  762: vini,
  152982: palmer,
  56: griezmann,
  19617: olise,
  272: rabiot,
  156477: cherki,
  1467: lacazette,
  47300: theo,
  1496: raphinha,
  521: lewandowski,
  2864: isak,
  41585: ramos,
  284324: garnacho,
  128384: vitinha,
  16367: pacho,
  335051: joao,
  21497: blas,
  30807: sekofofana,
  21497: blas,
              30807: sekofofana,
              180496: mikautadze,
              904: pogba,
              1101: minamino,
              135775: fati,
              1465: aubameyang,
              278095: rowe,
              19364: maupay,
              85041: gouiri,
              412: harit,
                897: greenwood,
                174565: ekitike,
                30410: chiesa,
                2935: maguire,
                  342970: yoro,
                  886: dalot,
                  19220: mount,
                  747: casemiro,
                20589: mbeumo,
                1165: cunha,
                328: ruiz,
                927: lee,
                36902: reijnders,
                284230: lewis,
                181812: musiala,
                        509: davies,
                        510: gnabry
                
};

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
    fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=${id === 71 || id === 253 || id === 2 || id === 3 || id === 848 || id === 200 || id === 202 || id === 186 ? 2024 : 2025}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) => setTab(id === 15 ? json.response[0].league.standings : json.response[0].league.standings[0]))

      .catch((error) => console.error("Error:", error));


  };

  console.log(tab)

  const fetchButeurs = () => {
    fetch(`https://v3.football.api-sports.io/players/topscorers?league=${id}&season=${id === 71 || id === 253 || id === 2 || id === 3 || id === 848 || id === 200 || id === 202 || id === 186 ? 2024 : 2025}`, {
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
    fetch(`https://v3.football.api-sports.io/players/topassists?league=${id}&season=${id === 71 || id === 253 || id === 2 || id === 3 || id === 848 || id === 200 || id === 202 || id === 186 ? 2024 : 2025}`, {
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
      duration: 250,
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
    }).start();
  };

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
    }).start();
  };

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


  const teamName = {
  "Germany": "Allemagne",
  "Spain": "Espagne",
  "Paris Saint Germain": "Paris St Germain",
  "Barcelona" : "FC Barcelone",
  "Borussia Dortmund" : "Dortmund",
  "Borussia Mönchengladbach" : "Mönchengladbach",
  "New York Red Bulls" : "New York RB",
  "Philadelphia Union" : "Philadelphia"
};

console.log(tab)

  if (id === 15) {
    return (
      <View style={styles.container}>
        {/* Classement */}
        <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
          style={{ marginBlock: 10, height: 40, justifyContent: "center", borderRadius: 10 }}
        >
          <TouchableOpacity onPress={collapseClassement} style={openClassement ? [styles.header, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }] : styles.header}>
            <Text style={styles.title}>Classement</Text>
            <Animated.Image
              source={chevron}
              style={[styles.chevron, { transform: [{ rotate: rotateClassementInterpolate }] }]}
            />      </TouchableOpacity>
        </LinearGradient>
        <Animated.View style={tab.length < 20 ? [styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1500] // Ajustez la hauteur en fonction du contenu
          })
        }] : tab.length < 24 ? [styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 980] // Ajustez la hauteur en fonction du contenu
          })
        }] : [styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1800] // Si le classement comporte + de 24 equipes
          })
        }]}>
          {tab.map((grp) =>
            <View style={styles.groupe}>
              <Text style={{ fontFamily: "Kanitt" }}>{grp[0].group}</Text>
              <View style={styles.barre}>
                <Text style={{ width: "10%", color: "white", fontFamily: "Kanitus" }}>Rang</Text>
                <Text style={{ width: "36%", textAlign: "center", marginRight: 2, color: "white", fontFamily: "Kanitus" }}>Equipe</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>J</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>V</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>N</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>D</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>GA</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>Pts</Text>
              </View>
              <View style={{ backgroundColor: "rgb(147, 147, 147)", borderRadius: 5, paddingBlock: 3 }}>
                {grp.map((equipe) =>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBlock: 4 }}>
                    <Text style={{ width: "6%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.rank}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("FicheEquipe", { id: equipe.team.id, league: equipe.group === "Ligue 1" ? 61 : equipe.group === "UEFA Champions League" ? 2 : equipe.group === "Premier League" ? 39 : equipe.group === "LaLiga" ? 140 : equipe.group.indexOf("Super League 1") !== -1 ? 197 : equipe.group === "Bundesliga" ? 78 : equipe.group === "Ligue 2: Regular Season" ? 62 : equipe.group === "Serie A" ? 135 : equipe.group === "UEFA Europa League" ? 3 : equipe.group === "Saudi League" ? 307 : equipe.group === "Eastern Conference" ? 253 : equipe.group === "Primeira Liga" ? 94 : equipe.description === "Promotion - FIFA Club World Cup (Play Offs: 1/8-finals)" ? 15 : equipe.group.indexOf("Group") != -1 ? 15 : null })} style={{ width: "38%", flexDirection: "row" }}>
                      <Image source={{ uri: equipe.team.logo }} style={{ objectFit: "contain", height: 20, width: "18%" }} />
                      <Text style={{ width: "82%", color: "white", fontFamily: "Kanito", textAlign: "center", fontSize: 13 }}>{equipe.team.name === "Paris Saint Germain" ? "Paris SG" : equipe.team.name === "Stade Brestois 29" ? "Stade Brestois" : equipe.team.name === "Barcelona" ? "FC Barcelone" : equipe.team.name}</Text>
                    </TouchableOpacity>
                    <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.played}</Text>
                    <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.win}</Text>
                    <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.draw}</Text>
                    <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.lose}</Text>
                    <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.goalsDiff}</Text>
                    <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.points}</Text>

                  </View>
                )}
              </View>
            </View>


          )}


        </Animated.View>


        {/* Meilleurs Buteurs */}

      </View>
    )
  }


  return (
    <View style={styles.container}>

      <View>
        <LinearGradient colors={['rgba(75, 75, 75, 1)', 'rgb(186, 186, 186)']}
          style={{ marginBlock: 0, height: 50, justifyContent: "center", borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: openClassement ? 0 : 10, borderBottomRightRadius: openClassement ? 0 : 10 }}
        >
          <TouchableOpacity onPress={collapseClassement} style={styles.header}>
            <Text style={styles.title}>Classement {tab[0]?.group}</Text>
            <Animated.Image source={chevron} style={[styles.chevron, { transform: [{ rotate: rotateClassementInterpolate }] }]} />
          </TouchableOpacity>
        </LinearGradient>
        <Animated.View style={tab.length < 18 ? [styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 840] // Ajustez la hauteur en fonction du contenu
          })
        }] : tab.length < 20 ? [styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1005] // Ajustez la hauteur en fonction du contenu
          })
        }] : tab.length < 22 ? [styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1125] // Ajustez la hauteur en fonction du contenu
          })
        }] : tab.length < 26 ? [styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1300] // Ajustez la hauteur en fonction du contenu
          })
        }] : [styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1980]
          })
        }]}>
          <LinearGradient colors={['rgb(186, 186, 186)', 'rgba(110, 110, 110, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} style={{ marginTop: 15, paddingInline: 2 }}>
            <View style={styles.barre}>
              <Text style={{ width: "10%", color: "white", fontFamily: "Kanitus" }}>Rang</Text>
              <Text style={{ width: "36%", textAlign: "center", marginRight: 2, color: "white", fontFamily: "Kanitus" }}>Equipe</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>J</Text>
              <Text style={{ width: "10%", color: "white", fontFamily: "Kanitus" }}>V</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>N</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>D</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>GA</Text>
              <Text style={{ width: "8%", color: "white", fontFamily: "Kanitus" }}>Pts</Text>
            </View>

            {tab.map((equipe) =>
              <TouchableOpacity onPress={() => navigation.navigate("FicheEquipe", { id: equipe.team.id, league: equipe.group === "Ligue 1" ? 61 : equipe.group === "UEFA Champions League" ? 2 : equipe.group === "Premier League" ? 39 : equipe.group === "LaLiga" ? 140 : equipe.group.indexOf("Super League 1") !== -1 ? 197 : equipe.group === "Bundesliga" ? 78 : equipe.group === "Ligue 2: Regular Season" ? 62 : equipe.group === "Serie A" ? 135 : equipe.group === "UEFA Europa League" ? 3 : equipe.group === "Saudi League" ? 307 : equipe.group === "Eastern Conference" ? 253 : equipe.group === "Primeira Liga" ? 94 : null })} style={{ flexDirection: "row", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, paddingBlock: 13.7 }}>
                <Text style={{ width: "6%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.rank}</Text>
                <Image source={{ uri: equipe.team.logo }} style={{ objectFit: "contain", height: 25, width: "8%" }} />
                <Text style={{ width: "30%", color: "white", fontFamily: "Kanito", textAlign: "center", fontSize: 13 }}>{teamName[equipe.team.name] || equipe.team.name}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.played}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.win}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.draw}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.lose}</Text>
                <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.goalsDiff}</Text>
                <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.points}</Text>
              </TouchableOpacity>

            )}
          </LinearGradient>
        </Animated.View>

      </View>

      <View>
        <LinearGradient
          colors={['rgba(84, 84, 84, 1)', 'rgba(224, 224, 224, 1)']}
          style={{ marginBlock: 0, height: 50, justifyContent: "center", borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: openButeurs ? 0 : 10, borderBottomRightRadius: openButeurs ? 0 : 10 }}
        >
          <TouchableOpacity onPress={collapseButeurs} style={styles.header}>
            <Text style={styles.title}>Buteurs</Text>
            <Animated.Image
              source={chevron}
              style={[styles.chevron, { transform: [{ rotate: rotateButeursInterpolate }] }]}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Animated.View style={[styles.content, {
          height: heightButeurs.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 556]  // Ajustez la hauteur en fonction du contenu
          })
        }]}>
          <LinearGradient colors={['#e0e0e0', '#a6a6a6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ marginTop: 5, paddingInline: 2 }}>

            <View style={styles.barre}>
              <Text style={{ width: "55%", color: "white", paddingStart: 20, fontFamily: "Kanitus", textAlign: "center" }}>Joueur</Text>
              <Text style={{ width: "28%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Matchs Joués</Text>
              <Text style={{ width: "17%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Buts</Text>

            </View>
            {buteurs.map((joueur) =>
              <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: joueur.player.id })}>
                <View style={styles.item}>
                  <Image source={playerImages[joueur.player.id] || { uri: joueur.player.photo }} style={{ height: 35, width: "9%", borderRadius: 50, marginRight: 5 }}/>
                  <Text style={{ fontFamily: "Kanitt", width: "37%" }}>{joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
                  <Image source={{ uri: joueur.statistics[0].team.logo }} style={styles.logo} />
                  <Text style={{ fontFamily: "Kanito", width: "35%", textAlign: "center" }}>{joueur.statistics[0].games.appearences}</Text>
                  <Text style={{ fontFamily: "Kanitt", width: "10%", textAlign: "center" }}>{joueur.statistics[0].goals.total}</Text>

                </View>
              </TouchableOpacity>
            )}
          </LinearGradient>

        </Animated.View>

      </View>

      <View>
        <LinearGradient
          colors={['rgba(84, 84, 84, 1)', 'rgba(224, 224, 224, 1)']}
          style={{ marginBlock: 0, height: 50, justifyContent: "center", borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: openPasseurs ? 0 : 10, borderBottomRightRadius: openPasseurs ? 0 : 10 }}
        >
          <TouchableOpacity onPress={collapsePasseurs} style={styles.header}>
            <Text style={styles.title}>Passeurs</Text>
            <Animated.Image
              source={chevron}
              style={[styles.chevron, { transform: [{ rotate: rotatePasseursInterpolate }] }]}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Animated.View style={[styles.content, {
          height: heightPasseurs.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 556]  // Ajustez la hauteur en fonction du contenu
          })
        }]}>
          <LinearGradient colors={['#d3d3d3', '#8e8e8e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ marginTop: 5, paddingInline: 2 }}>

            <View style={styles.barre}>
              <Text style={{ width: "55%", color: "white", paddingStart: 20, fontFamily: "Kanitus", textAlign: "center" }}>Joueur</Text>
              <Text style={{ width: "27%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Matchs Joués</Text>
              <Text style={{ width: "18%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Passes D</Text>
            </View>

            {passeurs.map((joueur) =>
              <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: joueur.player.id })}>
                <View style={styles.item}>
                  <Image source={playerImages[joueur.player.id] || { uri: joueur.player.photo }} style={{ height: 35, width: "9%", borderRadius: 50, marginRight: 5 }}/>
                  <Text style={{ fontFamily: "Kanitt", width: "37%" }}>{joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
                  <Image source={{ uri: joueur.statistics[0].team.logo }} style={styles.logo} />
                  <Text style={{ fontFamily: "Kanito", width: "35%", textAlign: "center" }}>{joueur.statistics[0].games.appearences}</Text>
                  <Text style={{ fontFamily: "Kanitt", width: "10%", textAlign: "center" }}>{joueur.statistics[0].goals.assists}</Text>

                </View>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    paddingBottom: 25,
    gap: 20

  },
  header: {
    paddingInline: 25,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10
  },
  title: {
    fontFamily: "Kanitt",
    textAlign: "center",
    color: "white",
    fontSize: 16

  },
  content: {
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: "rgb(186, 186, 186)",

  },
  barre: {
    flexDirection: "row",
    width: "102%",
    backgroundColor: "black",
    padding: 5,
    marginInlineStart: "-1%"
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "100%",
    height: 53
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