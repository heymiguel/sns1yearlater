import React from 'react';
import ReactFilestack from 'filestack-react';

class Mission extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false,
        }
        this.editToggle = this.editToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        // this.deleteMovie = this.deleteMovie.bind(this);
    }
    handleChange(e) {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
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
        // create blank mission with empty data.
        // with the exception of one field, just so we 
    }
    saveMission(id) {
        const mission = Object.assign({}, this.state);
        delete mission.editing; // death to editing?
        fetch(`/api/missions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mission),
        })
        .then(() => this.props.fetchMissions())

        this.setState({
            editing: false,
        });
    }
    componentDidMount() {
        const newState = Object.assign({}, this.props, this.state); // right to left
        this.setState(newState);
    }
    render() {
        return (
            <div className="movie" >
                {this.state.editing ?
                    <div className="movie-editing">
                        <fieldset>
                            <label htmlFor="title">Title: </label>
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
                        <button onClick={() => this.saveMission(this.props._id)}>Save Changes</button>
                    </div>
                    : // from waaaaay uptown
                    <div className="mission-summary">
                        <h3>{this.props.missionName}</h3>
                        <p>{this.props.whichCampaign}</p>
                        <button onClick={this.editToggle}>Edit</button>
                        {/* lets just do a whole lotta of p */}
                    </div>
                }
            </div>
        );
    }
}

export default Mission;
