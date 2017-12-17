import React from 'react';

const DifficultySelector = (props) => {
  return (

    // takes an array
    // takes a selector name
    // takes a change handler
    <div className="difficulty-selector">
      <span>{props.selectorDescription}</span>
      {props.levels.map((level, index)=>{
        return (
          <div key={index}>
            
            <input type="radio" id={`level-${props.selectorName}-${index}`}
                                key={`${props.selectorName}-${index+1}`}
                                onClick={props.changeHandler}
                                value={index+1}
                                name={props.selectorName}
                              /> 
            <label htmlFor={`level-${props.selectorName}-${index}`}>{index+1}</label>
          </div>
        )
      })}
      
    </div>
    
  );
}

export default DifficultySelector;