import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Exercice de vocabulaire en temps limité

function TimerWord(props)  {
    
    const classes = useStyles();
    const [cheated, setCheated] = useState(0)
    const [wordWritten, setWordWritten] = useState('')
    const [timerSec, setTimerSec] = useState(30)
    const [listWord, setListWord] = useState('')
    const [endingWord, setEndingWord] = useState(true)


    //Fonction de décrémentation du timer (une fois que l'utilisateur à appuyer sur démarrer)
    useEffect(() => {
        var once = true
        const intervalId = setInterval(() => {
            if(timerSec>0 && props.startTimer){ //c'est le props.startTimer issu du composant p
                setTimerSec(timerSec - 1);
            }else if (timerSec===0 && once ){ //Le once permet de n'avoir la notification audio qu'une seule fois et non toutes les secondes
                once = false
                var audio = new Audio(require("../../../../audio/timeup.mp3"))
                audio.play()
            }
        }, 1000); // 1000 correspond au temps entre chaque appel (en millisecondes)

        return () => {
            clearInterval(intervalId);
        };

    },[timerSec, props])



    function handleChangeWord(e){
        setWordWritten(e.target.value)
    }

    const startTimer=()=>{
        props.callbackStart() 
        //On appelle une fonction du composant parent pour mettre à jour la variable de début de timer
        //On est obligé de faire ça pour éviter des problèmes de scope (variable non mise à jour)
    }


    const handleSubmitWordList= (event) =>{
        event.preventDefault();
        //On vérifie que le mot existe dans notre liste de vocabulaire et que l'utilisateur ne l'a pas déjà rentré
        if(props.answer.includes(wordWritten) && !listWord.includes(wordWritten+", ")){
            setListWord(listWord => [...listWord,wordWritten+", " ])
            if(timerSec === 0){
                if(endingWord){//If user is finishing his current word
                    setCheated(1)
                    setEndingWord(false)
                }else{ // if user is writing new word while timer is over
                    setCheated(2)
                }
            }
            //Si l'utilisateur n'a jamais appuyé sur démarrer, on estime qu'il a triché
            if(props.startTimer === false){
                setCheated(2)
            }
        }
        setWordWritten('')//reset du champs d'input 
    }    

    function handleSubmitWordListEnd(){
        props.sendDataToParent( listWord,listWord.length*1.5, cheated)
    }




return (
    <div  className={classes.root}>
        <div className={classes.centered}>
            <p>Ecrivez un maximum de mots commençant par la lettre "{props.letter}" en moins de 30 secondes. Vous recevrez un signal sonore à la fin du temps imparti.</p>
             
            <p> Mots commençant par "{props.letter}" déjà trouvés : {listWord}</p>
            <form  className={classes.form} onSubmit={handleSubmitWordList}>
                <label>
                    Réponse : <br/>
                    <input className={classes.button} type="text" name="wordInput"  value={wordWritten} onChange={e=> handleChangeWord(e)}/>
                </label><br/><br/>
                {!props.startTimer ? <Button className={classes.buttonStart} onClick={startTimer} variant="contained" color="primary" name="wordInput" value="Démarrer" >Démarrer </Button>:null}
                <Button className={classes.button} variant="contained" color="primary" name="wordInput" type="submit" value="Ajouter mot" >Ajouter mot </Button>
               
                <p>Compte à rebours : <b>{timerSec}</b> secondes restantes</p>
            </form>
            
            
            <div className={classes.submitButton}>
                    <Button variant="contained" color="primary" onClick={handleSubmitWordListEnd}> Valider résultats </Button>
            </div>
         </div>
    </div>

)}


const useStyles = makeStyles({
    root:{
        display:'flex',
        flex:1,
        flexDirection:'column'
    },
    centered:{
        alignItems:'center',
        display:'flex',
        flex:1,
        flexDirection:'column'
    },
    submitButton:{
        alignSelf:'center',
        justifyContent:'flex-end',
    },
    form:{
        display:'flex',
        flex:1,
        flexDirection:'column',
    },
    buttonStart:{
        marginBottom:10
    }
})

 
export default withRouter(TimerWord);