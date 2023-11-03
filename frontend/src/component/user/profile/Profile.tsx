import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hook';
import { FetchDataPost } from '../../../asset/DBcall/fetchDB';
import { ReservationDBcall } from '../../../asset/DBcall/DBcall';
import { Role } from '../../../asset/const/const';
import { DBCALL_URL } from '../../../asset/DBcall/root';
import { format } from 'date-fns';
import { ReservationType } from '../../../asset/types/types';
import ProfileTable from './ProfileTable';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const [isloading, setIsloading] = useState(true);
    const [reservation, setReservation] = useState<ReservationType[]>([]);

    function LoadReservation() {
        setIsloading(true);
        FetchDataPost(DBCALL_URL + ReservationDBcall.USER_RESERVATION, {
            userId: user.userId
        }).then((res) => {
            const prenId: string[] = [];
            const list: ReservationType[] = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res.data.map((find: any) => {
                const index = prenId.indexOf(find.prenotazioneId);
                if (index === -1) {
                    prenId.push(find.prenotazioneId);
                    list.push({
                        reservationId: find.prenotazioneId,
                        title: find.titolo,
                        day: format(new Date(find.giorno), 'yyyy-MM-dd'),
                        time: find.ora,
                        seat: [find.numposto]
                    });
                } else {
                    list[index].seat.push(find.numposto);
                }
            });
            setReservation(list);
        });
        setIsloading(false);
    }
    useEffect(() => {
        if (user.role != Role.USER) {
            navigate('/');
        } else {
            LoadReservation();
        }
    }, []);

    return (
        <>
            <p className="py-[40px] text-center text-7xl">{user.username}</p>
            <div className="flex justify-center">
                {!isloading && (
                    <ProfileTable
                        reservation={reservation}
                        bridge={LoadReservation}
                    />
                )}
            </div>
        </>
    );
}

export default Profile;
