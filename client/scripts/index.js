import React from 'react';
import { render } from 'react-dom';
import MissionList from './components/MissionList';
import Form from './components/Form';

// Replace this with your own components
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            missions: [],
            arcs: [],
        }
        this.fetchMissions = this.fetchMissions.bind(this);
        this.fetchArcs = this.fetchArcs.bind(this);
    }

    componentDidMount() {
        this.fetchMissions();
        this.fetchArcs();
    }

    fetchMissions() {
        fetch('/api/missions')
            .then(response => response.json())
            .then(missions => this.setState({
                missions: missions
            }));
        // end fetch
    }
    
    fetchArcs(){
        fetch('/api/arcs')
        .then(response => response.json())
        .then(arcs => this.setState({
            arcs: arcs
        }));
    }

    render() {
        return (
            <div>
                <header>
                    <h1>????</h1>
                    <Form fetchMissions={this.fetchMissions} />
                </header>
                <MissionList fetchMissions={this.fetchMissions} missions={this.state.missions.reverse()} />
            </div>
        )
    };

}

render(<App />, document.getElementById('app'));
