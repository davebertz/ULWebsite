import React, { useState } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Exercice du lancer de pièce

function HeadOrTail(props)  {

    const classes = useStyles();

    const [totalHoT, setTotalHoT] = useState(0)
    const [counterHoTThrows, setCounterHoTThrows] = useState(0)
    const [coinValue, setCoinValue] = useState('')
    const [hotSrc, setHotSrc] = useState(require('../../../../images/coin-spin.gif'))


    const handleClick=(event)=>{
        event.preventDefault()
        var hasCheated = 0
        if(counterHoTThrows > 10){
            hasCheated = 2
        } else if( counterHoTThrows > 8){
            hasCheated = 1
        }

        props.sendDataToParent( totalHoT, totalHoT/10, hasCheated)
    }

    const headOrTailThrow=()=>{

        const rand = Math.floor(Math.random() * Math.floor(2))
        if(rand === 1){
            setCoinValue('Pile')
            setTotalHoT(totalHoT+5)
            setHotSrc(require('../../../../images/pile.png'))
        }else if (rand === 0){
            setCoinValue('Face')
            setTotalHoT(totalHoT+25)
            setHotSrc(require('../../../../images/face.png'))
        }
        setCounterHoTThrows(counterHoTThrows+1)
    }


return (
    <div className={classes.root}>
        <div className={classes.root}>
            <div className={classes.hotContainer}> 
                <p>
                    Pour ce premier exercice, vous allez pouvoir lancer une pièce en appuyant sur le bouton "Lancer la pièce". 
                    Si le résultat est pile, vous gagnez 25 points, si le résultat est face, vous gagnez 5 points.<br/>
                    Faites 7 lancers puis passez à l'exercice suivant.
                </p> 
                <div className={classes.coinHorizontal}>
                    <div className={classes.coinVertical}>
                        <p><b>{coinValue}</b></p>
                        <p> Total argent :   {totalHoT}  points </p>
                        <Button className={classes.button} variant="contained" color="primary"  onClick={headOrTailThrow}> Lancer la pièce !</Button>
                        
                    </div>
                    <div className={classes.gifHot}>
                        {hotSrc!=='' ?
                            <img src={hotSrc} alt='coin img' height='200px' widht="200px"></img>
                        :null}
                    </div>

                </div>
            </div>
            
        </div>
        <div className={classes.submitButton}>
            <Button variant="contained" color="primary" onClick={handleClick}> Valider résultats </Button>
        </div>
    </div>

)}


const useStyles = makeStyles({
    root:{
        display:'flex',
        flex:1,
        flexDirection:'column'
    },
    coinHorizontal:{
        flexDirection:'row',
        display:'flex',
        flex:1,
    },
    hotContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    coinVertical:{
        flexDirection:'column',
        display:'flex',
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    gifHot:{
        display:'flex',
        flex:2,
        justifyContent:'center',
        alignItems:'center',
    },

    submitButton:{
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
        marginTop:"4%"
    }

})

 
export default withRouter(HeadOrTail);