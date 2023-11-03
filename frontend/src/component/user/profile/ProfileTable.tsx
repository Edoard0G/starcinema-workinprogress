import { ReservationDBcall } from '../../../asset/DBcall/DBcall';
import { FetchDataPost } from '../../../asset/DBcall/fetchDB';
import { DBCALL_URL } from '../../../asset/DBcall/root';
import { ReservationType } from '../../../asset/types/types';

function ProfileTable(props: {
    reservation: ReservationType[];
    bridge: () => void;
}) {
    function DeleteReservation(id: string) {
        const ver = confirm('are sure to delete reservation? ');
        if (ver) {
            FetchDataPost(DBCALL_URL + ReservationDBcall.DELETE_RESERVATION, {
                prenotazioneId: id
            }).then((res) => {
                if (res.status == 200) {
                    alert('reservation deleted');
                    props.bridge();
                }
            });
        }
    }
    return (
        <>
            <table className="appearance-none">
                <thead className="h-[40px]appearance-none">
                    <tr>
                        <th className="">Titolo</th>
                        <th className="">Giorno</th>
                        <th className="">Posti</th>
                        <th className="">Button</th>
                    </tr>
                </thead>
                {props.reservation.map((res: ReservationType) => {
                    return (
                        <tr>
                            <th>{res.title}</th>
                            <th>
                                {res.day} - {res.time}{' '}
                            </th>
                            <th>
                                {res.seat.map((seat) => {
                                    return <>p{seat.split('-')[1]} </>;
                                })}
                            </th>
                            <th>
                                <button
                                    className=" m-2 rounded-full bg-orange-500 px-4 py-2"
                                    onClick={() =>
                                        DeleteReservation(res.reservationId)
                                    }
                                >
                                    Delete
                                </button>
                            </th>
                        </tr>
                    );
                })}
            </table>
        </>
    );
}

export default ProfileTable;
