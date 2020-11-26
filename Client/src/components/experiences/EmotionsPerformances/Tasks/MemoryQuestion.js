import React, { useState } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Exercice de la question de mémoire par rapport à la question des suites numériques

function MemoryQuestion(props)  {
    
    const classes = useStyles();
    const [memoryNumber, setMemoryNumber] = useState('')


    function handleChangeMemory(e){
        setMemoryNumber(e.target.value.replace(/\D/,''))
    }

    const handleSubmitMemory= (event) =>{
        event.preventDefault();

        var score = 0
        if(props.answer === memoryNumber){
            score = 25
        }

        props.sendDataToParent( memoryNumber, score, null) 
        /*la tricherie est gérée par le composant père (EmotionsPerformancesTasks) car c'est 
        ce composant qui contient les boutons Question suivante et précédente. On renvoit donc null*/
    }



return (
    <div className={classes.root}>
        <div className={classes.centered}>
            <p>Nous allons maintenant tester votre mémoire.<br/> 
            {props.question}
            </p>
            <form className={classes.form}  onSubmit={handleSubmitMemory}>
                <div className={classes.form} >
                    <label>
                        Réponse : <br/>
                        <input type="text" className={classes.button} name="memoryNumber"  value={memoryNumber} onChange={e=> handleChangeMemory(e)}/>
                    </label><br/><br/>
                    </div>
                <div className={classes.submitButton} >
                    <Button variant="contained" color="primary" type='submit'> Valider résultats </Button>
                </div>
            </form> 
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
    }
})

 
export default withRouter(MemoryQuestion);