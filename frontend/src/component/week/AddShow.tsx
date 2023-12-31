import { startOfTomorrow, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { DBCALL_URL } from '../../asset/DBcall/root';
import { FetchDataGet, FetchDataPost } from '../../asset/DBcall/fetchDB';
import { FilmDBcall, ShowDBcall } from '../../asset/DBcall/DBcall';
import { FilmType } from '../../asset/types/types';
function AddShow() {
    const [isloading, setIsloading] = useState(true);
    const tomorrow = format(startOfTomorrow(), 'yyyy-MM-dd');
    const [newshow, setNewShow] = useState<{
        filmId: string;
        day: string;
        time: string;
        room: number;
        duration?: string;
    }>({ filmId: '0', day: tomorrow, time: '14:00', room: 1 });
    const [filmlist, setFilmList] = useState<FilmType[]>([]);

    useEffect(() => {
        setIsloading(true);
        FetchDataGet(DBCALL_URL + FilmDBcall.ALL).then((res) => {
            let list: FilmType[] = [];
            list = res.data;
            setFilmList(list);
            setIsloading(false);
        });
    }, []);

    function NewShow() {
        if (
            Number(newshow.filmId) > 0 &&
            newshow.room > 0 &&
            Number(newshow.time.split(':')[0]) > 14
        ) {
            const film = filmlist.filter(
                (element) => element.filmId.toString() === newshow.filmId
            );
            setNewShow({ ...newshow, duration: film[0].durata });
            const bodyshow = { ...newshow, duration: film[0].durata };
            console.log(bodyshow);
            FetchDataPost(DBCALL_URL + ShowDBcall.NEW, { bodyshow }).then(
                (res) => {
                    console.log(res.data);
                    if (res.status == 201) {
                        alert(res.data);
                    }
                }
            );
        } else {
            alert('complete all info(time > 14:00)');
        }
    }

    return (
        <div className=" space-y-11 rounded-[20px] border-2 border-black bg-slate-400">
            <p className="mb-4 text-center">aggiungi spettacolo:</p>
            <div className=" px-auto mx-auto mb-4  w-[700px] space-x-2 ">
                <label>titolo: </label>
                <select
                    value={newshow.filmId.toString()}
                    onChange={(e) => {
                        setNewShow({ ...newshow, filmId: e.target.value });
                    }}
                >
                    <option key="0" value="0">
                        --scegli il film--
                    </option>
                    {!isloading &&
                        filmlist != undefined &&
                        filmlist.map((film) => {
                            return (
                                <option
                                    key={film.filmId}
                                    value={film.filmId.toString()}
                                >
                                    {film.titolo}
                                </option>
                            );
                        })}
                </select>
                <label>giorno: </label>
                <input
                    type="date"
                    min={tomorrow}
                    value={newshow.day}
                    onChange={(e) => {
                        setNewShow({ ...newshow, day: e.target.value });
                    }}
                />
                <label>ora: </label>

                <input
                    type="time"
                    value={newshow.time}
                    min="14:00"
                    max="22:00"
                    onChange={(e) => {
                        setNewShow({ ...newshow, time: e.target.value });
                    }}
                />
                <label>sala: </label>

                <input
                    type="number"
                    value={newshow.room}
                    min="1"
                    max="4"
                    onChange={(e) => {
                        setNewShow({
                            ...newshow,
                            room: Number(e.target.value)
                        });
                    }}
                />
            </div>

            <div className="mx-auto w-[90px] object-center pb-[30px]">
                <button
                    className=" m-auto rounded-full bg-orange-500 p-2"
                    onClick={() => NewShow()}
                >
                    conferma
                </button>
            </div>
        </div>
    );
}

export default AddShow;
