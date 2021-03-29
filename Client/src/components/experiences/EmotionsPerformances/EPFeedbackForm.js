import React, { useState } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {updateUserFeedback} from "../../../Utils"
import Button from '@material-ui/core/Button';
import {afterTaskSanction, afterTaskReasons, afterTaskDuringTask,afterTaskCheating, afterTaskTaskRelated, afterTaskSanctionFeelings } from "./Constants"
import LikertScale from "./Likert";
import ContinuousLikert from "./ContinuousLikert"


//Page contenant l'annonce de la fin de l'expérience et du réel but de celle-ci.
//Cette page contient également le formulaire de retour d'expérience de l'utilisateur.
//Ce formulaire est découpé en 7 sections :
// - Ressenti avant l'annonce de la sanction (afterTaskSanction)
// - Raisons pour lesquelles l'utilisateur à décidé de faire cette expérience (afterTaskReasons)
// - Ressenti durant l'éxecution de la tâche (afterTaskDuring)
// - Ressenti après l'annonce de la sanction (afterTaskSanction)
// - Ressenti sur la notion de triche
// - Ressenti sur la tâche (afterTaskTaskRelated)
// - Ressenti sur la sanction donnée (afterTaskSanctionFeelings)

function FeedbackForm(props)  {
    

    const classes = useStyles();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false)
    //On initialise une liste de réponses neutres pour toutes les questions du questionnaire.
    const [userAnswers, setUserAnswers] = useState(new Array((afterTaskSanction.length*2 +afterTaskReasons.length+ afterTaskDuringTask.length + 
                                                    Object.values(afterTaskCheating).length*2 + afterTaskTaskRelated.length + afterTaskSanctionFeelings.length)).fill(8))
    const [formStep, setFormStep] = useState(0)
    const responses= [
        { value: 1, text: "Pas du tout en accord" },
        { value: 2, },
        { value: 3, },
        { value: 4, text: "Moyennement en accord" },
        { value: 5,  },
        { value: 6, },
        { value: 7, text: "Très fortement en accord" },
        { value: 8, text: "Ne veux pas répondre", checked:'true' }

    ]


    //Fonction appelée par les composants fils LikertScale et ContinuousLikert lors de l'ajout du réponse par l'utilisateur.
    function handleFormAnswerChange(id,value){

        //Mise à jour de la liste des réponses de l'utilisateur
        let newUserAnswers = [...userAnswers]; 
        newUserAnswers[id] = value
        setUserAnswers(newUserAnswers)

    }

    //On crée une liste de Likerts pour la première section de questions (qui est identique à la 4ème.)
    const getLikertsSanction=(first)=>{
        var counter = 0
        if(first){
            counter = 0
        }else{
            counter = afterTaskSanction.length + afterTaskReasons.length + afterTaskDuringTask.length
        }
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

    //On crée une liste de Likerts pour la troisième section de questions.
    const getLikertsCheating=()=>{

        var counter = afterTaskSanction.length*2 + afterTaskReasons.length + afterTaskDuringTask.length 
        var likertList = []
        for (var z=0; z<Object.keys(afterTaskCheating).length; z++){
            for (var e=0; e<afterTaskCheating[Object.keys(afterTaskCheating)[z]].length; e++){
                likertList.push(<div><ContinuousLikert onChange={handleFormAnswerChange} 
                                                key={counter} 
                                                id={counter}
                                                title={Object.keys(afterTaskCheating)[z]} 
                                                question={afterTaskCheating[Object.keys(afterTaskCheating)[z]][e]}>
                                                
                                                </ContinuousLikert><br/></div>)
                counter= counter+1
            }
        }
        
        return likertList
    }

    //On crée une liste de Likerts pour la troisième section de questions.
    const getLikertsTaskRelated=()=>{
        var counter = afterTaskSanction.length*2 + afterTaskReasons.length + afterTaskDuringTask.length +  Object.values(afterTaskCheating).length*2
        var likertList = []

        for (var z=0; z<afterTaskTaskRelated.length; z++){
            var likertOptions4 = {id:counter,
                                answers: responses, 
                                question :afterTaskTaskRelated[z],
                                onChange:handleFormAnswerChange,
                                }
            likertList.push(<LikertScale key={counter} likertOptions={likertOptions4}></LikertScale>)
            counter= counter+1
        }

        return likertList
    }

    //On crée une liste de Likerts pour la troisième section de questions.
    const getLikertsSanctionFeeling=()=>{
        var counter = afterTaskSanction.length*2 + afterTaskReasons.length + afterTaskDuringTask.length +  Object.values(afterTaskCheating).length*2 + afterTaskTaskRelated.length
        var likertList = []

        for (var z=0; z<afterTaskSanctionFeelings.length; z++){
            var likertOptions5 = {id:counter,
                                answers: responses, 
                                question :afterTaskSanctionFeelings[z],
                                onChange:handleFormAnswerChange,
                                }
            likertList.push(<LikertScale key={counter} likertOptions={likertOptions5}></LikertScale>)
            counter= counter+1
        }

        return likertList
    }


    //On passe au questionnaire puis ensuite à chacune des sections de questions
    const handleNextStep=()=>{   
        if(formStep===0){
            setShowForm(true)
        }   
        if(formStep===8){ 
            handleSubmit()
        }
        setFormStep(formStep+1)
        window.scrollTo(0, 0)
        
    }

    const handleSubmit=()=>{

        updateUserFeedback(props.location.user,  props.location.sanctionGiven, userAnswers)
        history.push('/experiences')
        

    }


return (
    <div className={classes.root}>   
        {showForm === false ? 
            <div className={classes.text}>
                <div className={classes.scrollableText}> 
                    <b>L'expérience est terminée !</b>
                    <br/><br/><br/>
                    Tout d’abord, <b style={{ color: 'red' }}>CETTE EXPÉRIENCE NE PORTAIT PAS SUR LES ÉMOTIONS ET L’INTELLIGENCE. </b> 
                    Bien que nous ayons été transparents sur ce qui vous attendait comme tâches dans l’expérience, 
                    nous n'avons pas dévoilé l’objet réel de l’expérience.<br/><br/><br/><br/>

                    Avant de vous en informer, sachez que <b style={{ color: 'red' }}>PEU IMPORTE VOTRE RÉSULTAT OU VOTRE
                    « TRICHERIE », VOUS ÊTRE ADMISSIBLE AU TIRAGE DES 10 CARTES-CADEAUX D’UNE VALEUR
                    DE 100$ CHACUNE </b>  (résidants du Québec seulement).

                    <br/><br/><br/>
                    Le but de cette expérience est de voir comment vous réagissez face à l’annonce de détection de tricherie, 
                    et face à une sanction relative au fait d’avoir triché.
                    <br/><br/><br/><br/>

                    Les exercices ont été volontairement conçus de manière à laisser la place à la tricherie afin de nous permettre 
                    d’étudier ce comportement. Une fois la première série d’exercices terminée, on annonçait que de la tricherie avait 
                    été détectée, puis vous receviez une sanction parmi trois types de sanctions possibles. Soit ce n’était qu’un avertissement, 
                    soit vous recommenciez tout, soit vous poursuiviez mais perdiez vos points. Lors de la seconde série d’exercices, 
                    la récidive était évaluée. Tel qu'indiqué, nous avons pris quelques photos de la caméra de votre 
                    ordinateur dans le but d'analyser les émotions de votre visage lors de l'annonce que la tricherie a été détectée.
                    Les photos de vos expressions faciales seront converties en une série de chiffres
                    décrivant l'intensité des émotions ressenties. Ce n’est donc pas directement votre visage qui
                    sera analysé. <span style={{ color: 'red' }}>Les photos seront ensuite détruites après une semaine et les données conservées
                    ne permettront pas de vous identifier.</span>
                    <br/><br/><br/><br/>
                    Maintenant que vous êtes au courant de la procédure,<span style={{ color: 'red' }}> nous avons besoin de recevoir votre
                    consentement éclairé pour utiliser les données issues de votre participation.</span> 
                    <br/><br/>
                    Nous vous rappelons que personne outre l’équipe de recherche n’aura accès aux données, et que les
                    captures de caméra ne seront jamais utilisées pour d’autres fins que l’analyse des émotions
                    faciales.
                    <br/>
                    Merci encore,<br/>
                </div>
                <br/><br/>

                <Button variant="contained" color="primary" onClick={handleNextStep}> J'accepte que mes données soient utilisées pour la présente recherche, passer au questionnaire</Button>
            </div>
        :null}
        {showForm === true ?
            <div >     

                {formStep === 1 ?
                    <div>
                        <p>Nous allons maintenant recueillir votre ressenti à travers un questionnaire.</p>
                        <div className={classes.form}>
                            <p><b>AVANT</b> l'annonce de la sanction, je me suis senti.e ...</p><br/>

                            {getLikertsSanction(true)}
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
                    </div>
                :null}

                {formStep === 4?
                    <div className={classes.form}>
                        <p><b>APRES</b> l'annonce de la sanction, je me suis senti.e ...</p><br/>

                        {getLikertsSanction(false)}
                    </div>
                :null}

                {formStep === 5?
                    <div className={classes.form}>
                        <p>Répondez aux mises en situation suivantes par rapport à la tricherie
                            en indiquant à quelle probabilité vous émettriez les réponses suggérées.</p><br/>

                        {getLikertsCheating()}
                    </div>
                :null}

                {formStep === 6?
                    <div className={classes.form}>
                        <p>Répondez aux mises en situation suivantes par rapport à la tricherie
                            en indiquant à quelle probabilité vous émettriez les réponses suggérées.</p><br/>

                        {getLikertsTaskRelated()}
                    </div>
                :null}

                {formStep === 7?
                    <div className={classes.form}>
                        <p>Répondez aux mises en situation suivantes par rapport à la sanction donnée en indiquant à quelle probabilité vous émettriez les réponses suggérées</p><br/>

                        {getLikertsSanctionFeeling()}
                    </div>
                :null}

                {formStep === 8?
                    <div className={classes.form}>
                        <p> Merci d'avoir participé !</p>
                    </div>
                :null}
                <br/><br/>
                <Button variant="contained" color="primary" onClick={handleNextStep}> Suivant </Button> 
                {formStep !== 8?
                    <p>{formStep}/7</p>                
                :null}
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
        borderColor : "#E2DDDC",
        borderRadius: 25
    },
    text:{
        display: 'flex',
        flexDirection:"column",
        justifyContent:'center',
        alignItems : 'center',
    },
    scrollableText:{
        maxHeight: '350px',
        overflowY: 'scroll',
        marginLeft:'200px',
        marginRight : '200px'
        
    }
})

 
export default withRouter(FeedbackForm);