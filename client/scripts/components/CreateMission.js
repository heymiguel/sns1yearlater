import React from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import ReactFilestack from 'filestack-react';

class CreateMission extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false,

        }
        this.editToggle = this.editToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        this._setArc = this._setArc.bind(this);
        this.fetchArcs = this.fetchArcs.bind(this);
        // this.deleteMovie = this.deleteMovie.bind(this);
    }
    handleChange(e) {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    fetchArcs() {
      
          // 1. Fetch all the exist user notes by a user's ID
          fetch(`/api/arcs/${this.props.author._id}`, { credentials: 'include'})
          .then((res) => res.json())
          .then((arcs) => {
              // 2. Store them in the state
              this.setState({
                  arcs: arcs,
              });
          });
    }

    componentDidMount() {
      this.props.refresh();  
    }

    componentWillReceiveProps() {
      // console.log(this.props.author._id)
      // const newState = Object.assign({}, this.props, this.state); // right to left
      // this.setState(newState);
      if (this.props.author) {
        debugger;
        this.fetchArcs();
      }
      
    }
    // deleteMovie(id) {
    //     fetch(`/api/movies/${id}`, {
    //         method: 'DELETE'
    //     })
    //         .then(() => {
    //             if (this.props.fetchMovies) {
    //                 this.props.fetchMovies()
    //             }


    //         })

    // };
    onUploadSuccess(success) {
        const url = success.filesUploaded[0].url;
        this.setState({
            posterUrl: url,
        });
    }
    editToggle() {
        this.setState({
            editing: !this.state.editing,
        });
    }

    addMission(){
        const mission = Object.assign({}, this.state);
        fetch(`/api/missions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            body: JSON.stringify(mission),
        })
        .then(() => this.props.fetchMissions())
    }
    saveMission(id) {
        const mission = Object.assign({}, this.state);
        delete mission.editing; // death to editing?
        fetch(`/api/missions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            body: JSON.stringify(mission),
        })
        .then(() => this.props.fetchMissions())

        this.setState({
            editing: false,
        });
    }

    _setArc(arc) {
      this.setState({
        whichArc: arc
      })
    }

    render() {
        
        return (
          
            <div >
              {this.props.loggedIn && this.state.arcs && (
                <div>
                      <ul>
                        
                        {this.state.arcs.map( arc => {
                          return (<li 
                            key={arc._id}
                            onClick={ () => this._setArc(arc._id)}
                            id={arc._id}> {arc.arcName}
                          </li>)
                          // add missions here later?
                        })}  
                                             
                      </ul>
                      <fieldset>
                          <label htmlFor="missionName">Mission Name: </label>
                          <input
                              onChange={this.handleChange}
                              type="text"
                              name="missionName"
                            value={this.state.missionName}
                          />
                      </fieldset>
                      <fieldset>
                          <label htmlFor="campaign">Year: </label>
                          <input  
                              onChange={this.handleChange}
                              type="text"
                              name="whichCampaign"
                              value={this.state.whichCampaign}
                          />
                      </fieldset>
                      <button onClick={() => this.addMission()}>Save Changes</button>
                  </div>
              )}  
            </div>
        );
    }
}

export default CreateMission;
