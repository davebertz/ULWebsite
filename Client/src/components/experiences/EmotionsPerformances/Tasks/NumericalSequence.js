import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Exercice sur les suite numériques

function NumericalSequences(props)  {
    
    //Condition de triche : si l'utilisateur active la fonction onBlur, cela signifie que notre page à perdu le focus
    // (changement d'onglet, changement de fenêtre)
    const onBlur = () => {
        setCheated(1)
    };

    const classes = useStyles();
    const [cheated, setCheated] = useState(0)

    //Task 2
    const [missingNumber1, setMissingNumber1] = useState('')
    const [missingNumber2, setMissingNumber2] = useState('')


    useEffect(() => {
        // Check if user is going to another tab / switching focus 
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('blur', onBlur);
        };

    },[])


    function handleChangeMissing1(e){
        setMissingNumber1(e.target.value.replace(/\D/,''))    //Seuls les chiffres sont acceptés   
    }
    function handleChangeMissing2(e){
        setMissingNumber2(e.target.value.replace(/\D/,''))
    }

    const handleSubmitNumericalSequences= (event) =>{
        event.preventDefault();
        var result = [missingNumber1, missingNumber2]

        var score = 0
        if(props.answer[0] === result[0]){
            score = score +10
        }
        if(props.answer[1] === result[1]){
            score = score +15
        }
        props.sendDataToParent( result,score, cheated)
    }   



return (
    <div className={classes.root}>
        <div className={classes.centered}> 
            <p>
                Voici deux suites numériques.
                Pour chacune des deux, écrivez dans le champ correspond le chiffre manquant sans vous aider d'internet.
            </p> 
            <form className={classes.form} onSubmit={handleSubmitNumericalSequences}>
                <div className={classes.form}>
                    <label>
                        {props.series[0]}<br/>
                        <input type="text" name="missingNumber1"  value={missingNumber1} onChange={e=> handleChangeMissing1(e)}/>
                    </label>
                    <br/><br/>                
                    <label>
                        {props.series[1]}
                        <br/>
                        <input type="text" name="missingNumber2"  className={classes.button} value={missingNumber2} onChange={e=> handleChangeMissing2(e)}/>
                    </label><br/><br/>
                </div>
                <div className={classes.submitButton}>
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

 
export default withRouter(NumericalSequences);