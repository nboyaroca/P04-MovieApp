import { Component } from "react";
import { movieServices } from "../../services/movieServices";
import { createUuid } from "../../utils/createUuid";
import { MovieCard } from "../card/MovieCard";
import { MovieForm } from "../form/MovieForm";

export class MovieList extends Component {
    constructor() {
        super();
        this.state={
            viewForm: false,
            editedMovie: { },
            movies: [],
        }
    }
    
    componentDidMount() {
        this.setState({
            movies: movieServices.getAllMovies(),
        });
    //cridem totes les pelis de l'array de services
    }

    deleteMovie = (id) => { //la variable deleteMovie és igual a la funció ()
        let deleteConfirmed = window.confirm('really delete ?');
        if (!deleteConfirmed) return; //clàusula salvaguarda
        let filterMovies = this.state.movies.filter(movie => movie.id !==id);
        this.setState({ movies: filterMovies });
    }

    editMovie = (id) => {
        this.openForm();
        let editedMovie = this.state.movies.find(movie => movie.id ===id);
        //return editedMovie;
        console.log(editedMovie);
        this.setState({editedMovie})
        this.setState({isEditMode: true})
    }

    updateMovie = (newMovie) => {
        console.log(newMovie)
        let newMoviesState = this.state.movies //fem un nou array com l'original
        let movieToEditIndex = newMoviesState.findIndex(movie => movie.id === newMovie.id); //busquem l'index que sigui igual al que volem canviar
        newMoviesState[movieToEditIndex] = newMovie
        this.setState({movies: newMoviesState})
        this.openForm()
        this.resetInputsForm()
        this.setState({isEditMode: false})
    }

    addMovie = (data) => {
        data.id = createUuid();
        this.setState({ movies: [...this.state.movies, data] })
        this.openForm()
    }

    openForm = () => {
        this.setState(prevState => ({ viewForm: !prevState.viewForm}));
        //prèviament this.setState({ viewForm: true })
        //una altra forma és if else:
        //   if (this.state.viewform) this.setState({viewform:false});
        //   else this.setState({viewform:true})
        
    }

    resetInputsForm = () => {
        this.setState({editedMovie: {id:"", title:"", genre:"", year:"", imgUrl:""}})
        //per buidar el formulari
    };   

    render() {
        return (
            <section>
                <button onClick={ this.openForm } className="add-button"> Add A Film By Yourself,  Click Here! </button>
                {this.state.viewForm ? <MovieForm 
                    addMovie={this.addMovie} 
                    editedMovie={this.state.editedMovie} 
                    isEditMode={this.state.isEditMode} 
                    updateMovie={this.updateMovie}
                    resetInputsForm={this.resetInputsForm}/> 
                    : ''
                }
                <div className="film-list">
                    {this.state.movies.map((movie, key) => (
                    <MovieCard key={key} movie={movie}
                    deleteMovie={this.deleteMovie}
                    editMovie={this.editMovie}/>     
                    ))}
                </div>
            </section>
        )
    }
}
