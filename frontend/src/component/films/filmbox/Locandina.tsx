import { IMG_ROOT } from '../../../asset/DBcall/root';
import { Link } from 'react-router-dom';
import { FilmType } from '../../../asset/types/types';

function Locandina(props: { film: FilmType }) {
    return (
        <Link to={'/film/' + props.film.filmId}>
            <div className="float-left p-2">
                {/* <p>{film.titolo}</p>  */}
                <img
                    className="h-[550px]  w-[350px] rounded-[40px]"
                    alt=""
                    src={
                        IMG_ROOT +
                        props.film.titolo.toUpperCase().replaceAll(' ', '_') +
                        '.jpg'
                    }
                />
            </div>
        </Link>
    );
}

export default Locandina;
