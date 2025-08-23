import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Pour récupérer les paramètres de la route
import redcard from "../assets/redcard.png";
import chevron from "../assets/chevron.png";
import { LinearGradient } from 'expo-linear-gradient';
import terrain from "../assets/terrain.png";
import goal from "../assets/goal.png"
import tacle from "../assets/tacle.png"
import target from "../assets/target.png"
import shoot from "../assets/shoot.png"
import shoe from "../assets/shoe.png"
import rating from "../assets/rating.png"
import gardien from "../assets/gardien.png"
import player from "../assets/player.png"
import yellow from "../assets/yellow.png"
import Precedent from '../components/Precedent';
import ligue1 from "../assets/logoligue1.webp"
import cdm from "../assets/trophees/cdm.png"
import ucl from "../assets/trophees/ucl.png"
import pl from "../assets/trophees/pl.png"
import copa from "../assets/trophees/copaamerica.png"
import europa from "../assets/trophees/europaleague.png"
import tropheeligue1 from "../assets/trophees/ligue1.png"
import newtropheeligue1 from "../assets/trophees/ligue11.webp"
import liga from "../assets/trophees/liga.png"
import bundesliga from "../assets/trophees/bundesliga.png"
import euro from "../assets/trophees/euro.png"
import uefa from "../assets/trophees/uefasupercup.png"
import seriea from "../assets/trophees/seriea.png"
import can from "../assets/trophees/can.png"
import nations from "../assets/trophees/nations.png"
import fifa from "../assets/trophees/fifa.png"
import haaland from "../assets/portraits/fiche/haaland.webp"
import gyokeres from "../assets/portraits/fiche/gyokeres.png"
import zaire from "../assets/portraits/fiche/zaire.png"
import yamal from "../assets/portraits/fiche/yamal.png"
import dembele from "../assets/portraits/fiche/dembele.png"
import bellingham from "../assets/portraits/fiche/bellingham.webp"
import barcola from "../assets/portraits/fiche/barcola.png"
import rodrygo from "../assets/portraits/fiche/rodrygo.webp"
import guller from "../assets/portraits/fiche/guller.webp"
import doue from "../assets/portraits/fiche/doue.png"
import kvara from "../assets/portraits/fiche/kvara.png"
import goat from "../assets/portraits/fiche/goat.png"
import guirassy from "../assets/portraits/fiche/guirassy.png"
import darwin from "../assets/portraits/fiche/darwin.webp"
import salah from "../assets/portraits/fiche/salah.webp"
import kounde from "../assets/portraits/fiche/kounde.webp"
import endrick from "../assets/portraits/fiche/endrick.webp"
import mbappe from "../assets/portraits/fiche/mbappe.png"
import vini from "../assets/portraits/fiche/vini.webp"
import palmer from "../assets/portraits/fiche/palmer.webp"
import messi from "../assets/trophees/messi.jpg"
import griezmann from "../assets/portraits/fiche/griezmann.png"
import cherki from "../assets/portraits/fiche/cherki.webp"
import rabiot from "../assets/portraits/fiche/rabiot.png"
import lacazette from "../assets/portraits/lacazette.jpg"
import theo from "../assets/portraits/theo.jpg"
import raphinha from "../assets/portraits/fiche/raphinha.png"
import lewandowski from "../assets/portraits/fiche/lewandowski.webp"
import isak from "../assets/portraits/isak.png"
import ramos from "../assets/portraits/fiche/ramos.png"
import garnacho from "../assets/portraits/fiche/garnacho.png"
import vitinha from "../assets/portraits/fiche/vitinha.png"
import pacho from "../assets/portraits/fiche/pacho.png"
import joao from "../assets/portraits/fiche/joao.png"
import safonov from "../assets/portraits/fiche/safonov.png"
import tchouameni from "../assets/portraits/fiche/tchouameni.webp"
import kolo from "../assets/portraits/kolo.png"
import kephren from "../assets/portraits/kephren.png"
import adeyemi from "../assets/portraits/fiche/adeyemi.png"
import mayulu from "../assets/portraits/fiche/mayulu.avif"
import diaz from "../assets/portraits/fiche/diaz.png"
import macallister from "../assets/portraits/fiche/macallister.webp"
import gravenberch from "../assets/portraits/fiche/gravenberch.webp"
import gakpo from "../assets/portraits/fiche/gakpo.webp"
import arnold from "../assets/portraits/fiche/arnold.webp"
import marmoush from "../assets/portraits/fiche/marmoush.webp"
import akanji from "../assets/portraits/fiche/akanji.webp"
import cubarsi from "../assets/portraits/fiche/cubarsi.webp"
import kimpembe from "../assets/portraits/fiche/kimpembe.png"
import leao from "../assets/portraits/fiche/leao.png"
import debruyne from "../assets/portraits/fiche/debruyne.png"
import beraldo from "../assets/portraits/beraldo.png"
import sorloth from "../assets/portraits/fiche/sorloth.png"
import alvarez from "../assets/portraits/fiche/alvarez.png"
import schik from "../assets/portraits/schik.png"
import wirtz from "../assets/portraits/fiche/wirtz.webp"
import camavinga from "../assets/portraits/fiche/camavinga.webp"
import modric from "../assets/portraits/fiche/modric.webp"
import valverde from "../assets/portraits/fiche/valverde.webp"
import rudiger from "../assets/portraits/fiche/rudiger.webp"
import fran from "../assets/portraits/fiche/fran.webp"
import antony from "../assets/portraits/fiche/antony.png"
import isco from "../assets/portraits/isco.jpg"
import carvajal from "../assets/portraits/fiche/carvajal.webp"
import militao from "../assets/portraits/fiche/militao.webp"
import ekitike from "../assets/portraits/fiche/ekitike.webp"
import ugarte from "../assets/portraits/ugarte.png"
import lisandro from "../assets/portraits/lisandro.png"
import szoboszlai from "../assets/portraits/fiche/szoboszlai.webp"
import chiesa from "../assets/portraits/fiche/chiesa.webp"

import kerkez from "../assets/portraits/fiche/kerkez.png"
import konate from "../assets/portraits/fiche/konate.png"
import vandijk from "../assets/portraits/fiche/vandijk.png"
import alisson from "../assets/portraits/fiche/alisson.png"
import frimpong from "../assets/portraits/fiche/frimpong.png"
import bradley from "../assets/portraits/fiche/bradley.webp"
import reijnders from "../assets/portraits/fiche/reijnders.webp"
import saka from "../assets/portraits/fiche/saka.png"
import trossard from "../assets/portraits/fiche/trossard.png"
import odegard from "../assets/portraits/fiche/odegaard.png"
import saliba from "../assets/portraits/fiche/saliba.png"
import lookman from "../assets/portraits/fiche/lookman.png"
import retegui from "../assets/portraits/fiche/retegui.png"
import pogba from "../assets/portraits/fiche/pogba.png"
import deketelaere from "../assets/portraits/fiche/deketelaere.png"
import donarumma from "../assets/portraits/fiche/donnarumma.png"
import nuno from "../assets/portraits/fiche/nuno.avif"
import hernandez from "../assets/portraits/fiche/hernandez.png"
import hakimi from "../assets/portraits/fiche/hakimi.avif"
import marquinhos from "../assets/portraits/fiche/marquinhos.avif"
import ruiz from "../assets/portraits/fiche/ruiz.png"
import greenwood from "../assets/portraits/fiche/greenwood.png"
import ascencio from "../assets/portraits/ascencio.png"
import watkins from "../assets/portraits/watkins.png"
import malen from "../assets/portraits/malen.png"
import rogers from "../assets/portraits/rogers.png"
import rice from "../assets/portraits/fiche/rice.png"
import raya from "../assets/portraits/fiche/raya.png"
import martinelli from "../assets/portraits/fiche/martinelli.png"
import white from "../assets/portraits/fiche/white.png"
import partey from "../assets/portraits/partey.png"
import skelly from "../assets/portraits/fiche/lewisskelly.png"
import merino from "../assets/portraits/merino.png"
import balde from "../assets/portraits/fiche/balde.webp"
import pedri from "../assets/portraits/fiche/pedri.webp"
import rashford from "../assets/portraits/fiche/rashford.webp"
import fermin from "../assets/portraits/fiche/fermin.webp"
import olmo from "../assets/portraits/fiche/olmo.webp"
import brahim from "../assets/portraits/fiche/brahim.webp"
import beier from "../assets/portraits/beier.png"
import brandt from "../assets/portraits/brandt.png"
import mmd from "../assets/portraits/mmd.png"
import touf from "../assets/portraits/touf.png"
import zirkzee from "../assets/portraits/zirkzee.png"
import hojlund from "../assets/portraits/fiche/hojlund.png"
import amad from "../assets/portraits/fiche/amad.png"
import mazraoui from "../assets/portraits/fiche/mazraoui.png"
import mainoo from "../assets/portraits/fiche/mainoo.png"
import deligt from "../assets/portraits/fiche/deligt.png"
import maguire from "../assets/portraits/fiche/maguire.png"
import casemiro from "../assets/portraits/fiche/casemiro.png"
import mbeumo from "../assets/portraits/fiche/mbeumo.png"
import cunha from "../assets/portraits/fiche/cunha.png"
import dalot from "../assets/portraits/fiche/dalot.png"
import yoro from "../assets/portraits/fiche/yoro.png"
import mount from "../assets/portraits/fiche/mount.png"
import simeone from "../assets/portraits/fiche/simeone.png"
import marcus from "../assets/portraits/fiche/thuram.png"
import sommer from "../assets/portraits/fiche/sommer.png"
import barella from "../assets/portraits/fiche/barella.png"
import dumfries from "../assets/portraits/fiche/dumfries.png"
import biereth from "../assets/portraits/fiche/biereth.png"
import akliouche from "../assets/portraits/fiche/akliouche.png"
import benseghir from "../assets/portraits/fiche/benseghir.png"
import bastoni from "../assets/portraits/fiche/bastoni.png"
import martinez from "../assets/portraits/fiche/martinez.png"
import gnabry from "../assets/portraits/fiche/gnabry.avif"
import kane from "../assets/portraits/fiche/kane.png"
import sane from "../assets/portraits/fiche/sane.png"
import olise from "../assets/portraits/fiche/olise.png"
import coman from "../assets/portraits/fiche/coman.png"
import musiala from "../assets/portraits/fiche/musiala.png"
import kimmich from "../assets/portraits/fiche/kimmich.png"
import goretzka from "../assets/portraits/fiche/goretzka.png"
import davies from "../assets/portraits/fiche/davies.png"
import kim from "../assets/portraits/fiche/kim.png"
import tah from "../assets/portraits/fiche/tah.png"
import neuer from "../assets/portraits/fiche/neuer.png"
import upamecano from "../assets/portraits/fiche/upamecano.png"
import caicedo from "../assets/portraits/fiche/caicedo.webp"
import jackson from "../assets/portraits/fiche/jackson.webp"
import foden from "../assets/portraits/fiche/foden.webp"
import fernandez from "../assets/portraits/fiche/fernandez.webp"
import cucurella from "../assets/portraits/fiche/cucurella.webp"
import fofana from "../assets/portraits/fiche/fofana.webp"
import james from "../assets/portraits/fiche/james.webp"
import madueke from "../assets/portraits/fiche/madueke.png"
import gabriel from "../assets/portraits/fiche/gabriel.png"
import zinchenko from "../assets/portraits/fiche/zinchenko.png"
import timber from "../assets/portraits/fiche/timber.png"
import rodri from "../assets/portraits/fiche/rodri.webp"
import ake from "../assets/portraits/fiche/ake.webp"
import huijsen from "../assets/portraits/fiche/huijsen.webp"
import neto from "../assets/portraits/fiche/neto.webp"
import doku from "../assets/portraits/fiche/doku.webp"
import suarez from "../assets/portraits/fiche/suarez.png"
import bruno from "../assets/portraits/fiche/bruno.png"
import conceicao from "../assets/portraits/fiche/conceicao.png"
import dimaria from "../assets/portraits/fiche/dimaria.png"
import neymar from "../assets/portraits/fiche/neymar.png"
import elanga from "../assets/portraits/fiche/elanga.png"
import chevalier from "../assets/portraits/fiche/chevalier.png"
import blas from "../assets/portraits/fiche/blas.png"
import sekofofana from "../assets/portraits/fiche/sekofofana.png"
import mikautadze from "../assets/portraits/fiche/mikautadze.png"
import minamino from "../assets/portraits/fiche/minamino.png"
import fati from "../assets/portraits/fiche/fati.png"
import aubameyang from "../assets/portraits/fiche/aubameyang.png"
import maupay from "../assets/portraits/fiche/maupay.png"
import gouiri from "../assets/portraits/fiche/gouiri.png"
import harit from "../assets/portraits/fiche/harit.png"
import rowe from "../assets/portraits/fiche/rowe.png"
import bernardo from "../assets/portraits/fiche/bernardo.webp"
import savinho from "../assets/portraits/fiche/savinho.webp"
import colwill from "../assets/portraits/fiche/colwill.webp"
import benzema from "../assets/portraits/fiche/benzema.webp"
import cristiano from "../assets/portraits/fiche/cristiano.webp"
import mane from "../assets/portraits/fiche/mane.webp"
import mudryk from "../assets/portraits/fiche/mudryk.webp"
import gusto from "../assets/portraits/fiche/gusto.webp"
import pedro from "../assets/portraits/fiche/pedro.webp"
import nkunku from "../assets/portraits/fiche/nkunku.webp"
import delap from "../assets/portraits/fiche/delap.webp"
import rubendias from "../assets/portraits/fiche/rubendias.webp"
import dembeleselec from "../assets/portraits/selection/dembouz.webp"
import doueselec from "../assets/portraits/selection/doue.png"
import barcolaselec from "../assets/portraits/selection/barcola.webp"
import cherkiselec from "../assets/portraits/selection/cherki.webp"
import theoselec from "../assets/portraits/selection/theo.png"
import mbappeselec from "../assets/portraits/selection/mbappe.webp"
import thuramselec from "../assets/portraits/selection/thuram.webp"
import oliseselec from "../assets/portraits/selection/olise.png"
import rabiotselec from "../assets/portraits/selection/rabiot.webp"
import lukasselec from "../assets/portraits/selection/lukas.webp"
import chevalierselec from "../assets/portraits/selection/chevalier.png"
import konateselec from "../assets/portraits/selection/konate.webp"
import guendouziselec from "../assets/portraits/selection/guendouzi.webp"
import zaireselec from "../assets/portraits/selection/zaire.webp"
import maignanselec from "../assets/portraits/selection/maignan.webp"
import tchouameniselec from "../assets/portraits/selection/tchouameni.webp"
import kolomuaniselec from "../assets/portraits/selection/kolomuani.webp"
import stones from "../assets/portraits/fiche/stones.webp"
import lewis from "../assets/portraits/fiche/lewis.webp"
import gvardiol from "../assets/portraits/fiche/gvardiol.webp"
import aitnouri from "../assets/portraits/fiche/aitnouri.webp"
import khusanov from "../assets/portraits/fiche/khusanov.webp"
import lee from "../assets/portraits/fiche/lee.png"
import boey from "../assets/portraits/fiche/boey.png"
import pavlovic from "../assets/portraits/fiche/pavlovic.png"

function FicheJoueur() {
  const [joueur, setJoueur] = useState(null);
  const [palmares, setPalmares] = useState(null);
  const [annee, setAnnee] = useState(2024)
  const [opaque, setOpaque] = useState(false)
  const [opaque2, setOpaque2] = useState(true)


  const [openPalmares, setOpenPalmares] = useState(false);

  const route = useRoute();
  const { id, team } = route.params; // Utilisation des paramètres de route dans React Native
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0)); // Pour la rotation de l'icône
  const [heightAnim, setHeightAnim] = useState(new Animated.Value(0)); // Pour la hauteur du palmarès

  const [rotateSeason, setRotateSeason] = useState(new Animated.Value(0));


  const collapsePalmares = () => {
    setOpenPalmares(!openPalmares);

    Animated.timing(rotateValue, {
      toValue: openPalmares ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animer la hauteur du palmarès
    Animated.timing(heightAnim, {
      toValue: openPalmares ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/trophies?player=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((result) => setPalmares(result.response))
      .catch((error) => { console.error(error) });
  }, [id]);

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/players?id=${id}&season=${annee}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((result) => setJoueur(result.response[0]))
      .catch((error) => { console.error(error) });
  }, [id, annee]);

  console.log(joueur)


/*
  const prec = () => {
    if (annee > 2025 - 3) {
      setAnnee((prev) => prev - 1)
    }
    if (annee === 2023) {
      setOpaque(true)
    }
    if (annee === 2025) {
      setOpaque2(false)
    }

    Animated.timing(rotateSeason, {
      toValue: 1, // Valeur cible de la rotation
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Réinitialiser la valeur de la rotation à 0 après l'animation
      rotateSeason.setValue(0);
    });

  }

  const next = () => {
    if (annee < 2025) {
      setAnnee((next) => next + 1)
    }
    if (annee === 2022) {
      setOpaque(false)
    }
    if (annee === 2024) {
      setOpaque2(true)
    }

    Animated.timing(rotateSeason, {
      toValue: 1, // Valeur cible de la rotation
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Réinitialiser la valeur de la rotation à 0 après l'animation
      rotateSeason.setValue(0);
    });

  }
*/

const prec = () => {
    if (annee > 2024 - 3) {
      setAnnee((prev) => prev - 1)
    }
    if (annee === 2022) {
      setOpaque(true)
    }
    if (annee === 2024) {
      setOpaque2(false)
    }

    Animated.timing(rotateSeason, {
      toValue: 1, // Valeur cible de la rotation
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Réinitialiser la valeur de la rotation à 0 après l'animation
      rotateSeason.setValue(0);
    });

  }

  const next = () => {
    if (annee < 2024) {
      setAnnee((next) => next + 1)
    }
    if (annee === 2021) {
      setOpaque(false)
    }
    if (annee === 2023) {
      setOpaque2(true)
    }

    Animated.timing(rotateSeason, {
      toValue: 1, // Valeur cible de la rotation
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Réinitialiser la valeur de la rotation à 0 après l'animation
      rotateSeason.setValue(0);
    });

  }

  if (!joueur || !palmares) {
    return <View>
      <Precedent />
      <Text style={{ textAlign: "center", marginTop: 100, fontFamily: "Kanitt", fontSize: 14 }}>Aucune Donnée dispo</Text>;
    </View>
  }

  const totalGoals = joueur?.statistics.reduce((acc, stat) => {
    if (stat.league.name !== 'Copa America' && stat.league.name !== "Euro Championship") {
      acc += stat.goals.total;
    }
    return acc;
  }, 0);

  const totalPasses = joueur?.statistics.reduce((acc, stat) => {
    if (stat.league.name !== 'Copa America' && stat.league.name !== "Euro Championship") {
      acc += stat.goals.assists;
    }
    return acc;
  }, 0);

  const totalMatchs = joueur?.statistics.reduce((acc, stat) => {
    if (stat.league.name !== 'Copa America' && stat.league.name !== "Euro Championship") {
      acc += stat.games.appearences;
    }
    return acc;
  }, 0);

  console.log(totalGoals)
  console.log(totalPasses)

console.log(team)


  const teamNames = joueur?.statistics.map((element) => element.team.name);
  const uniqueTeamNames = joueur?.statistics.reduce((acc, element) => {
    if (!acc.includes(element.team.logo) && element.games.minutes > 0) {
      acc.push(element.team.logo);
    }
    return acc;
  }, []);

  console.log(uniqueTeamNames)

  const date = new Date(joueur?.player.birth.date);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const trophees = palmares?.filter((element) => element.place === "Winner");

  const trophies = trophees.reduce((acc, trophy) => {
    if (!acc[trophy.league]) {
      acc[trophy.league] = [];
    }
    acc[trophy.league].push(trophy);
    return acc;
  }, {});

  const trophiesArray = Object.entries(trophies).map(([league, trophies, season]) => ({
    league,
    trophies,
  }));

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rotateSeasonInterpolate = rotateSeason.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  console.log(trophiesArray)

  const photosJoueurs = {
  152654: frimpong,
  290: vandijk,
  1145: konate,
  206254: kerkez,
  280: alisson,
  340626: fermin,
  19959: white,
  127769: martinelli,
  19465: raya,
  542: gravenberch,
  174565: ekitike,
  1149: upamecano,
  497: neuer,
  972: tah,
  21138: aitnouri,
  567: rubendias,
  284230: lewis,
  129033: gvardiol,
  626: stones,
  304: mane,
  874: cristiano,
  759: benzema,
  897: greenwood,
  153430: elanga,
  736: fran,
  343320: benseghir,
  274300: akliouche,
  283026: biereth,
  63577: mudryk,
  10329: pedro,
  161948: delap,
  161907: gusto,
  269: nkunku,
  1485: bruno,
  21393: guirassy,
  2897: kim,
  509: davies,
  502: kimmich,
  511: goretzka,
  1864: neto,
  152953: colwill,
  266657: savinho,
  323935: simeone,
  631: foden,
  36902: reijnders,
  161585: conceicao,
  266: dimaria,
  18861: ake,
  361497: huijsen,
  157: suarez,
  1422: doku,
  636: bernardo,
  44: rodri,
  116117: caicedo,
  136723: madueke,
  283058: jackson,
  5996: fernandez,
  22094: fofana,
  19545: james,
  47380: cucurella,
  284322: mainoo,
  545: mazraoui,
  532: deligt,
  288006: hojlund,
  70100: zirkzee,
  157997: amad,
  184: kane,
  180496: mikautadze,
  21509: marcus,
  15906: touf,
  37784: mmd,
  984: brandt,
  158644: beier,
  744: brahim,
  161928: balde,
  1323: olmo,
  133609: pedri,
  47311: merino,
  313245: skelly,
  49: partey,
  2937: rice,
  2802: sommer,
  909: rashford,
  19366: watkins,
  249: malen,
  746: ascencio,
  19170: rogers,
  263482: nuno,
  33: hernandez,
  257: marquinhos,
  9: hakimi,
  1622: donarumma,
  328: ruiz,
  508: coman,
  181812: musiala,
  644: sane,
  6420: retegui,
  147859: deketelaere,
  18767: lookman,
  22090: saliba,
  37127: odegard,
  1946: trossard,
  1460: saka,
  372: militao,
  733: carvajal,
  51494: ugarte,
  2467: lisandro,
  1096: szoboszlai,
  180317: bradley,
  22236: leao,
  226: dumfries,
  31009: bastoni,
  217: martinez,
  30558: barella,
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
  510: gnabry,
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
  276: neymar,
  38746: timber,
  22224: gabriel,
  641: zinchenko,
  162453: chevalier,
  360114: khusanov,
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
  30410: chiesa,
  2935: maguire,
  342970: yoro,
  886: dalot,
  19220: mount,
  747: casemiro,
20589: mbeumo,
1165: cunha,
927: lee,
2195: boey,
328033: pavlovic



};


  return (
    <View>
      <Precedent />
      <ScrollView contentContainerStyle={styles.blocJoueur}>
        <View style={styles.article}>
          <LinearGradient colors={["black", "steelblue"]} style={styles.infosJoueur}>
{team === 2 ? 
            <Image source={
              
               joueur.player.id === 336657 ? zaireselec : joueur.player.id === 1145 ? konateselec : joueur.player.id === 1454 ? guendouziselec : joueur.player.id === 162453 ? chevalierselec :joueur.player.id === 21104 ? kolomuaniselec : joueur.player.id === 22221 ? maignanselec : joueur.player.id === 1271 ? tchouameniselec : joueur.player.id === 33 ? lukasselec : joueur.player.id === 272 ? rabiotselec : joueur.player.id === 21509 ? thuramselec : joueur.player.id === 278 ? mbappeselec : joueur.player.id === 153 ? dembeleselec : joueur.player.id === 343027 ? doueselec : joueur.player.id === 19617 ? oliseselec : joueur.player.id === 47300 ? theoselec : joueur.player.id === 161904 ? barcolaselec : joueur.player.id === 156477 ? cherkiselec : {uri: joueur.player.photo}}
              style={{height: "190", width: "35%"}}/>
               :
              <Image
  source={photosJoueurs[joueur.player.id] || { uri: joueur.player.photo }}
  style={
                
             joueur.player.id === 904 || joueur.player.id === 276 || joueur.player.id === 340626 || joueur.player.id === 340626 || joueur.player.id === 542 || joueur.player.id === 542 || joueur.player.id === 153 || joueur.player.id === 153 || joueur.player.id === 567 || joueur.player.id === 63577 || joueur.player.id === 247 || joueur.player.id === 1864 || joueur.player.id === 152953 || joueur.player.id === 7334 || joueur.player.id === 336657 || joueur.player.id === 386828 || joueur.player.id === 1257 || joueur.player.id === 1323 || joueur.player.id === 9971 || joueur.player.id === 133609 || joueur.player.id === 521 || joueur.player.id === 396623 || joueur.player.id === 1496 || joueur.player.id === 263482 || joueur.player.id === 306 || joueur.player.id === 51617 || joueur.player.id === 6716 || joueur.player.id === 1096 || joueur.player.id === 180317 || joueur.player.id === 147859 || joueur.player.id === 278 || joueur.player.id === 483 ? { height: 230, width: "39%"}:
              joueur.player.id === 22236 || joueur.player.id === 18861 || joueur.player.id === 409216 || joueur.player.id === 154 || joueur.player.id === 1622 || joueur.player.id === 128384  ? { height: "100%", width: "46%", marginRight: -30} :
          joueur.player.id === 328033 || joueur.player.id === 2195 || joueur.player.id === 2897 || joueur.player.id === 2489 || joueur.player.id === 545 || joueur.player.id === 532 || joueur.player.id === 288006 || joueur.player.id === 70100 || joueur.player.id === 2935 || joueur.player.id === 342970 || joueur.player.id === 1165 || joueur.player.id === 19220 || joueur.player.id === 886 || joueur.player.id === 747 || joueur.player.id === 272 || joueur.player.id === 135775 || joueur.player.id === 1101 || joueur.player.id === 180496 || joueur.player.id === 30807 || joueur.player.id === 21497 || joueur.player.id === 641 || joueur.player.id === 38746 || joueur.player.id === 22224 || joueur.player.id === 18979 || joueur.player.id === 152654 || joueur.player.id === 290 || joueur.player.id === 1145 || joueur.player.id === 206254 || joueur.player.id === 280 || joueur.player.id === 909 || joueur.player.id === 19959 || joueur.player.id === 127769 || joueur.player.id === 19465 || joueur.player.id === 2937 || joueur.player.id === 1946 || joueur.player.id === 22090 || joueur.player.id === 1149 || joueur.player.id === 497 || joueur.player.id === 972 || joueur.player.id === 21138 || joueur.player.id === 129033 || joueur.player.id === 284230 || joueur.player.id === 626 || joueur.player.id === 153430 || joueur.player.id === 508 || joueur.player.id === 181812 || joueur.player.id === 6420 || joueur.player.id === 510 || joueur.player.id === 184 || joueur.player.id === 19617 || joueur.player.id === 161928 || joueur.player.id === 372 || joueur.player.id === 291964 || joueur.player.id === 511 || joueur.player.id === 502 || joueur.player.id === 509 || joueur.player.id === 323935 || joueur.player.id === 631 || joueur.player.id === 36902 || joueur.player.id === 156477 || joueur.player.id === 161585 || joueur.player.id === 266 ||  joueur.player.id === 2068 || joueur.player.id === 6009 || joueur.player.id === 8492 || joueur.player.id === 56 || joueur.player.id === 744 || joueur.player.id === 1271 || joueur.player.id === 283 || joueur.player.id === 361497 || joueur.player.id === 9 ||  joueur.player.id === 41585 || joueur.player.id === 161904 || joueur.player.id === 33 || joueur.player.id === 257 || joueur.player.id === 16367 || joueur.player.id === 21509 || joueur.player.id === 2802 || joueur.player.id === 31009 || joueur.player.id === 30558 || joueur.player.id === 226 || joueur.player.id === 81573 || joueur.player.id === 5  ? {height: "100%", width: "40%", marginRight: -20} :
             joueur.player.id === 343027 || joueur.player.id === 927 || joueur.player.id === 284322 || joueur.player.id === 20589 || joueur.player.id === 157997 || joueur.player.id === 30410 || joueur.player.id === 1465 || joueur.player.id === 278095 || joueur.player.id === 19364 || joueur.player.id === 85041 || joueur.player.id === 412 || joueur.player.id === 360114 || joueur.player.id === 162453 || joueur.player.id === 313245 || joueur.player.id === 629 || joueur.player.id === 174565 || joueur.player.id === 136723 || joueur.player.id === 304 || joueur.player.id === 874 || joueur.player.id === 759 || joueur.player.id === 1460 || joueur.player.id === 37127 || joueur.player.id === 1100 || joueur.player.id === 897 || joueur.player.id === 203224 || joueur.player.id === 736 || joueur.player.id === 274300 || joueur.player.id === 343320 || joueur.player.id === 283026 || joueur.player.id === 10329 || joueur.player.id === 161948 || joueur.player.id === 161907 || joueur.player.id === 1485 || joueur.player.id === 284324 || joueur.player.id === 266657 || joueur.player.id === 335051 || joueur.player.id === 157 || joueur.player.id === 262 || joueur.player.id === 1422 || joueur.player.id === 636 || joueur.player.id === 44 || joueur.player.id === 762 || joueur.player.id === 129718 || joueur.player.id === 10009 || joueur.player.id === 756 || joueur.player.id === 2207 || joueur.player.id === 377122 || joueur.player.id === 754 || joueur.player.id === 2285 || joueur.player.id === 733 || joueur.player.id === 328 || joueur.player.id === 217 || joueur.player.id === 18767 || joueur.player.id === 644 || joueur.player.id === 47380 || joueur.player.id === 22094 || joueur.player.id === 152982 || joueur.player.id === 283058 || joueur.player.id === 5996 || joueur.player.id === 19545 || joueur.player.id === 116117 ? {height: "105%", width: "43%", marginRight: -20, objectFit: "contain"} :
               joueur.player.id === 269 || joueur.player.id === 21393 ? {height: "125%", width: "44%", objectFit: "contain", marginLeft: -10}
                : styles.photo}
                 />
              }
            
            <View style={styles.bio}>
              <Text style={styles.name}>{joueur.player.id === 15906 ? "Toufik Chemakh" : joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
             <View style={{ width: "100%", flexDirection: "column", alignItems: "center"}}> <Text style={styles.infoText}>Né le {joueur.player.id === 37784 ? "31/03/1999" : formattedDate}</Text><View style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontFamily: "Kanitalic", color: "white"}}> à {joueur.player.id === 37784 || joueur.player.id === 15906 ? "Paris" : joueur.player.birth.place},</Text><Text style={{fontFamily: "Kanitalik", color: "white", fontSize: 15}}> {joueur.player.id === 37784 || joueur.player.id === 15906 ? "France" : joueur.player.birth.country === "Spain" ? "Espagne" : joueur.player.birth.country === "Netherlands" ? "Pays-Bas" : joueur.player.birth.country === "Belgium" ? "Belgique" : joueur.player.birth.country === "Brazil" ? "Bresil" : joueur.player.birth.country === "England" ? "Angleterre" : joueur.player.birth.country === "Türkiye" ? "Turquie" : joueur.player.birth.country === "Switzerland" ? "Suisse" : joueur.player.birth.country === "Germany" ? "Allemagne" : joueur.player.birth.country}</Text></View></View>
              <View style={{flexDirection: "row"}}><Text style={{fontFamily: "Kanitalik", color: "white"}}> { joueur.player.id === 37784 ? "180cm" : joueur.player.height} - {joueur.player.id === 37784 ? "70kg" :joueur.player.weight}</Text></View>
              <Text style={styles.infoText}>Poste: {joueur.statistics[0].games.position === "Midfielder" ? "Milieu" : joueur.statistics[0].games.position === "Attacker" ? "Attaquant" : joueur.statistics[0].games.position === "Defender" ? "Defenseur" : joueur.statistics[0].games.position === "Goalkeeper" ? "Gardien" : joueur.statistics[0].games.position}</Text>
              <View style={styles.logos}>
                {uniqueTeamNames.map((logo, index) => (logo === "https://media.api-sports.io/football/teams/10179.png" || logo === 'https://media.api-sports.io/football/teams/9256.png' || logo === 'https://media.api-sports.io/football/teams/8216.png' || logo === 'https://media.api-sports.io/football/teams/8190.png' || logo === 'https://media.api-sports.io/football/teams/12520.png' || logo === 'https://media.api-sports.io/football/teams/712.png' || logo === 'https://media.api-sports.io/football/teams/8194.png' ? null : logo === "https://media.api-sports.io/football/teams/10334.png" ? null : logo === "https://media.api-sports.io/football/teams/16621.png" ? null : logo === "https://media.api-sports.io/football/teams/10187.png" ? null :
                  <Image key={`logo-${index}`} source={{ uri: logo }} style={styles.logo} />
                ))}
              </View>
            </View>
          </LinearGradient>

          <View style={styles.palmares}>
            <TouchableOpacity onPress={collapsePalmares}>
              <LinearGradient colors={["black", "steelblue"]} style={styles.palmaresTitle} >
                <Text style={styles.palmaresText}>Palmarès</Text>
                <Animated.Image
                  source={chevron}
                  style={[styles.chevron, { transform: [{ rotate: rotateInterpolate }] }]}
                />
              </LinearGradient>
            </TouchableOpacity>

            {palmares.length > 22 ?
              joueur.player.id === 154 ? <Animated.View style={[styles.palmaresInfos, {
                height: heightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 280]  // Ajustez la hauteur en fonction du contenu
                })
              }]}>
                <Image source={messi} style={{ objectFit: "contain", width: "100%" }} />
              </Animated.View> :
                <Animated.View style={[styles.palmaresInfos, {
                  height: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 380]  // Ajustez la hauteur en fonction du contenu
                  })
                }]}>
                  <View style={{ width: "55%" }} >
                    {trophiesArray.map((element, index) => (
                      element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                        <Text key={"trophee" + element.league + element.season} style={{ fontFamily: "Kanito", marginInline: 10, marginBlock: 2 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                    ))}
                  </View>
                  <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.trophies[0].season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.trophies[0].season === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                  </View>

                </Animated.View> :
              palmares.length < 12 ? <Animated.View style={[styles.palmaresInfos, {
                height: heightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 190]  // Ajustez la hauteur en fonction du contenu
                })
              }]}>
                <View style={{ width: "55%" }}>
                  {trophiesArray.map((element, index) => (
                        element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                      <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                  ))}
                </View>
                <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.trophies[0].season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.trophies[0].season === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                </View>

              </Animated.View> :
                palmares.length <= 7 ? <Animated.View style={[styles.palmaresInfos, {
                  height: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 120]  // Ajustez la hauteur en fonction du contenu
                  })
                }]}>
                  <View style={{ width: "55%" }}>
                    {trophiesArray.map((element, index) => (
                        element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                        <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                    ))}
                  </View>
                  <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.trophies[0].season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.trophies[0].season === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                  </View>

                </Animated.View> :
                  <Animated.View style={[styles.palmaresInfos, {
                    height: heightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 240]  // Ajustez la hauteur en fonction du contenu
                    })
                  }]}>
                    <View style={{ width: "55%" }} >
                      {trophiesArray.map((element, index) => (
                        element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                          <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                      ))}
                    </View>
                    <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.trophies[0].season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.trophies[0].season === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                    </View>

                  </Animated.View>
            }
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            {opaque === true ? <TouchableOpacity style={{ opacity: 0.2, marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24, fontFamily: "Kanitt" }}>{"<"}</Text></TouchableOpacity> : <TouchableOpacity onPress={prec} style={{ marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24, fontFamily: "Kanitt" }}>{"<"}</Text></TouchableOpacity>}
            <Animated.Text style={[styles.season, { transform: [{ rotate: rotateSeasonInterpolate }] }]}>{annee}/{annee + 1}</Animated.Text>
            {opaque2 === true ? <TouchableOpacity style={{ opacity: 0.2, marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24, fontFamily: "Kanitt" }}>{">"}</Text></TouchableOpacity> : <TouchableOpacity onPress={next} style={{ marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24, fontFamily: "Kanitt" }}>{">"}</Text></TouchableOpacity>}
          </View>

          <View style={{ width: "70%", gap: 20, marginBlock: 15, flexDirection: "row", justifyContent: "space-evenly" }}>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "rgb(8, 4, 82)", borderRadius: 50, width: 45, height: 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: 18 }}>{totalMatchs}</Text></View>
              <Text style={styles.h5}>Matchs Joués</Text>
            </View>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "steelblue", borderRadius: 50, width: 45, height: 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: 18 }}>{totalGoals}</Text></View>
              <Text style={[styles.h5, {color: "steelblue"}]}>Buts</Text>
            </View>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "steelblue", borderRadius: 50, width: 45, height: 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: 18 }}>{totalPasses}</Text></View>
              <Text style={[styles.h5, {color: "steelblue"}]}>Passes Dec</Text>
            </View>
          </View>

          <View style={styles.stats}>
            {joueur.statistics.map((element, index) => (
              <View key={index} style={styles.statBlock}>
                {element.games.minutes > 0 ? 
                  <View>
                    <LinearGradient colors={["rgba(56, 103, 142, 1)", "rgba(203, 217, 228, 1)"]}  style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                      <Text style={styles.leagueName}>{element.league.name === "Friendlies" ? "Amicaux" : element.league.name}</Text>
                    </LinearGradient>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginInline: 10 }}>
                      <View style={styles.statList}>
                        <View style={styles.ligne}>
                          <Image source={terrain} style={styles.icone} />
                          <Text style={styles.cle}>Matchs joués: </Text><Text style={styles.valeur}> {element.games.appearences}</Text>
                        </View>
                        {joueur.statistics[0].games.position === "Goalkeeper" ? 
                        <View style={styles.ligne}>
                          <Image source={gardien} style={styles.icone} />
                          <Text style={styles.cle}>Arrets:</Text><Text style={styles.valeur}> {element.goals.saves === null ? 0 : element.goals.saves}</Text>
                        </View> : null}
                        <View style={styles.ligne}>
                          <Image source={goal} style={styles.icone} />
                          <Text style={styles.cle}>Buts: </Text><Text style={styles.valeur}>{element.goals.total}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={target} style={styles.icone} />
                          <Text style={styles.cle}>Passes Dec: </Text><Text style={styles.valeur}> {element.goals.assists === null ? 0 : element.goals.assists}</Text>
                        </View>
                       {joueur.statistics[0].games.position === "Goalkeeper" ? null : <View style={styles.ligne}>
                          <Image source={shoot} style={styles.icone} />
                          <Text style={styles.cle}>Tirs (cadrés): </Text><Text style={styles.valeur}> {element.shots.total} ({element.shots.on === null ? 0 : element.shots.on})</Text>
                        </View>}
                        <View style={styles.ligne}>
                          <Image source={shoe} style={styles.icone} />
                          <Text style={styles.cle}>Passes:</Text><Text style={styles.valeur}> {element.passes.total === null ? 0 : element.passes.total}</Text>
                        </View>
{joueur.statistics[0].games.position === "Defender" ? 
                        <View style={styles.ligne}>
                          <Image source={tacle} style={styles.icone} />
                          <Text style={styles.cle}>Tacles:</Text><Text style={styles.valeur}> {element.tackles.total === null ? 0 : element.tackles.total}</Text>
                        </View> : null}
                        {joueur.statistics[0].games.position === "Goalkeeper" ? null : <View style={styles.ligne}>
                          <Image source={player} style={styles.icone} />
                          <Text style={styles.cle}>Dribbles Tentés (Réussis): </Text><Text style={styles.valeur}> {element.dribbles.attempts} ({element.dribbles.success === null ? 0 : element.dribbles.success})</Text>
                        </View>}
                        <View style={styles.ligne}>
                          <Image source={rating} style={styles.icone} />
                          <Text style={styles.cle}>Note moyenne: </Text><Text style={styles.valeur}> {element.games.rating ? element.games.rating.slice(0, 4) : "-"}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={yellow} style={{ height: 25, width: 25, marginRight: 8, shadowColor: "black", shadowOffset: { width: -1, height: 0 }, shadowOpacity: 0.9 }} />
                          <Text style={styles.cle}>Cartons jaune: </Text><Text style={styles.valeur}> {element.cards.yellow}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={redcard} style={styles.icone} />
                          <Text style={styles.cle}>Cartons Rouge: </Text><Text style={styles.valeur}> {element.cards.red}</Text>
                        </View>
                      </View>
                      {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image source={ligue1} style={styles.logoCompet} /> : <Image source={{ uri: element.league.logo }} style={styles.logoCompet} />}
                    </View>
                  </View>
                  : null
                }
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  blocJoueur: {
    flexDirection: 'column',
    width: '98%',
    alignItems: 'center',
    margin: '1%',
    marginTop: 65,
    paddingBottom: 100,
  },
  article: {
    flexDirection: 'column',
    width: '98%',
    alignItems: "center",
  },
  infosJoueur: {
    borderRadius: 15,
    flexDirection: 'row',
    padding: 12,
    width: '100%',
    color: 'white',
    marginBottom: 10,
  },

  photo: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  bio: {
    flexDirection: 'column',
    marginLeft: 6,
    gap: 4,
    alignItems: "center",
    width: "65%"
 },
  name: {
    fontSize: 19,
    color: 'white',
    fontFamily: "Permanent"
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    fontFamily: "Kanito",
    textAlign: "center"
  },
  logos: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 30
  },
  logo: {
    height: 40,
    width: 40,
    marginLeft: 5,
    objectFit: "contain"
  },
  palmares: {
    marginBottom: 20,
    width: '100%',
  },
  palmaresTitle: {
    backgroundColor: '#4682b4',
    color: 'white',
    paddingBlock: 5,
    paddingInline: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  palmaresText: {
    fontSize: 16,
    color: 'white',
    fontFamily: "Permanent",


  },
  chevron: {
    position: "relative",
    left: 120
  },

  palmaresInfos: {
    marginTop: 10,
    flexDirection: "row",
    overflow: "hidden",
    width: "100%",
    alignItems: "center"
  },

  season: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Kanito"
  },
  stats: {
    width: '100%',
  },
  statBlock: {
        backgroundColor: 'rgba(203, 217, 228, 1)',
        borderRadius: 15,
        marginTop: 20

  },
  leagueName: {
    fontSize: 16,
    fontFamily: "Permanent",
    textAlign: "center",
    color: "white",
    marginBlockStart: 7,
    marginBlockEnd: 18
  },
  statList: {
    marginTop: 10,
  },
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    marginBlock: 6
  },
  logoCompet: {
    height: 70,
    width: 70,
    marginTop: 10,
    objectFit: "contain"
  },
  icone: {
    height: 25,
    width: 25,
    marginRight: 8
  },
  trophee: {
    height: 74,
    width: 74,
    objectFit: "contain",
    overflow: "hidden",
    shadowColor: '#000', // shadow color
    shadowOffset: { width: -3, height: -3 }, // shadow offset
    shadowOpacity: 0.3, // shadow opacity
    shadowRadius: 3,
    padding: 7,
    margin: 2,
    elevation: 5



  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
  armoire: {
    flexDirection: "row",
    justifyContent: "center",
    width: "45%",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBlock: 6
  },
  cle: {
    fontFamily: "Kanito",
    fontSize: 14,
    color: "rgb(8, 4, 82)"
  },
  valeur: {
    fontFamily: "Kanitt",
    fontSize: 16,
    color: "rgb(8, 4, 82)"
  },
  stat: {
    alignItems: "center"
  },
  h5: {
    fontFamily: "Kanitalik",
    color: "rgb(8, 4, 82)",
  }
});

export default FicheJoueur;