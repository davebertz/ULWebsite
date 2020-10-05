import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



function CanadianQuestion(props)  {
    
    const onBlur = () => {
        setCheated(1)
    };

    const classes = useStyles();
    const [cheated, setCheated] = useState(0)

    //Task 3
    const [canadianQuestionAnswer, setCanadianQuestionAnswer] = useState('')


    useEffect(() => {
        // Check if user is going to another tab / switching focus 
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('blur', onBlur);
        };

    },[])



    //Task 3
    function handleChange(e){
        setCanadianQuestionAnswer(e.target.value)
    }

    const handleSubmit= (event) =>{
        event.preventDefault();

        var score = 0
        if(props.answer.indexOf(canadianQuestionAnswer) > -1 ) { //On regarde si la réponse de l'utilisateur est présent dans notre catalogue de réponse
            score = 25
        }

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