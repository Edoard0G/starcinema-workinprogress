import { ReactElement, useEffect, useState } from 'react';
import { ReservationDBcall, Role, ShowDBcall } from '../../const';
import { DBCALL_URL } from '../../root';
import { FetchDataGet, FetchDataPost } from '../../fetchDB';
import { ShowType } from '../../types/types';
import { ActiveButton, BlueButton } from '../../layout/layout';
import { useAppSelector } from '../../store/hook';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

function SitBox() {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const props = useParams();
    const [show, setShow] = useState<ShowType>();
    const [posti, setPosti] = useState<string[]>([]);
    const [busy, setBusy] = useState<string[]>([]);

    useEffect(() => {
        if (user.role != Role.USER) {
            alert('login for procede the reservation');
            navigate('/login');
        }
    }, [user]);
    useEffect(() => {
        if (props.id != undefined) {
            const seat: string[] = [];
            FetchDataGet(
                DBCALL_URL + ShowDBcall.FIND_BY_SHOWID + props.id
            ).then((res) => {
                setShow({
                    spettacoloId: Number(props.id),
                    giorno: format(new Date(res.data[0].giorno), 'yyyy-MM-dd'),
                    ora: res.data[0].ora,
                    sala: res.data[0].sala,
                    titolo: res.data[0].titolo,
                    durata: '00:00'
                });
            });
            console.log('show');
            console.log(show);
            FetchDataGet(
                DBCALL_URL + ReservationDBcall.GETSEAT + props.id
            ).then((res) => {
                if (res.data.length > 0) {
                    res.data.map((response: { numposto: string }) => {
                        seat.push(response.numposto);
                    });
                    setBusy(seat);
                }
            });
        }
    }, []);
    let el: string;
    const seatbox: ReactElement[] = [];
    for (let i = 1; i <= 200; i++) {
        el = props.id + '-' + i.toString();
        if (busy.indexOf(el) == -1) {
            seatbox.push(
                <input
                    className="float-left m-2 h-6 w-6 cursor-pointer appearance-none rounded-t-full bg-white checked:bg-red-500 "
                    key={i}
                    type="checkbox"
                    value={el}
                    onClick={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                            if (posti.indexOf(e.target.value) === -1) {
                                AddElement(e.target.value);
                            } else {
                                RemoveElement(e.target.value);
                            }
                        }
                    }}
                />
            );
        } else {
            seatbox.push(
                <div className=" float-left m-2 h-6 w-6 rounded-full bg-slate-600"></div>
            );
        }
    }

    function AddElement(element: string) {
        if (posti.length === 0) {
            setPosti([element]);
        } else {
            setPosti([...posti, element]);
        }
    }

    function RemoveElement(element: string) {
        const newposti = posti.filter((posto: string) => {
            return posto != element;
        });
        setPosti(newposti);
    }

    function ReservationButton() {
        if (user.role == 0) {
            alert('login for procede reservation');
        } else {
            if (posti.length > 0) {
                if (
                    confirm(
                        "do you confirm the reservation?(don't worry is free)"
                    )
                ) {
                    FetchDataPost(
                        DBCALL_URL + ReservationDBcall.CREATE_RESERVATION,
                        { showId: props.id, userId: user.userId, seat: posti }
                    ).then(
                        // FetchDataPost(DBCALL_URL + 'reservation/a',{showId:props.id,userId:user.userId,seat:posti}).then(
                        (res) => {
                            if (res.status == 200) {
                                alert('reservation created');
                                navigate('/profile');
                            }
                        }
                    );
                }
            } else alert('select seat');
        }
    }

    let info;
    if (show == undefined) {
        info = <p>Loading</p>;
    } else {
        info = (
            <div className="mx-auto pt-[100px] text-center">
                <h1 className="text-2xl">
                    Title:<b>{show.titolo}</b>
                </h1>
                <h2 className="text-xl">
                    date: {show.giorno} - at:{show.ora}
                </h2>
            </div>
        );
    }

    const check = (
        <div className="p-auto clear-both m-auto p-[30px] text-center">
            <h1>
                posti selezionati:
                {posti.map((posto) => {
                    return ' , ' + posto.split('-')[1];
                })}
            </h1>
            {posti.length > 0 && <p>numero posti: {posti.length}</p>}
            <button
                className={
                    ' float-none mx-auto my-[10px] cursor-pointer' +
                    (posti.length > 0 ? BlueButton : ActiveButton)
                }
                onClick={() => {
                    ReservationButton();
                }}
            >
                Confirm
            </button>
        </div>
    );

    return (
        <div>
            <div>{info}</div>
            <div className="mx-auto w-[880px] p-[30px]">{seatbox}</div>
            <div>{check}</div>
        </div>
    );
}

export default SitBox;
