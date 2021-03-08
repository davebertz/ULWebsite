import React, { useState, useRef, useEffect,  useCallback  } from "react";
import { withRouter } from "react-router";
import Webcam from 'react-webcam';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import {sendFeelingsScreenshots,createUserFeedbackEntry, sendUserInfos} from "../../../Utils"
import {feelings, questionNumerical, answerNumerical, questionCanadaCulture,
    answercanadaCulture,questionLetter,tWords,fWords,questionMemory, questionDefinition,googleDefinitionForApagogie,googleDefinitionForLallation, beforeTaskForm } from "./Constants"
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import LikertScale from "../../Likert";

//Ceci est le premier écran de l'expérience d'Intelligence Emotionnelle.
//On y invite l'utilisateur à se imiter des émotions et se prendre en photo.
//C'est également dans ce fichier que l'on choisit aléatoirement les questions pour la suite du test.
//On y associe également les réponses

function EmotionsPerformancesScreen(props)  {

    useEffect(() => {
        if(props === undefined || props.location.user === undefined){
            history.push("/experiences")
        }

    })

    const classes = useStyles();
    const history = useHistory();
    const [tileData, setTileData]=useState([])
    const [errorMessage, setErrorMessage]= useState('')
    const [userEmail, setUserEmail]=useState('')
    const [userAge, setUserAge]= useState('')
    const [userGender, setUserGender]= useState('')
    const [userStatus, setUserStatus]= useState('')
    // Initialisation des réponses de l'utilisateur à 7 : moyennement important car valeur de base. 
    const [userFormAnswers, setUserFormAnswers]= useState(new Array(beforeTaskForm.length).fill(4)) 
    const [experienceStarted,setExperienceStarted]=useState(false)
    const [screenshotSession,setScreenshotSession]=useState(false)
    const [compteurScreenshots, setCompteur]=useState(1)
    const [currentFeeling,setCurrentFeeling]=useState(feelings[compteurScreenshots-1])

    //TODO : déplacer cette fonction plus en amont dans le scénario nominal
    const defineQuestions=()=>{
        /*On crée un dictionnaire avec les questions et les réponses aléatoirement piochées. 
        Certaines tâches ne changent pas selon la série et ne sont donc pas concernées.
        Voici l'architecture du dictionnaire de chacune des deux séries. 
        */
        const firstSerie={"Questions":
                            {"numerical": null,"canadaCulture":[], "letter":null,"memory":null, "definition":null}, 
                          'Answers':
                            {"numerical":null,"canadaCulture":[],'letter':null,"memory":null, "definition":null}}
        const secondSerie={"Questions":
                            {"numerical": null,"canadaCulture":[], "letter":null,"memory":null, "definition":null}, 
                          'Answers':
                            {"numerical":null,"canadaCulture":[],'letter':null,"memory":null, "definition":null}}

        var rand = Math.floor(Math.random() * Math.floor(2))
        var randNumerical = rand        
        firstSerie["Questions"]["numerical"] = questionNumerical[rand]
        firstSerie["Answers"]["numerical"] = answerNumerical[rand]
        secondSerie["Questions"]["numerical"] = questionNumerical[(rand+1)%2]
        secondSerie["Answers"]["numerical"] = answerNumerical[(rand+1)%2]

        var rand2 = [];
        while(rand2.length < 6){
            var r = Math.floor(Math.random() * 13) + 1;
            if(rand2.indexOf(r) === -1) rand2.push(r);
        }
        firstSerie["Questions"]["canadaCulture"][0] = questionCanadaCulture[rand2[0]]
        firstSerie["Answers"]["canadaCulture"][0] = answercanadaCulture[rand2[0]]
        firstSerie["Questions"]["canadaCulture"][1] = questionCanadaCulture[rand2[1]]
        firstSerie["Answers"]["canadaCulture"][1] = answercanadaCulture[rand2[1]]
        firstSerie["Questions"]["canadaCulture"][2] = questionCanadaCulture[rand2[2]]
        firstSerie["Answers"]["canadaCulture"][2] = answercanadaCulture[rand2[2]]

        secondSerie["Questions"]["canadaCulture"][0] = questionCanadaCulture[rand2[3]]
        secondSerie["Answers"]["canadaCulture"][0] = answercanadaCulture[rand2[3]]
        secondSerie["Questions"]["canadaCulture"][1] = questionCanadaCulture[rand2[4]]
        secondSerie["Answers"]["canadaCulture"][1] = answercanadaCulture[rand2[4]]
        secondSerie["Questions"]["canadaCulture"][2] = questionCanadaCulture[rand2[5]]
        secondSerie["Answers"]["canadaCulture"][2] = answercanadaCulture[rand2[5]]

        var rand3 = Math.floor(Math.random() * Math.floor(2))
        firstSerie["Questions"]["letter"] = questionLetter[rand3]
        secondSerie["Questions"]["letter"] = questionLetter[(rand3+1)%2]

        if(firstSerie["Questions"]["letter"] === 't'){
            firstSerie["Answers"]["letter"] = tWords
            secondSerie["Answers"]["letter"] = fWords
        }else{
            firstSerie["Answers"]["letter"] =fWords
            secondSerie["Answers"]["letter"] = tWords
        }

        var rand4 = Math.floor(Math.random() * Math.floor(2))
        firstSerie["Questions"]["memory"] = questionMemory[rand4]
        secondSerie["Questions"]["memory"] = questionMemory[(rand4+1)%2]

        //Cette question dépend également de la question choisie pour les suites numériques. Il y a donc 4 possibilités de réponses
        if(randNumerical === 0){ //On vérifie la série choisie pour la question sur les suites numériques en regardant la première réponse
            if(rand4===0){ 
                firstSerie["Answers"]["memory"] = '4' //Le deuxième nombre de la deuxième suite numérique (question mémory 1) de la suite choisie pour cette série (question numerical 1) est 4
                secondSerie["Answers"]["memory"] = '240'
            }else {
                firstSerie["Answers"]["memory"] = '121'
                secondSerie["Answers"]["memory"] = '300'
            }
        }else{
            if(rand4===0){ 
                firstSerie["Answers"]["memory"] = '300'
                secondSerie["Answers"]["memory"] = '121'
            }else {
                firstSerie["Answers"]["memory"] = '240'
                secondSerie["Answers"]["memory"] = '4'
            }
        }


        rand = Math.floor(Math.random() * Math.floor(2))
        firstSerie["Questions"]["definition"] = questionDefinition[rand]
        secondSerie["Questions"]["definition"] = questionDefinition[(rand+1)%2]

        if(firstSerie["Questions"]["definition"] === 'lallation'){
            firstSerie["Answers"]["definition"] = googleDefinitionForLallation
            secondSerie["Answers"]["definition"] = googleDefinitionForApagogie
        }else{
            firstSerie["Answers"]["definition"] = googleDefinitionForApagogie
            secondSerie["Answers"]["definition"] = googleDefinitionForLallation
        }

        return [firstSerie, secondSerie]
    }

    const videoConstraints = {
        width: 550,
        height: 360,
        facingMode: "user"  
        };
        
    const webcamRef = useRef(null);
    
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot({width: 550, height: 360});
            setCurrentFeeling(feelings[compteurScreenshots])
            setTileData(tileData => [...tileData, {img : imageSrc, title:feelings[compteurScreenshots-1]}])
            setCompteur(compteurScreenshots+1)
            if(compteurScreenshots === feelings.length){
                setScreenshotSession(false)
            }
        },
        [webcamRef, compteurScreenshots ]
    );

    const startExpe= () => {
        if(validateForm()){
             setExperienceStarted(true)
             setScreenshotSession(true)
             sendUserInfos(props.location.user.username,userEmail, userGender, userAge, userStatus )
             createUserFeedbackEntry(props.location.user.username,userFormAnswers )
         }
       
    }


    function validateForm(){
        var isValid=true

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!regex.test(userEmail)){
            isValid = false
            setErrorMessage("Merci de rentrer un format d'adresse mail valide")
        }
        if(userGender === '' || userAge === '' || userStatus === ''){
            isValid = false
            setErrorMessage("Merci de remplir tous les champs")
        }
       
        return isValid

    }

    function handleUserEmail(e){
        setUserEmail(e.target.value)
        
    }
    function handleChangeAge(e){
        setUserAge(e.target.value)  
    }

    function handleChangeGender(e){
        setUserGender(e.target.value)     
    }

    function handleChangeUserStatus(e){
        setUserStatus(e.target.value) 
    }
    

    //On appelle la fonction permettant d'envoyer les résultats à écrire en BD (grâce à un appel à l'API)
    //On appelle également la fonction permettant d'ajouter en BD le username et son email
    //Ensuite on passe à la suite de l'expérience en renseignant les questions réponses pour les 2 séries
    const sendResult=()=>{
        for (var i=0; i<tileData.length; i++){
            sendFeelingsScreenshots(props.location.user.username, tileData[i]['title'],tileData[i]['img'] )
        }
        
        var series = defineQuestions()
        history.push({pathname:"/experience/EmotionsPerformances",
            user : props.location.user,
            actualSerie : series[0],
            nextSerie : series[1]
            })
         
    }

    //Fonction callback appelé par les composants LikerScale lorsqu'une nouvelle valeur est cochée.
    //Permet de mettre à jour les résultats de l'utilisateur.
    const handleFormAnswerChange=(id,value)=>{
        console.log(id)
        console.log(value)
        let newUserAnswers = [...userFormAnswers]; 
        newUserAnswers[id] = value
        console.log(newUserAnswers)
        setUserFormAnswers(newUserAnswers)
        console.log(userFormAnswers)
    }


    function getAllLikertScale(){
        var responses= [
            { value: 1, text: "Pas du tout important" },
            { value: 2, text: "Très peu important" },
            { value: 3, text: "Un peu important"},
            { value: 4, text: "Moyennement important", checked: true  },
            { value: 5, text: "Assez important" },
            { value: 6, text: "Important" },
            { value: 7, text: "Très important" }
          ]

        var likertList = []
        for (var i=0; i<beforeTaskForm.length; i++){
            var likertOptions = {id:i,
                                answers: responses, 
                                question :beforeTaskForm[i],
                                onChange:handleFormAnswerChange,
                                }
            likertList.push(<LikertScale key={likertOptions.id} likertOptions={likertOptions}></LikertScale>)

        }

        return likertList

    }

       

return (
    <div className={classes.root}>   
        { experienceStarted === false ? <div>
            <p>
            Bienvenue dans l'expérience portant sur la logique et les émotions. Attention, ce test peut vous faire vivre des émotions négatives.<br/> 
            Nous allons dans un premier temps vous demandez d'accéder à votre webcam 
            afin de prendre une photo de vous exprimant plusieures expressions faciales. 
            Merci de ne pas exagérer vos émotions et de les rendre le plus réaliste possible.<br/>
            Si vous ne possédez pas de webcam sur cet ordinateur ou si vous n’êtes pas disposés à nous en donner l’accès, l'expérience ne sera pas possible.
            Merci tout de même pour votre intérêt.<br/><br/><br/>
            Nous allons maintenant vous demander de renseigner quelques informations démographiques utiles pour les statistiques
            des personnes testées. Un mail avec l'accès au test vous sera ensuite envoyé.<br/><br/></p>
            <div>
                <form>
                    <label>
                        Email :<br/>
                        <input type="text" placeholder="Email" name="userEmail"  value={userEmail} onChange={e=> handleUserEmail(e)}/>
                    </label><br/>
                    <label>
                        Tranche d'âge :<br/>
                        <select name="userAge"  value={userAge} onChange={e=> handleChangeAge(e)}>
                            <option value=""></option>
                            <option value="18-21">18-21 ans</option>
                            <option value="22-25">22-25 ans</option>
                            <option value="26-29">26-29 ans</option>
                            <option value="30+">30 ans et plus</option>
                        </select>
                    </label>    <br/>
                    <label>
                        Genre :<br/>
                        <select name="userGender"  value={userGender} onChange={e=> handleChangeGender(e)}>
                            <option value=""></option>
                            <option value="male">Homme</option>
                            <option value="female">Femme</option>
                            <option value="other">Autre / Je préfère ne pas répondre</option>
                        </select>
                    </label><br/>
                    <label>
                        Je suis :<br/>
                        <select name="userStatus"  value={userStatus} onChange={e=> handleChangeUserStatus(e)}>
                            <option value=""></option>
                            <option value="quebec">Un.e étudiant.e québécois.e </option>
                            <option value="exchange">Un.e étudiant.e en échange étudiant</option>
                            <option value="international">Un.e étudiant.e international.e</option>
                        </select>            
                    </label><br/><br/>
                    

                    <p>Chaque individu a des buts à long terme ou des aspirations. Il s’agit des choses que les gens
                        souhaitent accomplir au cours de leur vie. Les items suivants présentent une liste d’objectifs de
                        vie, indiquez jusqu’à quel point chacun d’eux est important pour vous.
                    </p><br/>
                    <div className={classes.form}>
                        {getAllLikertScale()}
                    </div>
                </form>
            </div>
            <br/>
        </div> :null }
        { experienceStarted === false ? <div>
            <p style={{ color: 'red' }}>{errorMessage}</p>
            <Button variant="contained"  color="primary" className={classes.startButton} onClick={startExpe}> Démarrer</Button> 
            
            </div>
            : null}

        
        { screenshotSession === true ? 
        <div>
            <p> Veuillez vous prendre en photo à l'aide du bouton "capture image" en réalisant une expression représentant :</p>
            <p> <b>{currentFeeling}</b></p>
        <Webcam
            audio={false}
            height={360}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/jpeg"
            width={640}
            videoConstraints={videoConstraints}
      /></div>: null }
      { screenshotSession === true ? <div><Button variant="contained" color="primary" onClick={capture}>Capture photo</Button> </div>: null }
      
      <GridList className={classes.grid} cellHeight={150} cols={4} >
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
            />
          </GridListTile>
        ))}
      </GridList>

      { (screenshotSession === false) && (experienceStarted === true)? <div><Button variant="contained" color="primary" onClick={sendResult}>Passer à la suite</Button> </div>: null }

    </div>
    )

}


const useStyles = makeStyles({

    startButton:{
      margin : '5%',

      flexWrap: 'wrap'
    },
    grid:{
        margin:'5%'
    },
    root: {
        display: 'flex',
        flexDirection:"column",
        justifyContent:'center',
        alignItems : 'center',
      },
      gridList: {
        width: 500,
        height: 450,
      },
    form:{
        backgroundColor : '#DCDCDC',
        padding:15,
        border : 'solid',
        borderColor : "#C0C0C0",
        borderRadius: 25
    }
})

 
export default withRouter(EmotionsPerformancesScreen);