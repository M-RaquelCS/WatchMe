import { useEffect, useState } from "react";

import { api } from "../services/api";

import { GenreResponseProps } from "../App";

import { Button } from "./Button";


interface SideBarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ handleClickButton, selectedGenreId }: SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, [])

  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}

/**
 * aqui chamamos o hook 'useEffect' sem uma condição, ou seja, será executada uma única vez
 * o 'useEffect' pegará os genres da api do JSON Server, onde irá pecorrer o arrau, encontrado
 * no server.json, de genres com a tipagem da interface GenreResponseProps, encontrado no App.tsx,
 * ao ler o array ele será 'setado' no estado setGenres, onde o mesmo atualiza o valor da genres,
 * que recebe o array de genres, então para criar  um botão de gada genre, fazemos um map do array
 * onde cada posição será um genre e retornar um Button, que é um componente com os dados do genre.
*/