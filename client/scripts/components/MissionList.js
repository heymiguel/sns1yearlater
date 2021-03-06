import React from 'react';
import Mission from './Mission';

const MissionList = (props) => {
    return (
        <div className="existing-missions">
            <ul>
               {props.missions.map(mission => <li key={mission._id}> <Mission arcId={mission.whichArc} fetchMissions={props.fetchMissions} {...mission} /> </li>)} 
               <li className="add-new-mission">
                   <a href="/createmission"> + Add New Mission</a>
                </li>
            </ul>
            
        </div>
        
    );
};

export default MissionList;