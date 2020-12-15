import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import HeadOrtail from "./Tasks/HeadOrTail";
import NumericalSequence from "./Tasks/NumericalSequence";
import CanadianQuestion from "./Tasks/CanadianQuestion";
import TimerWord from "./Tasks/TimerWord";
import MemoryQuestion from "./Tasks/MemoryQuestion";
import Definition from "./Tasks/Definition";
import {sendEmotionsPerformancesResults} from '../../../Utils'
import WheelOfFortune from "./Tasks/FortuneWheel/FortuneWheelTask";
import VerticalProgress from "../../VerticalProgressBar";

//Seconde page de l'expérience Intelligence EMotionnelle, c'est la page contenant tous les exercices.
//Les questions et les réponses de chaque série sont passés en paramètres de navigation (props.location)

//Le fonctionnement global est d'avoir une liste d'exercice à compléter (testOrder). On affiche le composant associé 
// à chaque exercice selon l'avancement de l'utilisateur dans la série d'exercices (experienceStep).

function EmotionsPerformancesTasks(props)  {
    

    const classes = useStyles();
    const history = useHistory();
    const [testOrder, setTestOrder]=useState() //Liste des étapes (exercices) de la série
    const [experienceStep, setExperienceStep]= useState('beginning'); //Etape actuelle 
    const [experienceStepCount, setExperienceStepCount]= useState(0); //Compteur d'étape
    const [cheat, setCheat] = useState([]) //Coefficient de triche de l'utilisateur à chaque exercice
    const [tasksResults, setTaskResults] = useState([]) //réponses de l'utilisateur à chaque exercice

    const [progressBarExampleValue, setprogressBarExampleValue]=useState(0)
    const [progressBarValue, setprogressBarValue]=useState(0)
    const progressBarValueAverage = [0,0,25,30,32,55,62,65,68,78,94]
    const progressExampleValues = [5,16,24,43,66,78,98,100] //Valeurs d'exemples pour l'étape "beginning"

    const [startTimer, setStartTimer] = useState(false) // paramètre utilisé pour démarrer le timer dans l'exercice de vocabulaire
    const [memoryCheat, setMemoryCheat] = useState(0) //Paramètre utilisé pour détecter la triche dans l'exercice Memory
    

    useEffect(() => { 
        var index = 0
        setStartTimer(false)
        if(props === undefined || props.location.user === undefined){
            history.push("/experiences")
        }

        //On regarde si l'utilisateur est à sa première ou sa deuxième série à travers l'existence ou non d'une sanction en props.
        if(props.location.givenSanction === undefined){
            setTestOrder(['beginning','headOrTail','numericalSequences','fortuneWheel','CanadianQuestion','timerWord',
                            'memoryQuestion','definition'])
        }else{
            var questions = ['beginning','numericalSequences','definition','CanadianQuestion','memoryQuestion','headOrTail','fortuneWheel','timerWord']
            setTestOrder(questions)
            //on passe l'étape "beginning" (index 0) qui correspond à l'étape d'explication car l'utilisateur à déjà été mis au courant
            //des règles.
            setExperienceStep(questions[1])
            setExperienceStepCount(1)
        }

        //Incrémentation toutes les secondes de la valeur de progression pour la barre d'EXEMPLE.
        setInterval(() => {
            if(index <8){
                setprogressBarExampleValue(progressExampleValues[index])
                index = index +1
            }else{
                index=0
            }
            
            

          }, 1000);
    },[props, history ])


    //Fonction que l'on donne à tous les composants exercices en paramètres qu'ils pourront appeler pour renvoyer le résultat (et la triche)
    const addResult=(result, score, hasCheated)=>{
        if(experienceStep==='memoryQuestion'){//Cas particulier car triche gérée par le composant parent pour celui ci
            setCheat(cheat=>[...cheat, {[experienceStep] : memoryCheat}])
        }else{
            setCheat(cheat=>[...cheat, {[experienceStep] : hasCheated}])
        }
        setTaskResults(tasksResults=>[...tasksResults, {[experienceStep] : result}])
        movingForward()
        setprogressBarValue(progressBarValue+score)

    }

    const goTimer=()=>{
        setStartTimer(true)
    }


    //Fonction appelée soit par le bouton "question suivante" ou alors dans "addResult", càd quand l'utilisateur à valider les
    //résultats depuis le bouton du composant fils
    const movingForward= () => {

        //On vérifie si la série et l'expérience sont terminées 
        if(experienceStepCount+1 === testOrder.length){
            if(props.location.givenSanction !== undefined){ //On regarde si c'est la première ou la seconde série
                sendEmotionsPerformancesResults(props.location.user.username,props.location.actualSerie["Questions"], tasksResults, cheat, true, props.location.givenSanction )
                history.push({pathname:"/experience/EmotionsPerformancesfeedback",
                                user : props.location.user.username,
                                sanctionGiven : props.location.givenSanction
                })
            }else{
                sendEmotionsPerformancesResults(props.location.user.username, props.location.actualSerie["Questions"], tasksResults, cheat, false, null )

                //Si la première série d'exercice est terminée, on passe à la page result avec en paramètre la seconde série d'exercice
                //qui sera elle-même transmise à intelligenceemotionelletask pour la seconde série.
                history.push({pathname:"/experience/EmotionsPerformancesresults",
                            user : props.location.user,
                            actualSerie: props.location.nextSerie})
                }
                      
        }
        setStartTimer(false)
        setExperienceStep(testOrder[experienceStepCount+1])
        setExperienceStepCount(experienceStepCount+1)
    }


    //Fonction permettant de revenir à la question précédente, appelée par le bouton précédent de ce composant.
    const movingBackward= () => {
        if(experienceStep === "memoryQuestion"){ //on détecte la triche pour la tâche MemoryQuestion
            setMemoryCheat(1)
        }  
        setStartTimer(false)
        setExperienceStep(testOrder[experienceStepCount-1])
        setExperienceStepCount(experienceStepCount-1)
    }

    //Fonction qui renvoit l'exercice à afficher selon l'étape (avec la barre de progression)
    function getExperienceDiv(){
        var taskComponent = null
        if(experienceStep==="headOrTail"){              
            taskComponent = <HeadOrtail sendDataToParent={addResult}> </HeadOrtail>
        }else if(experienceStep==="numericalSequences"){        
            taskComponent = <NumericalSequence series={props.location.actualSerie["Questions"]["numerical"]} answer={props.location.actualSerie["Answers"]["numerical"]} sendDataToParent={addResult}> </NumericalSequence>
        }else if(experienceStep==="CanadianQuestion"){       
            taskComponent =  <CanadianQuestion question={props.location.actualSerie["Questions"]["canadaCulture"]} answer={props.location.actualSerie["Answers"]["canadaCulture"]} sendDataToParent={addResult}></CanadianQuestion>
        }else if(experienceStep==="timerWord"){        
            taskComponent = <TimerWord letter={props.location.actualSerie["Questions"]["letter"]} answer={props.location.actualSerie["Answers"]["letter"]} callbackStart={goTimer} startTimer={startTimer} sendDataToParent={addResult}></TimerWord>
        }else if(experienceStep==="memoryQuestion"){        
            taskComponent = <MemoryQuestion  question = {props.location.actualSerie["Questions"]["memory"]} answer={props.location.actualSerie["Answers"]["memory"]} sendDataToParent={addResult}></MemoryQuestion>
        }else if(experienceStep==="definition"){
            taskComponent = <Definition  word={props.location.actualSerie["Questions"]["definition"]} answer={props.location.actualSerie["Answers"]["definition"]} sendDataToParent={addResult}></Definition>
        }else if(experienceStep==="fortuneWheel"){        
            taskComponent = <WheelOfFortune   sendDataToParent={addResult}></WheelOfFortune>
        }


        return <div className={classes.bodyContainer}>
            <div className={classes.task}>
            {taskComponent}
            </div>
            <div  className={classes.progressBarContainer}>
                <div  className={classes.progressBar}>
                    <VerticalProgress color='blue' progress={progressBarValue} />
                    <p>Votre score</p>
                </div>
                <div  className={classes.progressBar}>
                    <VerticalProgress color='green'  progress={progressBarValueAverage[experienceStepCount]} />
                    <p>Score moyen</p>
                </div>                
            </div>
        </div>
    }

return (
    <div className={classes.root}>   

        {/* Debut de l'expérience  */}
        { experienceStep === 'beginning' ?
        <div className={classes.taskContainer}>
            <div className={classes.centered}> 
                <p >
                    Nous allons maintenant passer à la suite de l'expérience.<br/>
                    Vous allez devoir effectuer deux séries d'exercices simples qui ont pour but de tester votre mémoire et votre réflexion.
                    Le but de l’expérience est d’accumuler des points. 
                    <br/>Un tirage au sort pour gagner des cartes cadeaux Renaud-Bray d'une valeur de 10€ sera 
                    effectuée à la fin de l'étude. Plus votre score sera élevé, plus grand sera le nombre de billets à votre nom, augmentant ainsi vos chances de gagner une des cartes cadeaux.
                    <br/><br/>

                    Une barre de progression comme celle à droite de l'écran vous permettra de connaître à tout moment vos performances par rapport à la moyenne des autres utilisateurs.
                    <br/><br/>

                
                    Une fois que vous êtes prêts, appuyez sur Démarrer.
                </p> 
                
                <Button className={classes.button} variant="contained" color="primary"  onClick={movingForward}> Démarrer</Button>
            </div>

            <div  className={classes.progressBarContainer}>
                <div  className={classes.progressBar}>
                <VerticalProgress color='blue' progress={progressBarExampleValue} />
                    <p>Votre score</p>
                </div>
                <div  className={classes.progressBar}>
                <VerticalProgress color='green' progress={progressBarExampleValue+8} />
                    <p>Score moyen</p>
                </div>                
            </div>
        </div>
        :null }

        <div>
            

        </div>
        {/* Buttons précédent et suivant*/}
        { (experienceStep !== 'beginning') && (experienceStep !== 'ended') ?
        <div>
                {getExperienceDiv()}
            
            <div className={classes.footerTask}>
                    <div className={classes.navigationButtonsContainer}>
                                        <div className={classes.backButton}>
                            {experienceStep !== testOrder[1]? 
                            <IconButton variant="contained" aria-label="arrow-back" onClick={movingBackward}>
                                    <ArrowBackIcon />
                                </IconButton>
                                :null}
                            </div>
                            <div className={classes.forwardButton}>
                            { experienceStep !== testOrder[7]?
                                <IconButton variant="contained" aria-label="arrow-forward" onClick={movingForward}>
                                    <ArrowForwardIcon />
                                </IconButton>
                                :null}
                            </div>
                    </div>
                </div>
            </div>
        :null}
    </div>

)}


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flex:1,
        flexDirection:"column",
        marginTop:"-4%",
        justifyContent:'flex-end',
        fontSize : 'large',
    },

    centered:{
        alignItems:'center',
        display:'flex',
        flex:3,
        flexDirection:'column'
    },
    bodyContainer:{
        alignItems:'center',
        display:'flex',
        flex:1,
        flexDirection:'row',
    },
    taskContainer:{
        alignItems:'center',
        display:'flex',
        flex:1,
        flexDirection:'row',
    },
    task:{
        display:'flex',
        flex:6,
        backgroundColor : '#DCDCDC',
        padding:15,
        border : 'solid',
        borderColor : "#C0C0C0",
        borderRadius: 25
    },
    progressBar:{
        marginLeft:"4%",
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },

    footerTask:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'flex-end',
        flexDirection:'column',
    }
 ,
    navigationButtonsContainer:{
        flexDirection:'row',
        display:'flex',
    },

    forwardButton:{
        display:'flex',
        flex:1,
        alignSelf:'flex-end',
        justifyContent:'flex-end'
    },
    progressBarContainer:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        marginLeft: 20,
        justifyContent:'center',
        alignItems:'center',
    },

    progressBar:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    }

})

 
export default withRouter(EmotionsPerformancesTasks);