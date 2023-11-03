import { useEffect, useState } from 'react';
import { FilmType } from '../../../asset/types/types';
import { DIM_FILM_PAGE } from '../../../asset/const/const';
import Locandina from './Locandina';
import Locandina2 from './Locandina2';

function LocandinaBox(props: {
    list: FilmType[];
    mode: boolean;
    actualPage: number;
}) {
    const [activefilm, setActiveFilm] = useState<FilmType[]>([]);
    useEffect(() => {
        let dim;
        if (props != undefined) {
            if (props.mode) {
                dim = DIM_FILM_PAGE.CLASSIC_MODE;
            } else {
                dim = DIM_FILM_PAGE.ALTERNATIVE_MODE;
            }

            let end = dim;

            if (props.list != undefined) {
                if (props.list.length < dim * props.actualPage)
                    end = props.list.length % dim;
            }

            let films;
            if (props.actualPage != undefined) {
                films = props.list.slice(
                    (props.actualPage - 1) * dim,
                    (props.actualPage - 1) * dim + end
                );
                setActiveFilm(films);
            }
        }
    }, [props]);
    return (
        <>
            {activefilm.map((film: FilmType) => {
                return (
                    <>
                        {props.mode && (
                            <Locandina key={film.filmId} film={film} />
                        )}
                        {!props.mode && (
                            <Locandina2 key={film.filmId} film={film} />
                        )}
                    </>
                );
            })}
        </>
    );
}

export default LocandinaBox;
