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
    const [canadianQuestionAnswer1, setCanadianQuestionAnswer1] = useState('')
    const [canadianQuestionAnswer2, setCanadianQuestionAnswer2] = useState('')
    const [canadianQuestionAnswer3, setCanadianQuestionAnswer3] = useState('')

    
    useEffect(() => {
        // Check if user is going to another tab / switching focus 
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('blur', onBlur);
        };

    },[])


    function handleChange1(e){
        setCanadianQuestionAnswer1(e.target.value)
    }
    function handleChange2(e){
        setCanadianQuestionAnswer2(e.target.value)
    }
    function handleChange3(e){
        setCanadianQuestionAnswer3(e.target.value)
    }

    const handleSubmit= (event) =>{
        event.preventDefault();

        var score = 0
        //On regarde si la réponse de l'utilisateur est présent dans notre catalogue de réponse
        if(props.answer[0].indexOf(canadianQuestionAnswer1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1 ) { 
            score = score+ 25
        }
        if(props.answer[1].indexOf(canadianQuestionAnswer2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1 ) { 
            score =score+ 25
        }
        if(props.answer[2].indexOf(canadianQuestionAnswer3.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1 ) { 
            score =score+ 25
        }
        //on renvoit le résultat au composant parent qui se charge d'ajouter les résultats.
        props.sendDataToParent( [canadianQuestionAnswer1,canadianQuestionAnswer2, canadianQuestionAnswer3],score, cheated)
    }    
    

return (
    <div className={classes.root}>
        <div className={classes.centered}> 
            <p>Nous allons maintenant tester votre culture générale et notamment québécoise.
            </p> 
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.form} >
                    <br/> {props.question[0]}
                    <label>
                        Réponse : <br/>
                        <input type="text" name="canadianQuestionAnswer1"  className={classes.button} value={canadianQuestionAnswer1} onChange={e=> handleChange1(e)}/>
                    </label><br/><br/>
                    <br/> {props.question[1]}
                    <label>
                        Réponse : <br/>
                        <input type="text" name="canadianQuestionAnswer2"  className={classes.button} value={canadianQuestionAnswer2} onChange={e=> handleChange2(e)}/>
                    </label><br/><br/>
                    <br/> {props.question[2]}
                    <label>
                        Réponse : <br/>
                        <input type="text" name="canadianQuestionAnswer3"  className={classes.button} value={canadianQuestionAnswer3} onChange={e=> handleChange3(e)}/>
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