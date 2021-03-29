import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Exercice de vocabulaire en temps limité

function TimerWord(props)  {
    
    const classes = useStyles();
    const [cheated, setCheated] = useState(0)
    const [wordWritten, setWordWritten] = useState('')
    const [listWord, setListWord] = useState('')
    const [endingWord, setEndingWord] = useState(true)

    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(30);
      
    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;
    
        const intervalId = setInterval(() => {
            if(timeLeft>0 && props.startTimer){ //c'est le props.startTimer issu du composant parent
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [timeLeft, props.startTimer]);



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
            if(timeLeft === 0){
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
            <p>Ecrivez un maximum de mots commençant par la lettre "{props.letter}" en moins de 30 secondes.</p>
             
             <div className={classes.horizontalContainer}>
                <div className={classes.verticalContainer}>
                <form  className={classes.form} onSubmit={handleSubmitWordList}>
                    <label>
                        Réponse : <br/>
                        <input className={classes.button} type="text" name="wordInput"  value={wordWritten} onChange={e=> handleChangeWord(e)}/>
                    </label><br/><br/>
                    </form>
                    {!props.startTimer ? <Button className={classes.buttonStart} onClick={startTimer} variant="contained" color="primary" name="wordInput" value="Démarrer" >Démarrer </Button>:null}
                    <Button className={classes.button} variant="contained" color="primary" name="wordInput" type="submit" value="Ajouter mot" >Ajouter mot </Button>
                    </div>
                    <div className={classes.wordsFound}>
                        <p> Mots commençant par "{props.letter}" déjà trouvés : {listWord}</p>
                    </div>
                
            </div>
            
            <p>Compte à rebours : <b>{timeLeft}</b> secondes restantes</p>
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
    },
    verticalContainer:{
        flexDirection:'column',
        display:'flex',
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor : '#FFE4E1',
        padding:15,
        border : 'solid',
        borderColor : "#FFC0CB",
        borderRadius: 25
    },
    horizontalContainer:{
        flexDirection:'row',
        display:'flex',
        flex:1,
    },
    wordsFound:{
        display:'flex',
        flex:2,
        justifyContent:'center',
        alignItems:'center',
    },
})

 
export default withRouter(TimerWord);