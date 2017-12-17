import React from 'react';

const Mission = (props) => {
    return (
        <div>
            <div className="mission-summary">
                <p>{props.missionName}</p>
                {/* lets just do a whole lotta of p */}
            </div>
        </div>
    );
    
}

export default Mission;
