import { useEffect, useState } from "react";

import { api } from "../services/api";

import { MovieCard } from "./MovieCard";

import { GenreResponseProps } from "../App";
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


interface ContentProps {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
}

export function Content({ selectedGenreId, selectedGenre }: ContentProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return(
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );

}

/**
 * o hook useEffect tem como condição o selectedGenreId, ou seja, o useEffect será executado toda vez que o 
 * valor do selectedGenreId mudar, que é quando mudamos o genre, de acordo com o id do genre selecionado
 * retornamos uma lista de filmes que atende a interface de propriedades MovieProps, pegando essa lista
 * fazemos um map para retornar um card de filme para cada posição da lista.
*/