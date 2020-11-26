import React, { useState } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {sendEPFeedback} from "../../../Utils"
import Button from '@material-ui/core/Button';


//Page contenant l'annonce de la fin de l'expérience et du réel but de celle-ci.
//Cette page contient également le formulaire de retour d'expérience de l'utilisateur.

function FeedbackForm(props)  {
    

    const classes = useStyles();
    const history = useHistory();
    const [globalFeeling, setGlobalFeeling]= useState('');
    const [cheatingFeeling, setCheatingFeeling] = useState('')
    const [fairSanction, setFairSanction] = useState('')
    const [otherSanction, setOtherSanction] = useState('')
    const [showForm, setShowForm] = useState(false)

    
    function handleChangeGlobalFeeling(e){
        setGlobalFeeling(e.target.value)
    }
    function handleChangeCheatingFeeling(e){
        setCheatingFeeling(e.target.value)
    }
    function handleChangeFairSanction(e){
        setFairSanction(e.target.value)
    }
    function handleChangeOtherSanction(e){
        setOtherSanction(e.target.value)
    }

    const goToFeedback=()=>{
        setShowForm(true)
    }
    const handleSubmit=(event)=>{
        event.preventDefault();

        sendEPFeedback(props.location.user,  props.location.sanctionGiven,
            globalFeeling,cheatingFeeling,fairSanction,otherSanction)

        history.push('/experiences')
    }


return (
    <div className={classes.root}>   
    {showForm === false ? 
    <div>
        <p>
            <b>L'expérience est terminée !</b>
            <br/>
            Tout d’abord, <b>CETTE EXPÉREPNCE NE PORTAIT PAS SUR LES ÉMOTIONS ET L’INTELLIGENCE. </b> 
            Bien que nous ayons été transparents sur ce qui vous attendait comme tâches dans l’expérience, 
            nous n'avons pas dévoilé l’objet réel de l’expérience.<br/><br/>

            Avant de vous en informer, sachez que <b>PEU IMPORTE VOTRE RÉSULTAT OU « TRICHEREP », VOUS ÊTES ADMISSIBLE 
            À LA CARTE-CADEAU DE 10$ DE COMPENSATION.</b> Un lien vous dirigera vers une page externe pour donner, 
            anonymement, votre courriel afin de recevoir votre compensation (résidants du Québec seulement).

            <br/>
            Le but de cette expérience est de voir comment vous réagissez face à l’annonce de détection de tricherie, 
            et face à une sanction relative au fait d’avoir tricher.
            <br/><br/>

            Les exercices ont été volontairement conçus de manière à laisser la place à la tricherie afin de nous permettre 
            d’étudier ce comportement. Une fois la première série d’exercices terminée, on annonçait que de la tricherie avait 
            été détectée, puis vous receviez une parmi trois types de sanctions possibles. Soit ce n’était qu’un avertissement, 
            soit vous recommenciez tout, soit vous poursuiviez mais perdiez vos points. Lors de la seconde série d’exercices, 
            la récidive était évaluée. Nous avons également, tel qu’indiqué pris quelques photos de la caméra de votre 
            ordinateur dans le but d'analyser les émotions de votre visage lors de l'annonce que la tricherie a été détectée.
            <br/><br/>
            Maintenant que vous êtes au courant de la procédure, nous avons besoin de recevoir votre accord éclairé pour 
            utiliser les données issues de votre participation. Nous vous rappelons que personne outre l’équipe de recherche 
            n’aura accès aux données, et que les captures de caméra ne seront jamais utilisées pour d’autre fin que l’analyse 
            des émotions faciales. Les images seront détruites 2 ans après la fin du projet de recherche.
            <br/>
            Merci encore,
        </p>
        <Button variant="contained" color="primary" onClick={goToFeedback}> Passer au questionnaire </Button>
    </div>
    :null}
    {showForm === true ?
        <div>
            <p>Nous allons maintenant recueillir votre ressenti à travers un petit questionnaire.
            </p> 
            <form onSubmit={handleSubmit}>
                <label>
                    Comment vous êtes vous senti durant l'expérience ? <br/><br/>
                    <textarea type="text" name="globalFeeling" cols="50" rows="10" value={globalFeeling} onChange={e=> handleChangeGlobalFeeling(e)}/>
                </label><br/><br/><br/>
                <label>
                    Avez-vous eu le sentiment d'avoir triché ? : <br/><br/>
                    <textarea type="text" name="cheatingFeeling" cols="50" rows="10" value={cheatingFeeling} onChange={e=> handleChangeCheatingFeeling(e)}/>
                </label><br/><br/><br/>
                <label>
                    La sanction vous a-t-elle paru juste et proportionnée pour quelqu'un ayant triché ? : <br/><br/>
                    <textarea type="text" name="fairSanction" cols="50" rows="10" value={fairSanction} onChange={e=> handleChangeFairSanction(e)}/>
                </label><br/><br/><br/>
                <label>
                    Auriez-vous pensé à une autre sanction possible ? <br/><br/>
                    <textarea type="text" name="otherSanction" cols="50" rows="10" value={otherSanction} onChange={e=> handleChangeOtherSanction(e)}/>
                </label><br/><br/><br/>
                <Button variant="contained" color="primary" type="submit" >Soumettre </Button>
            </form> 

            <p> Merci d'avoir participé !</p>
        </div>
    :null}
  
</div>)
}


const useStyles = makeStyles({

    startButton:{
      margin : '5%',

      flexWrap: 'wrap'
    },
    root: {
        display: 'flex',
        flexDirection:"column",
        justifyContent:'center',
        alignItems : 'center',
      }
})

 
export default withRouter(FeedbackForm);