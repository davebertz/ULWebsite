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
import {sendEmotionalIntelligenceResults} from '../../../Utils'
import WheelOfFortune from "./Tasks/WheelOfFortune";
import VerticalProgress from "../../VerticalProgressBar";



function IntelligenceEmotionnelleTasks(props)  {
    

    const classes = useStyles();
    const history = useHistory();
    const [experienceStep, setExperienceStep]= useState('beginning');
    const [experienceStepCount, setExperienceStepCount]= useState(0);
    const [cheat, setCheat] = useState([])
    const [tasksResults, setTaskResults] = useState([])
    const [startTimer, setStartTimer] = useState(false)
    const [memoryCheat, setMemoryCheat] = useState(0)
    const [secondTest, setSecondTest] = useState(false)
    const [testOrder, setTestOrder]=useState()
    const [progressBarExampleValue, setprogressBarExampleValue]=useState(0)
    const [progressBarValue, setprogressBarValue]=useState(0)
    const progressExampleValues = [5,16,24,43,66,78,98,100]
    

    useEffect(() => {
        console.log(props)  
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
            setSecondTest(true)
            var questions = ['beginning','numericalSequences','definition','CanadianQuestion','memoryQuestion','headOrTail','fortuneWheel','timerWord']
            setTestOrder(questions)
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


    const addResult=(result, score, hasCheated)=>{
        if(experienceStep==='memoryQuestion'){
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


    const movingForward= () => {

        //On vérifie si la série et l'expérience sont terminées 
        if(experienceStepCount+1 === testOrder.length){
            if(secondTest){
                sendEmotionalIntelligenceResults(props.location.user.username,props.location.actualSerie["Questions"], tasksResults, cheat, true, props.location.givenSanction )
                history.push({pathname:"/experience/intelligenceemotionnellefeedback",
                                user : props.location.user.username,
                                sanctionGiven : props.location.givenSanction
                })
            }else{
                sendEmotionalIntelligenceResults(props.location.user.username, props.location.actualSerie["Questions"], tasksResults, cheat, false, null )
                console.log("sent")
                history.push({pathname:"/experience/intelligenceemotionnelleresults",
                            user : props.location.user,
                            actualSerie: props.location.nextSerie})
                }
                      
        }
        setStartTimer(false)
        setExperienceStep(testOrder[experienceStepCount+1])
        setExperienceStepCount(experienceStepCount+1)
    }

    const movingBackward= () => {
        if(experienceStep === "memoryQuestion"){ //on détecte la triche pour la tâche MemoryQuestion
            setMemoryCheat(1)
            setExperienceStep('timerWord')
        }  
        setStartTimer(false)
        setExperienceStep(testOrder[experienceStepCount-1])
        setExperienceStepCount(experienceStepCount-1)
    }

    function getExperienceDiv(){
        var taskComponent = null
        if(experienceStep==="headOrTail"){              /* Task number 1 */
            taskComponent = <HeadOrtail sendDataToParent={addResult}> </HeadOrtail>
        }else if(experienceStep==="numericalSequences"){        /* Task number 2  */
            taskComponent = <NumericalSequence series={props.location.actualSerie["Questions"]["numerical"]} answer={props.location.actualSerie["Answers"]["numerical"]} sendDataToParent={addResult}> </NumericalSequence>
        }else if(experienceStep==="CanadianQuestion"){        /* Task number 3 */
            taskComponent =  <CanadianQuestion question={props.location.actualSerie["Questions"]["canadaCulture"]} answer={props.location.actualSerie["Answers"]["canadaCulture"]} sendDataToParent={addResult}></CanadianQuestion>
        }else if(experienceStep==="timerWord"){        /* Task number 4 */
            taskComponent = <TimerWord letter={props.location.actualSerie["Questions"]["letter"]} answer={props.location.actualSerie["Answers"]["letter"]} callbackStart={goTimer} startTimer={startTimer} sendDataToParent={addResult}></TimerWord>
        }else if(experienceStep==="memoryQuestion"){        /* Task number 5 */
            taskComponent = <MemoryQuestion  question = {props.location.actualSerie["Questions"]["memory"]} answer={props.location.actualSerie["Answers"]["memory"]} sendDataToParent={addResult}></MemoryQuestion>
        }else if(experienceStep==="definition"){        /* Task number 6 */
            taskComponent = <Definition  word={props.location.actualSerie["Questions"]["definition"]} answer={props.location.actualSerie["Answers"]["definition"]} sendDataToParent={addResult}></Definition>
        }else if(experienceStep==="fortuneWheel"){        /* Task number 7 */
            taskComponent = <WheelOfFortune   sendDataToParent={addResult}></WheelOfFortune>
        }


        return <div className={classes.bodyContainer}>
            <div className={classes.task}>
            {taskComponent}
            </div>
            <div  className={classes.progressBar}>
                <VerticalProgress progress={progressBarValue} />
                <p>Progression</p>
            </div>
        </div>
    }

return (
    <div className={classes.root}>   

        {/* Debut de l'expérience  */}
        { experienceStep === 'beginning' ?
        <div className={classes.taskContainer}>
            <div className={classes.centered}> 
                <p>
                    Nous allons maintenant passer à la suite de l'expérience.<br/>
                    Vous allez devoir effectuer deux séries d'exercices simples qui ont pour but de tester votre mémoire et votre réflexion.
                    Le but de l’expérience est d’accumuler des points. À la fin de l’expérience, un certain nombre de point équivaudra à une récompense. 
                    <br/><br/>
                    0-499 points : remerciement et attestation de participation<br/>
                    500-999 points : carte cadeau Renaud-Bray en ligne de 5$<br/>
                    1000+ points : carte cadeau Renaud-Bray en ligne de 10$<br/>
                    <br/><br/>
                    Une barre de progression comme celle à droite de l'écran vous permettra de connaître à tout moment votre progression.
                    Lorsque la barre est remplie à 50%, cela signifie que vous avez accompli le premier objectif de 500 points. 
                    Si la barre atteint les 100%, alors vous avez atteint 1000 points ou plus.
                    <br/><br/>

                
                    Une fois que vous êtes prêts, appuyez sur Démarrer.
                </p> 
                
                <Button className={classes.button} variant="contained" color="primary"  onClick={movingForward}> Démarrer</Button>
            </div>
            <VerticalProgress progress={progressBarExampleValue} />
        </div>
        :null }

        <div>
            

        </div>
        {/* Buttons */}
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
    },

    centered:{
        alignItems:'center',
        display:'flex',
        flex:1,
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
    }

})

 
export default withRouter(IntelligenceEmotionnelleTasks);