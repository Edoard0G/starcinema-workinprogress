// import './week.css';
import { format, addDays } from 'date-fns';



function WeekTable(props:{week:string[]}){
    

    return (
        <>
        <table className=" absolute t-0 l-0 m-auto p-auto">
                    <tr>
                        <td></td>
                        <th><p>Monday</p><p>{props.week.length > 0 && props.week[0]}</p></th>
                        <th><p>Tuesday</p><p>{props.week.length > 0 && props.week[1]}</p></th>
                        <th><p>Wednesday</p><p>{props.week.length > 0 && props.week[2]}</p></th>
                        <th><p>Thursday</p><p>{props.week.length > 0 && props.week[3]}</p></th>
                        <th><p>Friday</p><p>{props.week.length > 0 && props.week[4]}</p></th>
                        <th><p>Saturday</p><p>{props.week.length > 0 && props.week[5]}</p></th>
                        <th><p>Sunday</p><p>{props.week.length > 0 && props.week[6]}</p></th>
                    </tr>

                    <tr>
                        <th>14:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>15:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>16:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>17:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>18:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>19:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>20:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>21:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>22:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>23:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>00:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>01:00</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </table>
                </>
    )
}

export default WeekTable