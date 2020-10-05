import React, { useState, useRef } from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactWheel from '../FortuneWheel'
 

 
function WheelOfFortune(props)  {

    const classes = useStyles();
    const wheelRef = useRef(null);
    const wheelRef2 = useRef(null);
    const [checkbox1, setCheckbox1] = useState(false)
    const [checkbox2, setCheckbox2] = useState(false)
    const [counterSpins, setCounterSpins] = useState(0)
    const [score, setScore] = useState(0)
    const [resWheel1, setResWheel1] = useState(0)
    const [resWheel2, setResWheel2] = useState(0)
    const [hasAnsweredYet, setHasAnsweredYet] = useState(false)
    const [hasCheated, setHasCheated] = useState(0)

    const segments = [
		{
			name: '+25',
			color: 'green'
        },
        		{
			name: '+25',
			color: 'green'
		},
		{
			name: '+25',
			color: 'green'
		},
		{
			name: '-50',
			color: 'red'
		},
    ];
    const segments2 = [
		{
			name: '+300',
			color: 'green'
        },
        		{
			name: '-75',
			color: 'red'
		},
		{
			name: '-75',
			color: 'red'
		},
		{
			name: '-75',
			color: 'red'
		},
	];

    const handleClick=(event)=>{
        event.preventDefault()
        var cheat = 0
        var finalScore = 0
        if(counterSpins > 6){
            cheat = 2
        } else if( counterSpins > 5){
            cheat = 1
        }
        if(score > 400){
            finalScore = 40
        }else{
            finalScore = score/10
        }
        props.sendDataToParent( score, finalScore, cheat + hasCheated)
    }

	const onSpinClick = () => {
        wheelRef.current.spinWheel();
        wheelRef2.current.spinWheel();
        setCounterSpins(counterSpins+1)
        if(checkbox1 ||checkbox2)
        {
            setHasAnsweredYet(true)
        }else{
            setHasAnsweredYet(false)
        }
	};
	const onSpinComplete1 = ( result ) => {
        setResWheel1(result.name)
        if(checkbox1 ){

            if(result.name==="+25"){
            setScore(score+25)
            }else{
                setScore(score-50)  
            }
        }
    };
    
    const onSpinComplete2 = ( result ) => {
        setResWheel2(result.name)
        if(checkbox2){
            if(result.name==="+300"){
                setScore(score+300)
                }else{
                    setScore(score-75)  
                }
        }
	};

    const changeCheckbox1=()=>{
            setCheckbox1(!checkbox1)
            if(checkbox2){
                setCheckbox2(!checkbox2)
            }

            if(hasAnsweredYet === false){
                if(resWheel1==="+25"){
                    setScore(score+25)
                    }else{
                        setScore(score-50)  
                    }
                setHasCheated(2)
                setHasAnsweredYet(true)
            }

    }
    const changeCheckbox2=()=>{
            setCheckbox2(!checkbox2)
            if(checkbox1){
                setCheckbox1(!checkbox1)
            }   
            if(hasAnsweredYet === false){
                if(resWheel2==="+300"){
                    setScore(score+300)
                    }else{
                        setScore(score-75)  
                    }
                setHasCheated(2)
                setHasAnsweredYet(true)
            }  
    }

return (

    <div className={classes.root}>
        <div className={classes.root}>
            <div > 
                <p> Avez-vous le goût du risque ? <br/>
                    Vous avez pour cet exercice un choix à faire. Voici deux roulettes vous permettant d'augmenter votre score, 
                    l'une est risquée et l'autre plus raisonnable. Choisissez votre roulette en cochant la case au-dessus et faire tourner les roues.
                    Vous avez 4 essais pour augmenter au maximum votre résultat.

                </p>
                <div className={classes.wheelsContainer}>
                    <div>
                        <input
                            type="checkbox"
                            checked={checkbox1}
                            onChange={changeCheckbox1}
                            style={{marginRight:'40px'}}
                        />
                        <input
                            type="checkbox"
                            checked={checkbox2}
                            onChange={changeCheckbox2}
                            style={{marginLeft:'40px'}} 
                        />
                    </div>
                    <div className={classes.wheels}>
                        <div style={{marginRight:'20px'}}>
                            <ReactWheel
                                segments={segments}
                                onComplete={onSpinComplete1}
                                ref={wheelRef}
                                
                            />
                        </div>
                        <div style={{marginLeft:'20px'}}>
                            <ReactWheel
                                segments={segments2}
                                onComplete={onSpinComplete2}
                                ref={wheelRef2}
                            />
                        </div>
                    </div>
                    <p> Votre score actuel : {score}</p>
                   
                    <div className={classes.spinButton}>
                        <Button variant="contained" color="primary" onClick={onSpinClick}>
                            Faites vos jeux !   
                        </Button>
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

    wheels:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    centered:{

        display:'flex',
        flex:1,
        flexDirection:'column'
    },
    root:{
        display:'flex',
        flex:1,
        flexDirection:'column'
    },
    submitButton:{
        display:'flex',
        alignSelf:'center',
        justifyContent:'center',
    },
    wheelsContainer:{
        display:'flex',
        flexDirection:'column'
    },
    spinButton:{
        marginBottom:'5px'
    }
})

 
export default withRouter(WheelOfFortune);