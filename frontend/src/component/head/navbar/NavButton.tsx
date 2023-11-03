import { Link } from 'react-router-dom';
import { ActiveButton, BlueButton } from '../../../asset/layout/layout';

function NavButton(props: { name: string; path: string; actual_path: string }) {
    return (
        <li
            className={
                (props.path === props.actual_path ? ActiveButton : BlueButton) +
                ' float-left mx-1 h-full   px-2 py-3 shadow-lg '
            }
        >
            <Link to={props.path}>{props.name}</Link>
        </li>
    );
}

export default NavButton;
