import { Link } from 'react-router-dom';
import { ActiveButton, BlueButton } from '../../layout/layout';

function NavButton(props: { name: string; path: string; actual_path: string }) {
    return (
        <li
            className={
                props.path === props.actual_path ? ActiveButton : BlueButton
            }
        >
            <Link to={props.path}>{props.name}</Link>
        </li>
    );
}

export default NavButton;
