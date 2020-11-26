import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Exercice d'exercice de question de culture générale sur le Québec/Canada

function CanadianQuestion(props)  {
    
    //Condition de triche : si l'utilisateur active la fonction onBlur, cela signifie que notre page à perdu le focus
    // (changement d'onglet, changement de fenêtre)
    const onBlur = () => {
        setCheated(1)
    };

    const classes = useStyles();
    const [cheated, setCheated] = useState(0)
    const [canadianQuestionAnswer, setCanadianQuestionAnswer] = useState('')

    
    useEffect(() => {
        // Check if user is going to another tab / switching focus 
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('blur', onBlur);
        };

    },[])


    function handleChange(e){
        setCanadianQuestionAnswer(e.target.value)
    }

    const handleSubmit= (event) =>{
        event.preventDefault();

        var score = 0
        //On regarde si la réponse de l'utilisateur est présent dans notre catalogue de réponse
        if(props.answer.indexOf(canadianQuestionAnswer) > -1 ) { 
            score = 25
        }
        //on renvoit le résultat au composant parent qui se charge d'ajouter les résultats.
        props.sendDataToParent( canadianQuestionAnswer,score, cheated)
    }    
    

return (
    <div className={classes.root}>
        <div className={classes.centered}> 
            <p>Nous allons maintenant tester votre culture générale québécoise et canadienne.
                <br/> {props.question}
            </p> 
            <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.form} >
                    <label>
                        Réponse : <br/>
                        <input type="text" name="canadianQuestionAnswer"  className={classes.button} value={canadianQuestionAnswer} onChange={e=> handleChange(e)}/>
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

 
export default withRouter(CanadianQuestion);