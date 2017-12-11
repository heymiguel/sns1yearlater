import React from 'react';
import ReactFilestack from 'filestack-react';


class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            arcs: [],
            missions: [],
            arcName: '',
            missionName: '',
            theName: '',
            whichArc: '',
        };
        this.createArc = this.createArc.bind(this);
        this.createMission = this.createMission.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        this._selectArc = this._selectArc.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentWillMount() {
        if (this.props.author) {
            this.refresh();    
        }
        
    }
    
    refresh() {
    
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
            console.log(this.state.whichArc);
        })
    }
    createArc(e) {
        console.log("arc");
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
        .then(() => this.props.fetchMissions());
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
        // .then(() => this.props.fetchMissions());
    }
    render() {
        return (
            <div>
                <form onSubmit={this.createArc}>
                    <div className="form-row">
                        <input onChange={this.handleChange} name="arcName" type="text" placeholder="Enter arc name" value={this.state.arcName} />
                    </div>
                    <div className="form-row">
                        <button>create arc</button>
                    </div>
                </form>
                <div>
                    {/* list all arcs by a specific user */}
                </div>
                <form onSubmit={this.createMission}>
                    <div className="form-row">
                        <input onChange={this.handleChange} name="missionName" type="text" placeholder="Enter missionName" value={this.state.missionName} />
                    </div>
                    <div className="form-row">
                        <div className="arclist">
                            <input type="hidden" name="whichArc" value={this.state.whichArc}/>
                            <ul>
                                {this.state.arcs.map( arc => {
                                    return <li key={arc._id} 
                                            onClick={ () => this._selectArc(arc._id) } > 
                                                {arc.arcName}
                                            </li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="form-row">
                        <button>create mission</button>
                    </div>
                </form>
                
            </div>
        );
    }
}

export default Form;