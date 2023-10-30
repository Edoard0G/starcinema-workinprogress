import '../../types/types';
import { IMG_ROOT } from '../../root';
import { Link } from 'react-router-dom';
import { FilmType } from '../../types/types';
function Locandina(props: { film: FilmType }) {
    return (
        <Link to={'/film/' + props.film.filmId}>
            <div className='float-left p-2'>
                {/* <p>{film.titolo}</p>  */}
                <img
                    className="rounded-[40px]  w-[350px] h-[550px]"
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
