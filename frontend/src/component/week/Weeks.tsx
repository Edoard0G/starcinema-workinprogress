import { useEffect, useState } from 'react';
import { startOfToday, format, getISODay, subDays, addDays } from 'date-fns';
import WeekCard from './WeekCard';
import './week.css';
import { DBCALL_URL } from '../../asset/DBcall/root';
import AddShow from './AddShow';
import { ShowType } from '../../asset/types/types';
import { Role } from '../../asset/const/const';
import { ShowDBcall } from '../../asset/DBcall/DBcall';
import { FetchDataPost } from '../../asset/DBcall/fetchDB';
import WeekTable from './WeekTable';
import { useAppSelector } from '../../store/hook';

function Weeks() {
    const [buttonRoom, setbuttonRoom] = useState([true, true, true, true]);

    const today = format(startOfToday(), 'yyyy-MM-dd');
    const [day, setDay] = useState(today);
    const user = useAppSelector((state) => state.user);
    const [isloading, setIsloading] = useState(true);
    const [showlist, setShowList] = useState<ShowType[]>([]);
    const [week, setWeek] = useState<string[]>([]);

    useEffect(() => {
        setIsloading(true);

        const finddays = getISODay(new Date(day));
        const monday = subDays(new Date(day), finddays - 1);
        const sunday = addDays(monday, 6);

        const newweek: string[] = [];
        for (let i = 0; i < 7; i++) {
            newweek.push(format(addDays(monday, i), 'yyyy-MM-dd'));
        }
        setWeek(newweek);

        const shows: ShowType[] = [];
        const start = format(monday, 'yyyy-MM-dd');
        const end = format(sunday, 'yyyy-MM-dd');
        FetchDataPost(DBCALL_URL + ShowDBcall.WEEK_SHOW, {
            start: start,
            end: end
        }).then((res) => {
            res.data.map((show: ShowType) => {
                show.giorno = format(new Date(show.giorno), 'yyyy-MM-dd');
                shows.push(show);
            });
            setShowList(shows);

            setIsloading(false);
        });
    }, [day]);

    function UpdateButton(num: number) {
        const newbutt = buttonRoom.map((room, index) => {
            if (index + 1 != num) return room;
            else return !room;
        });
        setbuttonRoom(newbutt);
    }

    let element;
    if (!isloading && showlist.length > 0) {
        element = showlist.map((show) => {
            if (buttonRoom[show.sala - 1])
                return <WeekCard key={show.spettacoloId} show={show} />;
        });
    }

    return (
        <div>
            <div className="p-auto m-auto w-[400px] pt-[50px] ">
                <button
                    className="m-[10px] rounded-[10px] bg-orange-500 p-[10px]"
                    onClick={() => {
                        UpdateButton(1);
                    }}
                >
                    SALA 1
                </button>
                <button
                    className="m-[10px] rounded-[10px] bg-emerald-400 p-[10px]"
                    onClick={() => {
                        UpdateButton(2);
                    }}
                >
                    SALA 2
                </button>
                <button
                    className="m-[10px] rounded-[10px] bg-cyan-600 p-[10px]"
                    onClick={() => {
                        UpdateButton(3);
                    }}
                >
                    SALA 3
                </button>
                <button
                    className="m-[10px] rounded-[10px] bg-rose-600 p-[10px]"
                    onClick={() => {
                        UpdateButton(4);
                    }}
                >
                    SALA 4
                </button>
            </div>
            <div className=" p-auto mx-auto mb-[30px] w-[150px] pt-[50px] text-center">
                <p>scegli settimana:</p>
                <input
                    type="date"
                    value={day}
                    min={today}
                    onChange={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                            setDay(
                                format(new Date(e.target.value), 'yyyy-MM-dd')
                            );
                        }
                    }}
                />
            </div>

            <div className="relative h-[900px]">
                <WeekTable week={week} />
                {element}
            </div>
            {user.role == Role.ADMIN && (
                <div className="m-2 p-2">
                    <AddShow />
                </div>
            )}
        </div>
    );
}

export default Weeks;
