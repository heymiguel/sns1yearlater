import React from 'react';
import Mission from './Mission';

const MissionList = (props) => {
    return (
        // mission list in this case is 
        <div className="movie-catalogue">
            {props.missions.map(mission => <Mission key={mission._id} fetchMissions={props.fetchMissions} {...mission} />)}
        </div>
    );
};

export default MissionList;