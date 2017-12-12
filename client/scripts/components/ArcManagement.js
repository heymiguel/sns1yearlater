import React from 'react';
import ReactFilestack from 'filestack-react';
import MissionList from './MissionList';

class ArcManagement extends React.Component {
    constructor() {
        super();
        this.state = {
            arcs: [],
            missions: [],
            arcName: '',
            missionName: '',
            theName: '',
            whichArc: '',
            editingArc: false,
        };
        this.createArc = this.createArc.bind(this);
        this.createMission = this.createMission.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        this._selectArc = this._selectArc.bind(this);
        this.fetchArcs = this.fetchArcs.bind(this);
        this.fetchMissionsByArc = this.fetchMissionsByArc.bind(this);
        this._editArc = this._editArc.bind(this);
        this._toggleArcCreation = this._toggleArcCreation.bind(this);
    }

    componentWillMount() {
        if (this.props.author) {
            this.fetchArcs();    
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.author) {
            this.fetchArcs();    
        }
    }
    
    fetchArcs() {
    
        // 1. Fetch all the exist user notes by a user's ID
        fetch(`/api/arcs/${this.props.author._id}`, { credentials: 'include'})
        .then((res) => res.json())
        .then((arcs) => {
            // 2. Store them in the state
            this.setState({
                arcs,
            });
        });
    }

    fetchMissionsByArc(selectedArc) {
            // 1. Fetch all the exist user notes by a user's ID
            
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

    _editArc(arcId, e){
        e.preventDefault();
        
        console.log(arcId);
        const {editingArc} = this.state;
        this.setState({
            editingArc: !editingArc
        },()=>{
            // if (editingArc) {
            //     const thingy = this.state.arcs.find(arc =>{
            //         return arc._id = e.currentTarget.arcId
            //     })
            //     console.log(thingy.arcName);
            // }
            
        })

    }

    _toggleArcCreation(e){
        e.preventDefault();
        let {isCreatingNewArc} = this.state;
        this.setState({
            isCreatingNewArc: !isCreatingNewArc
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onUploadSuccess(success) {
        const url = success.filesUploaded[0].url;
        this.setState({
            posterUrl: url,
        });
    }

    _selectArc(arc){
        let {whichArc} = this.state;
        this.setState({
            whichArc: arc
        }, ()=>{
            this.fetchMissionsByArc(arc)
        })
    }
    createArc(e) {
        e.preventDefault();
        const arc = Object.assign({}, this.state); // again right to left
        arc.author = this.props.author._id;
        fetch('/api/arcs', {
            method: 'POST',
            body: JSON.stringify(arc),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(() => this.props.fetchArcs());
        // .then(() => this.props.fetchMissions()); // do i need this
    }
    createMission(e) {
        e.preventDefault();
        const mission = Object.assign({}, this.state); // again right to left
        fetch('/api/missions', {
            method: 'POST',
            body: JSON.stringify(mission),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(() => this.props.fetchMissions());
    }
    render() {
        return (
            <div>
                <div className="arc-management">
                    <h3>Arc Selection</h3>
                </div>
                
                <div>
                    {this.state.isCreatingNewArc ? 
                        <form onSubmit={this.createArc}>
                            <div className="form-row">
                                <input onChange={this.handleChange} name="arcName" type="text" placeholder="Enter arc name" value={this.state.arcName} />
                            </div>
                            <div className="form-row">
                                <textarea onChange={this.handleChange} name="arcDescription" placeholder="Enter a short description" value={this.state.arcDescription} />
                            </div>
                            <div className="form-row">
                                <button>Save Arc</button>
                                <button onClick={(e)=>this._toggleArcCreation(e)}>Cancel</button>
                            </div>
                        </form>
                        :
                        /* list all arcs? */ 
                        <div className="arc-list">
                            <ul>
                                {this.state.arcs.map( arc => {
                                    return <li key={arc._id} 
                                            onClick={ () => this._selectArc(arc._id) } > 
                                                <strong>{arc.arcName}</strong>
                                                <p>{arc.arcDescription}</p>
                                                {/* <a href="" onClick={ (e) => this._editArc(arc._id, e)} >Edit</a> */}
                                            </li>
                                })}
                            </ul>
                            {/* missionList */}
                            {(this.state.missions.length > 0) && (
                                <div className="arc-detail">
                                    <div className="existing-missions">
                                        <ul>
                                            <MissionList missions={this.state.missions} />
                                        </ul>
                                        <a href="/createmission">Add New Mission</a>
                                    </div>   
                                </div>
                            )}
                            
                            <button onClick={(e)=>this._toggleArcCreation(e)}>Create New Arc</button>
                        </div>  
                    }
                </div> 
            </div>
        );
    }
}

export default ArcManagement;