import React from 'react';
import { render } from 'react-dom';
import MissionList from './components/MissionList';
import ArcManagement from './components/ArcManagement';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import { BrowserRouter as Router, 
    Route, Link, Redirect } from 'react-router-dom';

// Replace this with your own components
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            missions: [],
            arcs: [],
            loggedIn: false,
        }
        this.fetchMissions = this.fetchMissions.bind(this);
        this.fetchArcs = this.fetchArcs.bind(this);
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.fetchMissions();
        this.fetchArcs();
        this.refresh();
    }
    login() {
        this.setState({
            loggedIn: true,
        });
    }
    refresh() {
        fetch('/api/me', {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((user) => {
            if (user._id) {
                this.setState({
                    user: user,
                });
               this.login();            
            }
        });
    }
    logout() {
        fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
        })
        .then(() => {
            this.setState({
                loggedIn: false,
                user: null,
            });
        });
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
                    <main> 
                        <Router>
                            <div>
                                <Route exact path="/" 
                                    render={ () => (
                                        this.state.loggedIn 
                                        ?
                                            <Redirect to="/arcs"/>
                                        :
                                            <div>
                                                <CreateUser refresh={this.refresh} />
                                                <Login refresh={this.refresh} />
                                            </div>
                                        
                                    )}
                                        
                                />
                                <Route exact path="/arcs" 
                                    render={ 
                                        ()=>  <ArcManagement fetchMissions={this.fetchMissions} fetchArcs={this.fetchArcs} availableArcs={this.state.arcs} author={this.state.user}/>
                                    }
                                />
                                <Route exact path="/createmission"
                                    render={
                                        ()=> <p> Create Missions </p>
                                    }
                                />
                            </div>
                        </Router>
                    </main>
                </div> 
                
        )
    };

}

render(<App />, document.getElementById('app'));
