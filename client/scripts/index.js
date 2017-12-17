import React from 'react';
import { render } from 'react-dom';
import MissionList from './components/MissionList';
import ArcManagement from './components/ArcManagement';
import CreateUser from './components/CreateUser';
import CreateMission from './components/CreateMission'
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
        this.fetchUserArcs = this.fetchUserArcs.bind(this);
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.fetchMissions();
        this.fetchArcs();
        this.refresh();

        // get arcs by ID here, pass down to child
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
               return true;
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

    fetchUserArcs() {
            // 1. Fetch all the exist user arcs by a user's ID
            fetch(`/api/arcs/${this.state.user._id}`, { credentials: 'include'})
            .then((res) => res.json())
            .then((arcs) => {
                // 2. Store them in the state
                this.setState({
                    arcs,
                });
            });
        }

    render() {
        return (
                <div>
                    <main> 
                        <Router>
                            <div>
                                {this.state.loggedIn && (
                                    <Link className="logout" to="/api/logout" replace>logout </Link>
                                )}
                                <Route exact path="/" 
                                    render={ () => (
                                        this.state.loggedIn 
                                        ?
                                            <Redirect to="/arcs"/>
                                        :    
                                        <div>
                                            <Login refresh={this.refresh} />
                                            <Link to="/createuser" replace> create an account </Link>
                                        </div>
                                    )}  
                                />
                                <Route exact path="/createuser"
                                    render ={()=>
                                        (
                                            this.state.loggedIn ?
                                                <Redirect to="/arcs"/>
                                            :
                                                <CreateUser refresh={this.refresh} />
                                        )
                                    }
                                />
                                <Route exact path="/arcs" 
                                    render={ 
                                        ()=>  <ArcManagement fetchMissions={this.fetchMissions} fetchArcs={this.fetchArcs} fetchUserArcs={this.fetchUserArcs} arcs={this.state.arcs}  refresh={this.refresh} author={this.state.user}/>
                                    }
                                />
                                <Route exact path="/createmission"
                                    render={
                                        ()=> <CreateMission refresh={this.refresh} loggedIn={this.state.loggedIn} fetchMissions={this.fetchMissions} author={this.state.user} />
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
