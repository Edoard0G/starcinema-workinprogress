// import React from "react"
import { useEffect, useState } from 'react';
import '../../asset/const/const';
import { useParams } from 'react-router-dom';
import { FilmDBcall } from '../../asset/DBcall/DBcall';
import { DBCALL_URL } from '../../asset/DBcall/root';
import { IMG_ROOT } from '../../asset/DBcall/root';
import SelectShow from './selectshow/SelectShow';
import { FilmType } from '../../asset/types/types';
import CommentBox from './comment/CommentBox';
import { FetchDataGet } from '../../asset/DBcall/fetchDB';
import { useAppSelector } from '../../store/hook';

function Film() {
    const user = useAppSelector((state) => state.user);

    const { id } = useParams();
    const [isloading, setIsloading] = useState(true);
    const [film, setFilm] = useState<FilmType | null>(null);
    useEffect(() => {
        setIsloading(true);
        FetchDataGet(DBCALL_URL + FilmDBcall.FILM + id).then((res) => {
            setFilm(res.data[0]);
        });

        setIsloading(false);
    }, []);
    let content;
    if (isloading) {
        content = <p>caricament</p>;
    } else {
        if (film != null)
            content = (
                <div>
                    <img
                        className="float-left m-[40px] h-[550px] w-[375px]"
                        alt={film.titolo}
                        src={
                            IMG_ROOT +
                            film.titolo.toUpperCase().replaceAll(' ', '_') +
                            '.jpg'
                        }
                    />
                    <h1 className="pt-[40px]  text-2xl">
                        <b>{film.titolo}</b>
                    </h1>
                    <h2 className="px-[100px] pt-[30px]">{film.trama}</h2>
                </div>
            );
    }

    return (
        <>
            <div>
                {content}
                <div className="pt-[100px]">
                    {film != null && (
                        <SelectShow id={film.filmId} user={user} />
                    )}
                </div>
                <div className="clear-both">
                    {film != null && (
                        <CommentBox user={user} id={film.filmId} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Film;
