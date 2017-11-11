import React from 'react';
import { render } from 'react-dom';
import MovieCatalogue from './components/MovieCatalogue';
import Form from './components/Form';

// Replace this with your own components
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
        }
        this.fetchMovies = this.fetchMovies.bind(this);
    }

    componentDidMount() {
        this.fetchMovies();
    }

    fetchMovies() {
        fetch('/api/movies')
            .then(response => response.json())
            .then(movies => this.setState({
                movies: movies
            }));
        // end fetch
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Reel</h1>
                    <Form fetchMovies={this.fetchMovies} />
                </header>
                <MovieCatalogue fetchMovies={this.fetchMovies} movies={this.state.movies.reverse()} />
            </div>
        )
    };

}

render(<App />, document.getElementById('app'));
