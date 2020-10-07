import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExperiencesCard from './ExperiencesCard';


//Onglet principal du site, il regroupe toutes les expériences disponibles sous forme d'encartés cliquables.
//C'est ici qu'on liste les expériences et les informations associées (lien pour navigation, image, description, durée ...)

const experiences = [
  { title: 'La silhouette de Kayahara', description:"Cette expérience reprend le principe de l'illusion d'optique de la danseuse en rotation de Nobuyuki Kayahara. Il vous sera demandé de regarder une courte vidéo afin de définir le sens de rotation (horaire/anti-horaire) d'une silhouette. ",
   image:require("../images/kayahara_spinner.gif"),timeExpected : '20 minutes', imageTitle:"spinnerKayahara", url: 'experience/kayahara' },
  { title: 'Intelligence et émotions', description:"Expérience portant sur les émotions et les capacités cognitives. Le but est d'atteindre un score maximal à des exercices mêlant réflexion, logique, mémoire et chance.", image:require("../images/emotions.png"),timeExpected : '20 minutes',imageTitle:"emotions", url:'experience/intelligenceemotionnellescreen' },


];

export default class Home extends React.Component {

    render() {
      return (
          <main>
            <Grid container spacing={4}>
              {experiences.map((post) => (
                <ExperiencesCard key={post.title} post={post} />
              ))}
            </Grid>
            
          </main>
      );
      
    }
  }