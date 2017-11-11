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
        }
        this.fetchMissions = this.fetchMissions.bind(this);
    }

    componentDidMount() {
        this.fetchMissions();
    }

    fetchMissions() {
        fetch('/api/missions')
            .then(response => response.json())
            .then(missions => this.setState({
                missions: missions
            }));
        // end fetch
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Reel</h1>
                    {/* <Form fetchMovies={this.fetchMovies} /> */}
                </header>
                <MissionList fetchMissions={this.fetchMissions} missions={this.state.missions.reverse()} />
            </div>
        )
    };

}

render(<App />, document.getElementById('app'));
