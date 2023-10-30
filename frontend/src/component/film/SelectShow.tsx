import { useEffect, useState } from 'react';
import { DBCALL_URL } from '../../root';
import { ShowInfoType, UserType } from '../../types/types';
import { Role, ShowDBcall } from '../../const';
import { format } from 'date-fns';
import { FetchDataGet } from '../../fetchDB';
import { Link, useNavigate } from 'react-router-dom';

function SelectShow(props: { id: number; user: UserType }) {
    const navigate = useNavigate();
    const [isloading, setIsloading] = useState(true);
    const [shows, setShows] = useState<ShowInfoType[]>();
    const [day, setDay] = useState<string>('0');
    const [spettacoloId, setSpettacoloId] = useState<string>('0');

    useEffect(() => {
        setIsloading(true);
        const list: ShowInfoType[] = [];
        FetchDataGet(DBCALL_URL + ShowDBcall.FIND + props.id).then((res) => {
            res.data.map((show: ShowInfoType) => {
                show.giorno = format(new Date(show.giorno), 'yyyy-MM-dd');
                list.push(show);
            });
            setShows(list);
            setIsloading(false);
        });
    }, []);

    function GoTo() {
        console.log(spettacoloId);
        if (spettacoloId == '0') {
            alert('select show');
        } else {
            if (props.user.role != Role.USER) {
                alert('login for procede');
            } else {
                navigate('/seat/' + spettacoloId);
            }
        }
    }

    let selectday;
    if (!isloading && shows != undefined) {
        let days: string[] = [];
        shows.map((show) => {
            if (days.length === 0) {
                days = [show.giorno];
            } else {
                const pos = days.indexOf(show.giorno);
                if (pos === -1) {
                    days.push(show.giorno);
                }
            }
        });
        selectday = (
            <select
                value={day}
                onChange={(e) => {
                    setDay(e.target.value);
                    setSpettacoloId('0');
                }}
            >
                <option value="0">scegli il giorno</option>
                {days != null &&
                    days.map((day, i = 0) => {
                        i++;
                        return (
                            <option key={i} value={day}>
                                {day}
                            </option>
                        );
                    })}
            </select>
        );
    } else {
        selectday = <p>Loading</p>;
    }

    const selecttime = (
        <select
            className=" m-1"
            value={spettacoloId}
            onChange={(e) => {
                setSpettacoloId(e.target.value);
            }}
        >
            <option value="0">scegli il orario</option>
            {!isloading &&
                shows != undefined &&
                shows.map((show) => {
                    if (show.giorno == day) {
                        return (
                            <option
                                key={show.spettacoloId}
                                value={show.spettacoloId}
                            >
                                {show.ora}
                            </option>
                        );
                    }
                })}
        </select>
    );

    return (
        <>
            <div className="">
                <h1>Prenota Posto:</h1>
                {selectday}
                {selecttime}
                <button
                    className=" m-3 rounded-full bg-blue-500 p-1 font-bold text-white hover:bg-blue-700 "
                    onClick={() => GoTo()}
                >
                    CONFIRM
                </button>
            </div>
        </>
    );
}

export default SelectShow;
