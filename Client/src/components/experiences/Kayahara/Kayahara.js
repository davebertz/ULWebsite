import React, { useState, useRef, useEffect  } from "react";
import ReactPlayer from 'react-player/youtube';
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import {sendIntermittentResults,sendContinuousResults} from "../../../Utils"
import {videosTrial, videosTrialResults, videosContinuous, videosIntermittent, 
  videosIntermittentNames, videosContinuousNames} from "./Constants"
import { useHistory } from "react-router-dom";
 
function Kayahara(props)  {
  
  const history = useHistory();
  const classes = useStyles();
  const refPlayer = useRef(null)      //objet du player youtube (utile pour récup temps de la video + "aller à la seconde X")
  const [isPlaying,setIsPlaying]=useState(false)  
  const [url,setUrl]=useState('')  
  const [expeMode,setExpeMode]=useState('beginning')  //Varaible permettant de retracer l'étape actuelle de l'utilisateur
  //Variable de l'étape de test
  const [trialRes,setTrialRes]=useState('')
  const [trialCount,setTrialCount]=useState(0)
  const [trialTries,setTrialTries]=useState(0)
  //Variable de l'étape intermittent
  const [intermittentCount,setIntermittentCount]=useState(1)
  const [intermittentPress,setIntermittentPress]=useState([])
  const [intermittentVideoName,setIntermittentVideoName]=useState('')
  //Variable de l'étape continue
  const [continuousPress,setContinuousPress]=useState([])
  const [continuousVideoName,setContinuousVideoName]=useState('')

  //Affichage Texte
  const [showResult,setShowResult]=useState('')
  const [antiHoraire,setRotationAnti]=useState('')
  const [horaire,setRotationHoraire]=useState('')


  //Hook permettant de vérifier si l'utilisateur à appuyé sur une des touches directionnelles
  useEffect(() => {
    if(props === undefined || props.location.user === undefined){
        history.push("/experiences")
    }
    const handleKeyPress = (event) => {
      if(event.keyCode === 37 || event.keyCode===39 ){        
        if(expeMode === 'trial'){
          if(((trialRes[trialTries] === 'left' && event.keyCode === 37) || (trialRes[trialTries] === 'right' && event.keyCode === 39)) && trialCount<=9){ //On vérifie que le résultat attendu pour ce test de cette vidéo est bien celui rentré par l'utilisateur
            if(trialCount === 9){
              setExpeMode('toIntermittent')
              setIsPlaying(false)
              setShowResult('')
              setTrialCount(10)
            }else { //obligé de remettre une condition pour éviter bug lors d'appuie sur la touche à la fin du trial
              setShowResult('Correct !')
              choseTrialVideo()
              setTrialTries(trialTries+1)
              setTrialCount(trialCount+1)
              refPlayer.current.seekTo(3.5+((trialTries*3.5)))//Qu'importe le résultat, on avance la vidéo au début du prochain test (1 test / 5 secondes  + 2 secondes de fond noir au début de la vidéo)
            }
          }else{
            setShowResult('Incorrect !')
            setTrialTries(trialTries+1)
            setTrialCount(0)
            refPlayer.current.seekTo(3.5+((trialTries*3.5)))
          }
          
        }else if(expeMode === 'intermittent'){
          setShowResult((intermittentCount+1)+'/30')
          setIntermittentCount(intermittentCount +1)          
          let arrowDirection = event.keyCode===37 ? 'left' : (event.keyCode ===39 ? 'right' : null)
          setIntermittentPress(intermittentPress=> [...intermittentPress, {time : Math.round((refPlayer.current.getCurrentTime()+ Number.EPSILON) * 1000) / 1000, direction:arrowDirection}])
          if(intermittentCount === 29){
            setExpeMode('toContinuous')
            setIsPlaying(false)
            setShowResult('')
          }else{
            refPlayer.current.seekTo((3.5 * intermittentCount))
          }


        }else if (expeMode === 'continuous'){
          let arrowDirection = event.keyCode===37 ? 'left' : (event.keyCode ===39 ? 'right' : null)
          setContinuousPress(continuousPress => [...continuousPress, {time : Math.round((refPlayer.current.getCurrentTime()+ Number.EPSILON) * 1000) / 1000, direction:arrowDirection}])
          if(arrowDirection==='left'){
            setRotationHoraire('〈-- Rotation horaire')
            setRotationAnti('')
          }else{
            setRotationHoraire('')
            setRotationAnti(' Rotation anti-horaire --〉')
          }
          
        }
    }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [continuousPress, expeMode,trialCount,trialRes,trialTries, intermittentCount, history, props]);


  const choseTrialVideo=()=>{
    let randomNumber = Math.floor(Math.random() * Math.floor(videosTrial.length))
    setUrl(videosTrial[randomNumber])
    setTrialRes(videosTrialResults[randomNumber])
  }

  const choseIntermittentVideo=()=>{
    let randomNumber = Math.floor(Math.random() * Math.floor(videosIntermittent.length))
    setUrl(videosIntermittent[randomNumber])
    setIntermittentVideoName(videosIntermittentNames[randomNumber])
  }

  const choseContinuousVideo=()=>{
    let randomNumber = Math.floor(Math.random() * Math.floor(videosContinuous.length))
    setUrl(videosContinuous[randomNumber])
    setContinuousVideoName(videosContinuousNames[randomNumber])
  }

  const startExpe= () => {
    if(expeMode==="beginning"){
      setExpeMode('trial')
      choseTrialVideo()
      setIsPlaying(true)
    }else if (expeMode==="toIntermittent"){
      setShowResult(intermittentCount+'/30')
      setExpeMode('intermittent')
      choseIntermittentVideo()
      setIsPlaying(true)
    }else if (expeMode==="toContinuous"){
      setExpeMode('continuous')
      choseContinuousVideo()
      setIsPlaying(true)
    }
  }

  const videoProgress=(data)=>{

    if (expeMode === "trial"){
      if(data['playedSeconds'] > (trialTries+1) *3.5){
        setTrialTries(trialTries+1)
        setTrialCount(0)
      }
    }else if (expeMode === 'intermittent'){
      
      if(data['playedSeconds'] > (intermittentCount) *3.5){          
        if(intermittentCount === 29){
          setExpeMode('toContinuous')
          setIsPlaying(false)
          setShowResult('')
        }
        setIntermittentPress(intermittentPress=> [...intermittentPress, {time : Math.round((refPlayer.current.getCurrentTime()+ Number.EPSILON) * 1000) / 1000, direction:"No answer"}])
        setShowResult((intermittentCount+1)+'/30')
        setIntermittentCount(intermittentCount +1) 
      }
    }
  }

  const videoReady= () => {
    if(expeMode !== 'intermittent'){
      setShowResult('')
    }
  }

  const videoEnded= () => {
    if(expeMode==='trial'){
      window.location.reload()
      alert('Vous n\'avez pas réussi à obtenir un score suffisant, merci de recommencer les tests.')
    }else if(expeMode === 'continuous'){
      setExpeMode('done')
      setIsPlaying(false)
      sendContinuousResults(props.location.user.username,continuousVideoName, continuousPress)          
      sendIntermittentResults(props.location.user.username,intermittentVideoName, intermittentPress )
    }
  }

  return (
    <div >
      {(expeMode==='beginning' ||expeMode==='trial') ? <p>Dans l'expérience suivante, nous allons vous montrer une courte vidéo d'une silhouette effectuant des rotations. <br></br>
        Le but est de définir le sens de rotation de la silhouette à l'aide des touches flèches gauche et droite de votre clavier.
        Nous allons dans un premier temps effectuer une série de test avec une silhouette visible pour vous entraîner à définir le sens de rotation.
        <br></br>
        Si la silhouette semble tourner dans un sens horaire (vers la gauche), appuyez sur la flèche gauche. Appuyez sur la flèche droite pour le sens anti-horaire.
        A chaque bonne ou mauvaise réponse, un nouveau test sera présenté jusqu'à ce que vous complétiez la série. Essayez de vous entraîner à définir le plus rapidement possible le sens de la direction

        Vous avez 5 secondes pour donner votre réponse. Si aucune réponse n'est donné, cela est matérialisé par un échec.
      <br></br><br></br>
        Lorsque que vous êtes prêt, appuyez sur le bouton démarrer.
      </p>: null}

      {(expeMode==='intermittent'||expeMode==='toIntermittent')? <p> Félicitations ! 
        <br></br>
        Maintenant que vous avez réussi le test, nous allons vous présenter de la même manière une succession de 30 vidéos. Au début de chaque vidéo va apparaître une croix noir sur fond blanc.
        Vous devez fixer cette croix puis tenter de définir le plus rapidement possible le sens de rotation de la silhouette à l'aide des flèches droite et gauche.
        Vous avez maintenant 3 secondes pour répondre et chaque non-réponse correspond à un échec.
      <br></br><br></br>
        Lorsque que vous êtes prêt, appuyez sur le bouton démarrer.
      </p>: null}

      {(expeMode ==="continuous"||expeMode==='toContinuous')? <p>La dernière partie de cette expérience consiste en une vidéo d'une minute 30 secondes durant laquelle la silhouette précédente va effectuer des rotations.

      <br></br>
      Le but ici n'est plus de définir le sens de la rotation initiale mais de définir des changements de rotation. 
      Par exemple, si la silhouette semble tourner vers la droite puis changer de direction et tourner vers la gauche, appuyez le plus rapidement possible sur la flèche gauche.
      Appuyez à chaque changement de sens de rotation.
         
      <br></br><br></br>
        Lorsque que vous êtes prêt, appuyez sur le bouton démarrer.
      </p>: null}
      { (!isPlaying && expeMode!=='done')? <button className={classes.startButton} onClick={startExpe}> Démarrer</button> : null}

      { isPlaying ? 
        <div className={classes.videoContainer}>
          <p className={classes.rotaHoraire}> {horaire} </p>
          <div >
            <ReactPlayer key={url} 
                        ref={refPlayer}
                        url={url} 
                        controls={false} 
                        style={{ pointerEvents: 'none' }} 
                        playing={isPlaying} 
                        muted
                        onEnded={videoEnded}  
                        onProgress={e => videoProgress(e)}
                        onReady={videoReady} 
                        className={classes.video}
            />
          </div>
          <p className={classes.rotaAnti}>{antiHoraire}</p> 
          </div>
      : null }
      <p> {showResult}</p>

      {expeMode==='done' ? <p> Merci d'avoir participé à cette expérience !</p> : null}

      </div>
    )
    
}


 
const useStyles = makeStyles({

  startButton:{
    margin : '5%'
  },
  videoContainer:{
    margin : '3%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  video:{
    flex: 2
  },
  rotaHoraire:{
   padding:'30px',
   flex:2
  },
  rotaAnti:{
    padding:'30px',
    flex:2
  }
});

 
export default withRouter(Kayahara);