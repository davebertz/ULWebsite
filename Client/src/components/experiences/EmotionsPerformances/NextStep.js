import React from "react";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

//Exercice de rédifinition d'un mot par ses propres termes

function Definition(props)  {


    const classes = useStyles();

    const handleSubmit= (event) =>{
        event.preventDefault();
        
        props.movingForward()
    }



return (
    <div className={classes.root}>
    <div className={classes.centered}>
        
        <form className={classes.form} onSubmit={handleSubmit}>
            <div  className={classes.submitButton}>
                <Button variant="contained" color="primary" onClick={handleSubmit}> Passer à la suite</Button>
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