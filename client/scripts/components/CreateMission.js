import React from 'react';
import DifficultySelector from './DifficultySelector';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import ReactFilestack from 'filestack-react';

class CreateMission extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false,
            theatre: {

            },
            theSheep:{

            },
            theWolves:{

            }
        }
        this.editToggle = this.editToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTheatreChange = this.handleTheatreChange.bind(this);
        this.handleSheepChange = this.handleSheepChange.bind(this);
        this.handleWolvesChange = this.handleWolvesChange.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        this._setArc = this._setArc.bind(this);
        this.fetchArcs = this.fetchArcs.bind(this);
        this.fetchMissionsByArc = this.fetchMissionsByArc.bind(this);
        // this.deleteMovie = this.deleteMovie.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleTheatreChange(e){
      let theatre = Object.assign({},this.state.theatre);
      theatre[e.target.name] = e.target.value
      this.setState({
        theatre: theatre
      })
    }
    handleSheepChange(e){
      let theSheep = Object.assign({},this.state.theSheep);
      theSheep[e.target.name] = e.target.value
      this.setState({
        theSheep: theSheep
      })
    }
    handleWolvesChange(e){
      let theWolves = Object.assign({},this.state.theWolves);
      theWolves[e.target.name] = e.target.value
      this.setState({
        theWolves: theWolves
      })
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

    componentWillReceiveProps(nextProps) {
      // console.log(this.props.author._id)
      // const newState = Object.assign({}, this.props, this.state); // right to left
      // this.setState(newState);
      if (this.props.author) {
        this.fetchArcs();
      }
      
    }

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
        debugger;
        fetch(`/api/missions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            body: JSON.stringify(mission),
        })
        .then(() => this.fetchMissionsByArc(this.state.whichArc))
    }

    fetchMissionsByArc(selectedArc) {
      // 1. Fetch all the exist user arcs by a user's ID
      
      fetch(`/api/missions/${selectedArc}`, { credentials: 'include'})
      .then((res) => res.json())
      .then((missions) => {
          // 2. Store them in the state
          console.log(missions)
          this.setState({
              missions: missions,
          });
          
      });
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
      },()=>{
        this.fetchMissionsByArc(arc);
      })
    }

    render() {
        
        return (
          
            <div >
              {this.props.loggedIn && this.state.arcs && (
                <div>
                      
                        {this.state.arcs.map((arc, index) => {
                          return (
                              <div key={index}>
                                <input type="radio" id={`${index}-arc`}
                                  key={arc._id}
                                  onClick={ () => this._setArc(arc._id)}
                                  value={arc._id}
                                  name="available-arcs"
                                /> 
                                <label htmlFor={`${index}-arc`}>{arc.arcName}</label>
                                {/* show mission difficulty here */}
                                {/* show number of missions here */   }
                              </div>
                          )
                        })}  
                      
                      <ul className="missions">
                        {this.state.missions ? 
                          this.state.missions.map ((mission, index) =>{
                            return <li key={index}> {mission.missionName}</li>
                          })
                          : 
                          <div></div>
                        }
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
                      <fieldset className="theatre">
                        <label htmlFor="description">Description </label>
                          <textarea
                              onChange={this.handleTheatreChange}
                              type="text"
                              name="description"
                            value={this.state.theatre.description}
                          />
                        <DifficultySelector 
                          levels={[0,1,2,3,4,5,6,7,8]}
                          selectorName="size"
                          changeHandler={this.handleTheatreChange}
                          selectorDescription={"this is a description"}
                        />
                        <label htmlFor="accessDescription">accessDescription </label>
                          <textarea
                              onChange={this.handleTheatreChange}
                              type="text"
                              name="accessDescription"
                            value={this.state.theatre.accessDescription}
                          />
                        <DifficultySelector 
                          levels={[0,1,2,3,4,5,6,7,8]}
                          selectorName="easeOfAccess"
                          changeHandler={this.handleTheatreChange}
                          selectorDescription={"this is easeOfAccess"}
                        />
                        <label htmlFor="socialDescription">socialDescription </label>
                          <textarea
                              onChange={this.handleTheatreChange}
                              type="text"
                              name="socialDescription"
                            value={this.state.theatre.socialDescription}
                          />
                        <DifficultySelector 
                          levels={[0,1,2,3,4,5,6,7,8]}
                          selectorName="socialStability"
                          changeHandler={this.handleTheatreChange}
                          selectorDescription={"this is socialStability"}
                        />
                        <label htmlFor="govermentDescription">govermentDescription </label>
                          <textarea
                              onChange={this.handleTheatreChange}
                              type="text"
                              name="govermentDescription"
                            value={this.state.theatre.govermentDescription}
                          />
                        <DifficultySelector 
                          levels={[0,1,2,3,4,5,6,7,8]}
                          selectorName="governmentStability"
                          changeHandler={this.handleTheatreChange}
                          selectorDescription={"this is governmentStability"}
                        />
                        <label htmlFor="economicDescription">economicDescription </label>
                          <textarea
                              onChange={this.handleTheatreChange}
                              type="text"
                              name="economicDescription"
                            value={this.state.theatre.economicDescription}
                          />
                        <DifficultySelector 
                          levels={[0,1,2,3,4,5,6,7,8]}
                          selectorName="economicSituation"
                          changeHandler={this.handleTheatreChange}
                          selectorDescription={"this is economicSituation"}
                        />
                      </fieldset>
                      <fieldset className="the-sheep">
                       <label htmlFor="sheepDescription">sheep description </label>
                          <textarea
                              onChange={this.handleSheepChange}
                              type="text"
                              name="sheepDescription"
                            value={this.state.theSheep.description}
                          />
                        <DifficultySelector 
                          levels={[0,1,2,3,4,5,6,7,8]}
                          selectorName="moodTowardsEspionage"
                          changeHandler={this.handleSheepChange}
                          selectorDescription={"this is moodTowardsEspionage"}
                        />
                      </fieldset>
                      <fieldset className="the-wolves">
                        <textarea
                                onChange={this.handleWolvesChange}
                                type="text"
                                name="wolvesDescription"
                              value={this.state.theWolves.description}
                            />
                        {/* insert faction component / factions here */}
                      </fieldset>
                      
                      
                      <button onClick={() => this.addMission()}>Add Mission</button>
                  </div>
              )}  
            </div>
        );
    }
}

export default CreateMission;
