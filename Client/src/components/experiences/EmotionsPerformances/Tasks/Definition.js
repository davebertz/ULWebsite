import React, { useState } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import stringSimilarity from 'string-similarity'

//Exercice de rédifinition d'un mot par ses propres termes

function Definition(props)  {


    const classes = useStyles();
    const [definition, setDefinition] = useState('')

    function handleChangeDefinition(e){
        setDefinition(e.target.value)
    }

    const handleSubmitDefinition= (event) =>{
        event.preventDefault();
        
        //La méthode de tricherie de cette exercice consiste à comparer la réponse de l'utilisateur avec 
        //les premières définitions google afin de savoir si il a fait un copier coller 
        var hasUserPlagiarized = isDefinitionSimilar(definition, props.answer)
        props.sendDataToParent(definition, 20, hasUserPlagiarized)
    }



    //La librairie stringSimilarity renvoie un coefficient de similarité entre un string et tous les autres 
    //strings donnés en paramètres dans un tableau. On a défini des valeurs seuils pour estimer la triche de l'utilisateur
    //après plusieurs tests. Au délà de 0.85 de similarité, une grande majorité du texte à été copié collé
    const isDefinitionSimilar=(userDefinition, wordDefinitions)=>{
        var res = stringSimilarity.findBestMatch(userDefinition,wordDefinitions)
        var hasCheated = 0
        if(res['bestMatch']['rating']>0.85){
          hasCheated = 2
        } else if (res['bestMatch']['rating']>0.65){
          hasCheated = 1
        }
        
        return hasCheated
      }
      


return (
    <div className={classes.root}>
        <div className={classes.centered}>
            <p>Pour ce dernier exercice, nous allons vous demander de définir avec vos propres termes le mot suivant :<b> {props.word}</b>.<br/>
            Vous avez le droit d'aller regarder sur internet si vous ne connaissez pas le sens de ce mot
            </p> 
            <form className={classes.form} onSubmit={handleSubmitDefinition}>
                <div  className={classes.form}> 
                    <label>
                        Réponse : <br/>
                        <textarea type="text" className={classes.button} name="definition" cols="50" rows="10" value={definition} onChange={e=> handleChangeDefinition(e)}/>
                    </label><br/><br/>
                </div>
                <div  className={classes.submitButton}>
                    <Button variant="contained" color="primary" type="submit"> Valider résultats </Button>
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

 
export default withRouter(Definition);