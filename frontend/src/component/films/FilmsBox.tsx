import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useEffect, useState } from 'react';
import { updatePages, changeMode } from './pageSlice';
import { CONST, FilmDBcall } from '../../const';
import Locandina from './Locandina';
import PagesIndex from './PageIndex';
import { DBCALL_URL } from '../../root';
import { FilmType } from '../../types/types';
import Locandina2 from './Locandina2';
import { FetchDataGet } from '../../fetchDB';
import { BlueButton, InputText, LabelInput } from '../../layout/layout';

function FilmsBox() {
    const pages = useAppSelector((state) => state.pages);
    const dispatch = useAppDispatch();
    const [list, setList] = useState<FilmType[]>();
    const [titolo, setTitolo] = useState<string>();
    const [isloading, setIsloading] = useState<boolean>(true);
    const [day, setDay] = useState<string>();

    useEffect(() => {
        AllTitle();
    }, []);

    function UpdateState(url: string) {
        const films: FilmType[] = [];
        let len: number;
        FetchDataGet(DBCALL_URL + url).then((res) => {
            res.data.map((film: FilmType) => films.push(film));
            len = res.data.length;
            setList(films);
            dispatch(updatePages(len));
        });
    }
    function AllTitle() {
        setIsloading(true);
        UpdateState(FilmDBcall.ALL);
        setIsloading(false);
    }
    function CercaPerNome() {
        setIsloading(true);
        UpdateState(FilmDBcall.TITLE);
        setIsloading(false);
    }
    function CercaPerGiorno() {
        setIsloading(true);
        UpdateState(FilmDBcall.DAY);
        setIsloading(false);
    }
    function OtherMode() {
        setIsloading(true);
        if (list != undefined) dispatch(changeMode(list.length));
        setIsloading(false);
    }
    let componet;
    if (isloading === true) {
        componet = <p>....Loading</p>;
    }
    if (isloading === false) {
        let mode = 0;
        pages.classic
            ? (mode = CONST.CLASSIC_MODE)
            : (mode = CONST.ALTERNATIVE_MODE);
        let end = mode;
        if (list != undefined) {
            if (list.length < mode * pages.attuale) end = list.length % mode;

            componet = list
                .slice(
                    (pages.attuale - 1) * mode,
                    (pages.attuale - 1) * mode + end
                )
                .map((film: FilmType) => {
                    return (
                        <>
                            {pages.classic && (
                                <Locandina key={film.filmId} film={film} />
                            )}
                            {!pages.classic && (
                                <Locandina2 key={film.filmId} film={film} />
                            )}
                        </>
                    );
                });
        }
    }

    return (
        <>
            <div className="m-[50px 50px] h-[100px] w-full min-w-[500px] px-[30px] py-[20px]">
                <label className={LabelInput}>cerca per nome:</label>
                <input
                    className="mx-3 rounded-xl p-1 text-xl shadow-sm focus:outline-none  focus:ring-2 focus:ring-rose-500"
                    type="text"
                    value={titolo}
                    name="titolo"
                    onChange={(e) => {
                        setTitolo(e.target.value);
                    }}
                />

                <button
                    className=" m-2 rounded-full bg-blue-500 p-1 font-bold text-white hover:bg-blue-700"
                    type="button"
                    onClick={() => CercaPerNome()}
                >
                    CERCA
                </button>
                <label className={LabelInput}>cerca per giorno:</label>
                <input
                    className="mx-3 rounded-xl p-1 text-xl shadow-sm focus:outline-none  focus:ring-2 focus:ring-rose-500"
                    type="date"
                    onChange={(e) => {
                        setDay(e.target.value);
                        CercaPerGiorno();
                    }}
                    value={day}
                    disabled={isloading === true}
                />

                <button
                    className=" float-right m-2 rounded-full bg-purple-500 p-2 font-bold text-white hover:bg-purple-800"
                    onClick={() => {
                        OtherMode();
                    }}
                >
                    MODE
                </button>
            </div>

            <div className="h-[1200px]">{componet}</div>

            <div className=" clear-left mx-auto min-w-[900px] max-w-[1200px] ">
                <PagesIndex />
            </div>
        </>
    );
}

export default FilmsBox;
