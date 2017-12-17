import React from 'react';

const DifficultySelector = (props) => {
  return (

    // takes an array
    // takes a selector name
    // takes a change handler
    <div className="difficulty-selector">
      {props.levels.map((level, index)=>{
        return (
          <div key={index}>
            <input type="radio" id={`level-${index}`}
                                key={`${props.selectorName}-${index+1}`}
                                onClick={props.changeHandler}
                                value={index+1}
                                name={props.selectorName}
                              /> 
            <label htmlFor={`level-${index}`}>{index}</label>
          </div>
        )
      })}
      
    </div>
    
  );
}

export default DifficultySelector;