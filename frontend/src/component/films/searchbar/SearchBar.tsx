import { useEffect, useState } from 'react';
import {
    BlueButton,
    InputText,
    LabelInput
} from '../../../asset/layout/layout';
import { FilmType } from '../../../asset/types/types';
import { FetchDataGet } from '../../../asset/DBcall/fetchDB';
import { DBCALL_URL } from '../../../asset/DBcall/root';
import { FilmDBcall } from '../../../asset/DBcall/DBcall';

function SearchBar(props: {
    callbackUpdateList: (list: FilmType[]) => void;
    callbackChangeMode: () => void;
}) {
    const [titolo, setTitolo] = useState<string>();
    const [day, setDay] = useState<string>();

    function UpdateListFilm(url: string) {
        const films: FilmType[] = [];
        FetchDataGet(DBCALL_URL + url).then((res: { data: FilmType[] }) => {
            res.data.map((film: FilmType) => films.push(film));
            props.callbackUpdateList(films);
        });
    }

    function CercaPerNome() {
        UpdateListFilm(FilmDBcall.TITLE + titolo);
    }
    function CercaPerData() {
        UpdateListFilm(FilmDBcall.DAY + day);
    }
    useEffect(() => {
        UpdateListFilm(FilmDBcall.ALL);
    }, []);

    return (
        <>
            <div className=" m-[50px 50px] h-[100px] w-full min-w-[500px] px-[30px] py-[20px] ">
                <label className={LabelInput}>cerca per nome:</label>

                <input
                    className={InputText}
                    type="text"
                    value={titolo}
                    name="titolo"
                    onChange={(e) => {
                        setTitolo(e.target.value);
                    }}
                />

                <button
                    className={BlueButton}
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
                        CercaPerData();
                    }}
                    value={day}
                />

                <button
                    className=" float-right m-2 rounded-full bg-purple-500 p-2 font-bold text-white hover:bg-purple-800"
                    onClick={() => {
                        props.callbackChangeMode();
                    }}
                >
                    MODE
                </button>
            </div>
        </>
    );
}

export default SearchBar;
