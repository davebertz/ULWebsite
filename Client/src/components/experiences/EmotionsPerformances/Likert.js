import React from 'react';
import Likert from 'react-likert-scale';
import PropTypes from 'prop-types';



export default function LikertScale(props){

  const { likertOptions } = props;
  function handleChange(event) {
    // Here, we invoke the callback with the new value
    likertOptions.onChange(likertOptions.id, event.value);
  }
    
      return (
          <main>
            
            <Likert key={likertOptions.id}  question={likertOptions.question} responses={likertOptions.answers} 
                    onChange={handleChange} layout='stacked'/> <br/><br/>
          </main>
      );
      
    
  }


  LikertScale.propTypes = {
    likertOptions: PropTypes.object,
};
