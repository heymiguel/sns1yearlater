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
        fetch(`/api/missions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
            body: JSON.stringify(mission),
        })
        .then(() => this.fetchMissionsByArc(this.state.whichArc))
        .then(()=> location.href="/arcs")
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
            <div className="create-mission">
              <h1>Create Mission</h1>
              {this.props.loggedIn && this.state.arcs && (
                <div>                      
                  <fieldset>

                    <label className="large" htmlFor="missionName">Mission Name: </label>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="missionName"
                      value={this.state.missionName}
                    />
                  </fieldset>
                  <fieldset>
                    <div className="form-row">
                      <label htmlFor="whichArc">Assign this mission to which arc: </label>
                      <div className="arcs">
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
                      </div>
                    </div>
                  </fieldset>
                  <h3>Theatre</h3>
                  <fieldset className="theatre">
                    <div className="form-row">
                      <label htmlFor="description">Give a brief description of where on earth this is taking place: </label>
                        <textarea
                            onChange={this.handleTheatreChange}
                            type="text"
                            name="description"
                          value={this.state.theatre.description}
                        />
                    </div>
                    <div className="form-row">
                      <label htmlFor="accessDescription">How difficult is it to get in and out of this place? </label>
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
                        selectorDescription={"ease of access"}
                      />
                    </div> 
                    <div className="form-row">
                      <label htmlFor="socialDescription">Describe the social stability in this place </label>
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
                        selectorDescription={"rate the social stability"}
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="govermentDescription">Describe the goverment in this area. </label>
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
                        selectorDescription={"How stable is the government here?"}
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="economicDescription">How developed is the economy? </label>
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
                        selectorDescription={"rate the economic situation"}
                      />
                    </div>
                  </fieldset>
                  <h3>The Sheep</h3>
                  <fieldset className="the-sheep">
                    <label htmlFor="sheepDescription">Describe the civilian population. </label>
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
                      selectorDescription={"How aware are they about spies and such?"}
                    />
                  </fieldset>
                  <h3>The Wolves</h3>
                  <fieldset className="the-wolves">
                    <p>Who currently operates in this area?</p>
                    <div className="factions">
                        <label htmlFor="lensmen-logo">
                          <input type="radio" name="factions" id="lensmen-logo"/>
                          <img src="http://heymiguel.github.io/sns-redesign-v1/images/logos/lensmen.png" alt=""/>
                        </label>
                        <label htmlFor="serpent-logo">
                          <input type="radio" name="factions" id="serpent-logo"/>
                          <img src="http://heymiguel.github.io/sns-redesign-v1/images/logos/secret_empire.png" alt=""/>
                        </label>
                        <label htmlFor="aesir-logo">
                          <input type="radio" name="factions" id="aesir-logo"/>
                          <img src="http://heymiguel.github.io/sns-redesign-v1/images/logos/aesir.png" alt=""/>
                        </label>
                        <label htmlFor="ksos-logo">
                          <input type="radio" name="factions" id="ksos-logo"/>
                          <img src="http://heymiguel.github.io/sns-redesign-v1/images/logos/ksos.png" alt=""/>
                        </label>
                        <label htmlFor="kraken-logo">
                          <input type="radio" name="factions" id="kraken-logo"/>
                          <img src="http://heymiguel.github.io/sns-redesign-v1/images/logos/kraken.png" alt=""/>
                        </label>
                        <label htmlFor="order-logo">
                          <input type="radio" name="factions" id="order-logo"/>
                          <img src="http://heymiguel.github.io/sns-redesign-v1/images/logos/order.png" alt=""/>
                        </label>
                      </div>
                    <textarea onChange={this.handleWolvesChange}
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
