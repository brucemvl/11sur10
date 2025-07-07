import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Pour récupérer les paramètres de la route
import redcard from "../assets/redcard.png";
import chevron from "../assets/chevron.png";
import { LinearGradient } from 'expo-linear-gradient';
import player from "../assets/player.png";
import goal from "../assets/goal.png"
import tacle from "../assets/tacle.png"
import target from "../assets/target.png"
import shoot from "../assets/shoot.png"
import shoe from "../assets/shoe.png"
import rating from "../assets/rating.png"
import gardien from "../assets/gardien.png"
import yellow from "../assets/yellow.png"
import Precedent from '../components/Precedent';
import ligue1 from "../assets/logoligue1.webp"
import cdm from "../assets/trophees/cdm.png"
import ucl from "../assets/trophees/ucl.png"
import pl from "../assets/trophees/pl.png"
import copa from "../assets/trophees/copaamerica.png"
import europa from "../assets/trophees/europaleague.png"
import tropheeligue1 from "../assets/trophees/ligue1.png"
import liga from "../assets/trophees/liga.png"
import bundesliga from "../assets/trophees/bundesliga.png"
import euro from "../assets/trophees/euro.png"
import uefa from "../assets/trophees/uefasupercup.png"
import seriea from "../assets/trophees/seriea.png"
import can from "../assets/trophees/can.png"
import nations from "../assets/trophees/nations.png"
import fifa from "../assets/trophees/fifa.png"
import haaland from "../assets/portraits/fiche/haaland.png"
import gyokeres from "../assets/portraits/gyokeres.jpg"
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
import rabiot from "../assets/portraits/rabiot.jpg"
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
import debruyne from "../assets/portraits/debruyne.png"
import mayulu from "../assets/portraits/fiche/mayulu.png"
import diaz from "../assets/portraits/fiche/diaz.webp"
import macallister from "../assets/portraits/fiche/macallister.webp"
import gakpo from "../assets/portraits/fiche/gakpo.webp"
import arnold from "../assets/portraits/fiche/arnold.webp"
import marmoush from "../assets/portraits/fiche/marmoush.webp"
import akanji from "../assets/portraits/fiche/akanji.webp"
import cubarsi from "../assets/portraits/fiche/cubarsi.webp"
import kimpembe from "../assets/portraits/fiche/kimpembe.png"
import beraldo from "../assets/portraits/beraldo.png"
import sorloth from "../assets/portraits/fiche/sorloth.png"
import alvarez from "../assets/portraits/fiche/alvarez.png"
import schik from "../assets/portraits/schik.png"
import wirtz from "../assets/portraits/wirtz.jpg"
import camavinga from "../assets/portraits/fiche/camavinga.webp"
import modric from "../assets/portraits/fiche/modric.webp"
import valverde from "../assets/portraits/fiche/valverde.webp"
import rudiger from "../assets/portraits/fiche/rudiger.webp"
import antony from "../assets/portraits/fiche/antony.png"
import isco from "../assets/portraits/isco.jpg"
import leao from "../assets/portraits/Leao.jpg"
import carvajal from "../assets/portraits/fiche/carvajal.webp"
import militao from "../assets/portraits/fiche/militao.webp"
import ugarte from "../assets/portraits/ugarte.png"
import lisandro from "../assets/portraits/lisandro.png"
import szoboszlai from "../assets/portraits/fiche/szoboszlai.webp"
import bradley from "../assets/portraits/fiche/bradley.webp"
import reijnders from "../assets/portraits/fiche/reijnders.webp"
import saka from "../assets/portraits/saka.png"
import trossard from "../assets/portraits/trossard.png"
import odegard from "../assets/portraits/odegard.png"
import saliba from "../assets/portraits/saliba.png"
import lookman from "../assets/portraits/fiche/lookman.png"
import retegui from "../assets/portraits/fiche/retegui.png"
import deketelaere from "../assets/portraits/fiche/deketelaere.png"
import donarumma from "../assets/portraits/fiche/donnarumma.png"
import nuno from "../assets/portraits/fiche/nuno.png"
import hernandez from "../assets/portraits/fiche/hernandez.png"
import hakimi from "../assets/portraits/fiche/hakimi.png"
import marquinhos from "../assets/portraits/fiche/marquinhos.png"
import ruiz from "../assets/portraits/fiche/ruiz.png"
import ascencio from "../assets/portraits/ascencio.png"
import rashford from "../assets/portraits/rashford.png"
import watkins from "../assets/portraits/watkins.png"
import malen from "../assets/portraits/malen.png"
import rogers from "../assets/portraits/rogers.png"
import rice from "../assets/portraits/rice.png"
import partey from "../assets/portraits/partey.png"
import skelly from "../assets/portraits/skelly.png"
import merino from "../assets/portraits/merino.png"
import balde from "../assets/portraits/fiche/balde.webp"
import pedri from "../assets/portraits/fiche/pedri.webp"
import olmo from "../assets/portraits/fiche/olmo.webp"
import brahim from "../assets/portraits/fiche/brahim.webp"
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
import simeone from "../assets/portraits/fiche/simeone.png"
import marcus from "../assets/portraits/fiche/thuram.png"
import sommer from "../assets/portraits/fiche/sommer.png"
import barella from "../assets/portraits/fiche/barella.png"
import dumfries from "../assets/portraits/fiche/dumfries.png"
import bastoni from "../assets/portraits/fiche/bastoni.webp"
import martinez from "../assets/portraits/fiche/martinez.webp"
import gnabry from "../assets/portraits/fiche/gnabry.avif"
import kane from "../assets/portraits/fiche/kane.avif"
import sane from "../assets/portraits/fiche/sane.avif"
import olise from "../assets/portraits/fiche/olise.avif"
import coman from "../assets/portraits/fiche/coman.avif"
import musiala from "../assets/portraits/fiche/musiala.avif"
import kimmich from "../assets/portraits/fiche/kimmich.avif"
import goretzka from "../assets/portraits/fiche/goretzka.avif"
import davies from "../assets/portraits/fiche/davies.avif"
import kim from "../assets/portraits/fiche/kim.avif"
import caicedo from "../assets/portraits/fiche/caicedo.webp"
import jackson from "../assets/portraits/fiche/jackson.webp"
import foden from "../assets/portraits/fiche/foden.webp"
import fernandez from "../assets/portraits/fiche/fernandez.webp"
import cucurella from "../assets/portraits/fiche/cucurella.webp"
import fofana from "../assets/portraits/fiche/fofana.webp"
import james from "../assets/portraits/fiche/james.webp"
import madueke from "../assets/portraits/fiche/madueke.webp"
import rodri from "../assets/portraits/fiche/rodri.webp"
import ake from "../assets/portraits/fiche/ake.webp"
import huijsen from "../assets/portraits/fiche/huijsen.webp"
import neto from "../assets/portraits/fiche/neto.webp"
import doku from "../assets/portraits/fiche/doku.webp"
import suarez from "../assets/portraits/fiche/suarez.png"
import bruno from "../assets/portraits/fiche/bruno.png"
import conceicao from "../assets/portraits/fiche/conceicao.png"
import dimaria from "../assets/portraits/fiche/dimaria.png"
import bernardo from "../assets/portraits/fiche/bernardo.webp"
import savinho from "../assets/portraits/fiche/savinho.webp"
import colwill from "../assets/portraits/fiche/colwill.webp"
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
import maignanselec from "../assets/portraits/selection/maignan.webp"
import tchouameniselec from "../assets/portraits/selection/tchouameni.webp"
import kolomuaniselec from "../assets/portraits/selection/kolomuani.webp"


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

  const trophiesArray = Object.entries(trophies).map(([league, trophies]) => ({
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
  console.log(palmares)


  return (
    <View>
      <Precedent />
      <ScrollView contentContainerStyle={styles.blocJoueur}>
        <View style={styles.article}>
          <LinearGradient colors={["black", "steelblue"]} style={styles.infosJoueur}>
{team === 2 ? 
            <Image source={
              
               joueur.player.id === 21104 ? kolomuaniselec : joueur.player.id === 22221 ? maignanselec : joueur.player.id === 1271 ? tchouameniselec : joueur.player.id === 33 ? lukasselec : joueur.player.id === 272 ? rabiotselec : joueur.player.id === 21509 ? thuramselec : joueur.player.id === 278 ? mbappeselec : joueur.player.id === 153 ? dembeleselec : joueur.player.id === 343027 ? doueselec : joueur.player.id === 19617 ? oliseselec : joueur.player.id === 47300 ? theoselec : joueur.player.id === 161904 ? barcolaselec : joueur.player.id === 156477 ? cherkiselec : {uri: joueur.player.photo}}
              style={{height: "190", width: "35%"}}/>
               :
              <Image source={
              joueur.player.id === 1485 ? bruno : joueur.player.id === 21393 ? guirassy : joueur.player.id === 2897 ? kim : joueur.player.id === 509 ? davies : joueur.player.id === 502 ? kimmich : joueur.player.id === 511 ? goretzka : joueur.player.id === 1864 ? neto : joueur.player.id === 152953 ? colwill : joueur.player.id === 266657 ? savinho : joueur.player.id === 323935 ? simeone : joueur.player.id === 631 ? foden : joueur.player.id === 36902 ? reijnders : joueur.player.id === 161585 ? conceicao : joueur.player.id === 266 ? dimaria : joueur.player.id === 567 ? rubendias : joueur.player.id === 18861 ? ake : joueur.player.id === 361497 ? huijsen : joueur.player.id === 157 ? suarez : joueur.player.id === 1422 ? doku : joueur.player.id === 636 ? bernardo : joueur.player.id === 44 ? rodri : joueur.player.id === 116117 ? caicedo : joueur.player.id === 136723 ? madueke : joueur.player.id === 283058 ? jackson : joueur.player.id === 5996 ? fernandez : joueur.player.id === 22094 ? fofana : joueur.player.id === 19545 ? james : joueur.player.id === 47380 ? cucurella : joueur.player.id === 284322 ? mainoo : joueur.player.id === 545 ? mazraoui : joueur.player.id === 532 ? deligt : joueur.player.id === 288006 ? hojlund : joueur.player.id === 70100 ? zirkzee : joueur.player.id === 157997 ? amad : joueur.player.id === 184 ? kane : joueur.player.id === 180496 ? mikautadze : joueur.player.id === 21509 ? marcus : joueur.player.id === 15906 ? touf : joueur.player.id === 37784 ? mmd :joueur.player.id === 984 ? brandt : joueur.player.id === 158644 ? beier : joueur.player.id === 744 ? brahim : joueur.player.id === 161928 ? balde : joueur.player.id === 1323 ? olmo : joueur.player.id === 133609 ? pedri : joueur.player.id === 47311 ? merino : joueur.player.id === 313245 ? skelly : joueur.player.id === 49 ? partey : joueur.player.id === 2937 ? rice : joueur.player.id === 2802 ? sommer : joueur.player.id === 909 ? rashford : joueur.player.id === 19366 ? watkins : joueur.player.id === 249 ? malen : joueur.player.id === 746 ? ascencio : joueur.player.id === 19170 ? rogers : joueur.player.id === 263482 ? nuno : joueur.player.id === 33 ? hernandez : joueur.player.id === 257 ? marquinhos : joueur.player.id === 9 ? hakimi : joueur.player.id === 1622 ? donarumma : joueur.player.id === 328 ? ruiz : joueur.player.id === 508 ? coman : joueur.player.id === 181812 ? musiala : joueur.player.id === 644 ? sane  : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 37127 ? odegard : joueur.player.id === 1946 ? trossard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 226 ? dumfries : joueur.player.id === 31009 ? bastoni : joueur.player.id === 217 ? martinez : joueur.player.id === 30558 ? barella : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 510 ? gnabry : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }} 
              style={
                
              joueur.player.id === 2897 || joueur.player.id === 247 || joueur.player.id === 1864 || joueur.player.id === 152953 || joueur.player.id === 7334 || joueur.player.id === 336657 || joueur.player.id === 386828 || joueur.player.id === 1257 || joueur.player.id === 1323 || joueur.player.id === 9971 || joueur.player.id === 1100 || joueur.player.id === 133609 || joueur.player.id === 521 || joueur.player.id === 396623 || joueur.player.id === 1496 || joueur.player.id === 343027 || joueur.player.id === 263482 || joueur.player.id === 306 || joueur.player.id === 51617 || joueur.player.id === 6716 || joueur.player.id === 1096 || joueur.player.id === 180317 || joueur.player.id === 2489 || joueur.player.id === 147859 || joueur.player.id === 278 || joueur.player.id === 483 ? { height: 230, width: "39%"}:
              joueur.player.id === 567 ||  joueur.player.id === 18861 || joueur.player.id === 409216 || joueur.player.id === 154 || joueur.player.id === 1622 || joueur.player.id === 128384  ? { height: "100%", width: "46%", marginRight: -30} :
             joueur.player.id === 161928 || joueur.player.id === 372 || joueur.player.id === 291964 || joueur.player.id === 511 || joueur.player.id === 502 || joueur.player.id === 509 || joueur.player.id === 323935 || joueur.player.id === 631 || joueur.player.id === 36902 || joueur.player.id === 156477 || joueur.player.id === 161585 || joueur.player.id === 266 ||  joueur.player.id === 2068 || joueur.player.id === 6009 || joueur.player.id === 8492 || joueur.player.id === 56 || joueur.player.id === 744 || joueur.player.id === 1271 || joueur.player.id === 283 || joueur.player.id === 361497 || joueur.player.id === 9 ||  joueur.player.id === 41585 || joueur.player.id === 161904 || joueur.player.id === 33 || joueur.player.id === 257 || joueur.player.id === 16367 || joueur.player.id === 21509 || joueur.player.id === 2802 || joueur.player.id === 31009 || joueur.player.id === 30558 || joueur.player.id === 226 || joueur.player.id === 81573 || joueur.player.id === 5  ? {height: "100%", width: "40%", marginRight: -20} :
                joueur.player.id === 1485 || joueur.player.id === 284324 || joueur.player.id === 266657 || joueur.player.id === 335051 || joueur.player.id === 157 || joueur.player.id === 262 || joueur.player.id === 1422 || joueur.player.id === 636 || joueur.player.id === 44 || joueur.player.id === 762 || joueur.player.id === 153 || joueur.player.id === 129718 || joueur.player.id === 10009 || joueur.player.id === 756 || joueur.player.id === 2207 || joueur.player.id === 377122 || joueur.player.id === 754 || joueur.player.id === 2285 || joueur.player.id === 733 || joueur.player.id === 328 || joueur.player.id === 217 || joueur.player.id === 18767 || joueur.player.id === 6420 || joueur.player.id === 510 || joueur.player.id === 184 || joueur.player.id === 19617 || joueur.player.id === 644 || joueur.player.id === 508 || joueur.player.id === 181812 || joueur.player.id === 47380 || joueur.player.id === 22094 || joueur.player.id === 152982 || joueur.player.id === 283058 || joueur.player.id === 5996 || joueur.player.id === 136723 || joueur.player.id === 19545 || joueur.player.id === 116117 ? {height: "105%", width: "43%", marginRight: -20} :
                joueur.player.id === 21393 ? {height: "125%", width: "44%"}
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
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                  </View>

                </Animated.View> :
              palmares.length < 12 ? <Animated.View style={[styles.palmaresInfos, {
                height: heightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 160]  // Ajustez la hauteur en fonction du contenu
                })
              }]}>
                <View style={{ width: "55%" }}>
                  {trophiesArray.map((element, index) => (
                    element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                      <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                  ))}
                </View>
                <View style={styles.armoire}>
                  {trophiesArray.map((element) => <View style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
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
                      element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                        <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                    ))}
                  </View>
                  <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
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
                        element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                          <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                      ))}
                    </View>
                    <View style={styles.armoire}>
                      {trophiesArray.map((element) => <View style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
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
                {element.games.minutes > 0 && (
                  <View>
                    <LinearGradient colors={["black", "steelblue"]} style={{ borderRadius: 5 }}>
                      <Text style={styles.leagueName}>{element.league.name === "Friendlies" ? "Amicaux" : element.league.name}</Text>
                    </LinearGradient>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginInline: 10 }}>
                      <View style={styles.statList}>
                        <View style={styles.ligne}>
                          <Image source={player} style={styles.icone} />
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
                )}
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
    paddingBottom: 50
  },
  article: {
    flexDirection: 'column',
    width: '98%',
    alignItems: "center",
  },
  infosJoueur: {
    backgroundColor: '#4682b4',
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
    marginBottom: 20,
  },
  leagueName: {
    fontSize: 16,
    fontFamily: "Permanent",
    textAlign: "center",
    color: "white",
    marginBlock: 5
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
    fontSize: 16
  },
  valeur: {
    fontFamily: "Kanitt",
    fontSize: 18
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