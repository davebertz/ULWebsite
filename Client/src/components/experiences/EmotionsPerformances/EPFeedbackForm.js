import React, { useState } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {sendEPFeedback} from "../../../Utils"
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import {afterTaskSanction, afterTaskReasons, afterTaskDuringTask } from "./Constants"
import LikertScale from "../../Likert";


//Page contenant l'annonce de la fin de l'expérience et du réel but de celle-ci.
//Cette page contient également le formulaire de retour d'expérience de l'utilisateur.
//Ce formulaire est découpé en 5 sections :
// - Ressenti avant l'annonce de la sanction (afterTaskSanction)
// - Raisons pour lesquelles l'utilisateur à décidé de faire cette expérience (afterTaskReasons)
// - Ressenti durant l'éxecution de la tâche (afterTaskDuring)
// - Ressenti après l'annonce de la sanction (afterTaskSanction)
// - Ressenti sur la notion de triche

function FeedbackForm(props)  {
    

    const classes = useStyles();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false)
    //On initialise une liste de réponses neutres pour toutes les questions du questionnaire.
    const [userAnswers, setUserAnswers] = useState(new Array((afterTaskSanction.length*2 +afterTaskReasons.length+ afterTaskDuringTask.length))
    .fill(4))
    const [formStep, setFormStep] = useState(0)
    const responses= [
        { value: 1, text: "Pas du tout en accord" },
        { value: 2, },
        { value: 3, },
        { value: 4, text: "Moyennement en accord", checked: true  },
        { value: 5,  },
        { value: 6, },
        { value: 7, text: "Très fortement en accord" }
    ]


    //Fonction appelée par les composants fils LikertScale lors de l'ajout du réponse par l'utilisateur.
    function handleFormAnswerChange(id,value){
        
        //La 1ere et la 4eme sections sont identiques, on met donc le bon id lorsque nous sommes à la 4eme section
        if(formStep === 4){
            id = id + afterTaskSanction.length + afterTaskReasons.length +  afterTaskDuringTask.length
        }
        //Mise à jour de la liste des réponses de l'utilisateur
        let newUserAnswers = [...userAnswers]; 
        newUserAnswers[id] = value
        setUserAnswers(newUserAnswers)

    }

    //On crée une liste de Likerts pour la première section de questions (qui est identique à la 4ème.)
    const getLikertsSanction=()=>{

        var counter = 0
        var likertList = []

        for(var m=0;m<afterTaskSanction.length; m++){
            var likertOptions1 = {id:counter,
                                 answers : responses,
                                 question:afterTaskSanction[m],
                                 onChange:handleFormAnswerChange,}
            likertList.push(<LikertScale key={counter} likertOptions={likertOptions1}></LikertScale>)
            counter=counter+1
        }
        return likertList
    }

    //On crée une liste de Likerts pour la deuxième section de questions.
    const getLikertsReasons=()=>{
        var counter = afterTaskSanction.length
        var likertList = []

        for (var y=0; y<afterTaskReasons.length; y++){
            var likertOptions2 = {id:counter,
                                answers: responses, 
                                question :afterTaskReasons[y],
                                onChange:handleFormAnswerChange,
                                }
            likertList.push(<LikertScale key={counter} likertOptions={likertOptions2}></LikertScale>)
            counter= counter+1
        }

        return likertList
    }

    //On crée une liste de Likerts pour la troisième section de questions.
    const getLikertsDuring=()=>{

        var counter = afterTaskSanction.length + afterTaskReasons.length
        var likertList = []

        for (var z=0; z<afterTaskDuringTask.length; z++){
            var likertOptions3 = {id:counter,
                                answers: responses, 
                                question :afterTaskDuringTask[z],
                                onChange:handleFormAnswerChange,
                                }
            likertList.push(<LikertScale key={counter} likertOptions={likertOptions3}></LikertScale>)
            counter= counter+1
        }

        return likertList
    }

    //On passe au questionnaire puis ensuite à chacune des sections de questions
    const handleNextStep=()=>{   
        if(formStep===0){
            setShowForm(true)
        }   
        setFormStep(formStep+1)
        window.scrollTo(0, 0)
        console.log(userAnswers)
        
    }

    // const handleSubmit=(event)=>{
    //     event.preventDefault();

    //     sendEPFeedback(props.location.user,  props.location.sanctionGiven)

    //     history.push('/experiences')
    // }


return (
    <div className={classes.root}>   
        {showForm === false ? 
            <div className={classes.text}>
                <p>
                    <b>L'expérience est terminée !</b>
                    <br/>
                    Tout d’abord, <b>CETTE EXPÉRIENCE NE PORTAIT PAS SUR LES ÉMOTIONS ET L’INTELLIGENCE. </b> 
                    Bien que nous ayons été transparents sur ce qui vous attendait comme tâches dans l’expérience, 
                    nous n'avons pas dévoilé l’objet réel de l’expérience.<br/><br/>

                    Avant de vous en informer, sachez que <b>PEU IMPORTE VOTRE RÉSULTAT OU « TRICHERIE », VOUS ÊTES ADMISSIBLE 
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
                    Merci encore,<br/>
                </p>
                <ReactPlayer playing={true} controls={true} url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' /><br/><br/>

                <Button variant="contained" color="primary" onClick={handleNextStep}> Passer au questionnaire </Button>
            </div>
        :null}
        {showForm === true ?
            <div >     

                {formStep === 1 ?
                    <div>
                        <p>Nous allons maintenant recueillir votre ressenti à travers un questionnaire.</p>
                        <div className={classes.form}>
                            <p><b>AVANT</b> l'annonce de la sanction, je me suis senti.e ...</p><br/>

                            {getLikertsSanction()}
                        </div>
                    </div>
                :null}

                {formStep === 2 ?
                    <div className={classes.form}>
                        <p>Quelles sont les raisons pour lesquelles vous avez décidé de faire cette tâche?</p><br/>
                        {getLikertsReasons()}                    
                    </div>                
                :null}

                {formStep === 3 ?
                    <div className={classes.form}>
                        <p>Lors de la tâche d'aujourd'hui ...</p><br/>

                        {getLikertsDuring()}
                        <p> Merci d'avoir participé !</p>
                    </div>
                :null}

                {formStep === 4?
                    <div className={classes.form}>
                        <p><b>APRES</b> l'annonce de la sanction, je me suis senti.e ...</p><br/>

                        {getLikertsSanction()}
                    </div>
                :null}
                <br/><br/>
                <Button variant="contained" color="primary" onClick={handleNextStep}> Suivant </Button>                
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
      },
    form:{
        backgroundColor : '#DCDCDC',
        padding:15,
        border : 'solid',
        borderColor : "#C0C0C0",
        borderRadius: 25
    },
    text:{
        display: 'flex',
        flexDirection:"column",
        justifyContent:'center',
        alignItems : 'center',
    }
})

 
export default withRouter(FeedbackForm);