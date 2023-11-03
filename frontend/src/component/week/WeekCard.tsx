import { getISODay } from 'date-fns';
import { ShowType } from '../../asset/types/types';
import {
    WeekRoom1,
    WeekRoom2,
    WeekRoom3,
    WeekRoom4
} from '../../asset/layout/layout';

function WeekCard(props: { show: ShowType }) {
    const t = props.show.ora.split(':');
    const top: number = 1 + (Number(t[0]) - 13) * 64 + Number(t[1]);
    const l = props.show.durata.split(':');
    const leng: number = Number(l[0]) * 60 + Number(l[1]);
    const left = 1 + getISODay(new Date(props.show.giorno)) * 137;
    let color;
    if (props.show.sala == 1) color = WeekRoom1;
    if (props.show.sala == 2) color = WeekRoom2;
    if (props.show.sala == 3) color = WeekRoom3;
    if (props.show.sala == 4) color = WeekRoom4;

    return (
        <div
            className={
                color +
                ' py-auto my-auto box-border  rounded-[10px] border-[2px] border-black hover:z-10'
            }
            style={{
                width: '137px',
                position: 'absolute',
                top: top,
                left: left,
                height: leng
            }}
        >
            <p className="text-center">{props.show.titolo}</p>
            <p className="text-center">{props.show.giorno}</p>
            <p className="text-center">{props.show.ora}</p>
        </div>
    );
}

export default WeekCard;
