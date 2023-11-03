import { IMG_ROOT } from '../../../asset/DBcall/root';
import { Link } from 'react-router-dom';
import { FilmType } from '../../../asset/types/types';

function Locandina2(props: { film: FilmType }) {
    return (
        <Link to={'/film/' + props.film.filmId}>
            <div className=" clear-left mx-auto mb-[10px]   block h-[300px] w-[1000px] bg-neutral-300 ring-2  ring-slate-800">
                <img
                    className=" float-left h-[300px] w-[200px] p-[10px] "
                    alt=""
                    src={
                        IMG_ROOT +
                        props.film.titolo.toUpperCase().replaceAll(' ', '_') +
                        '.jpg'
                    }
                />
                <p className="p-20px text-2xl">{props.film.titolo}</p>
                <p className="my-[20px] text-xl">{props.film.trama}</p>
            </div>
        </Link>
    );
}

export default Locandina2;
