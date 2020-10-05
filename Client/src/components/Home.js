import React from 'react';


export default class Home extends React.Component {

    render() {
      return (
        <div>
        <h2>Bienvenue</h2>
        <p>Ce site regroupe plusieurs expériences réalisées dans le cadre de recherche par l'université de Laval.<br></br>
        Ces expériences ont été écrites et mises en place par <a href='https://www.cirris.ulaval.ca/fr/julien-voisin'> Julien Voisin</a>, ergothérapeute expert en neuroimagerie fonctionnelle travaillant notamment en réadaptation au CIRRIS.
        Elles concernent divers sujets comme la neuroscience, la neurobiologie, la réadaption, l'intégrité sociale ou encore l'intelligence artificielle.
        </p>
        <p>
        Pour des mesures de confidentialités, aucune informations concernant l'identité des personnes passant les expériences ne seront demandés. 
        Si vous souhaitez connaître les résultats des expériences et leurs conclusion, merci de vous rendre dans l'onglet Informations
        </p>
      </div>
    );
    }
  }