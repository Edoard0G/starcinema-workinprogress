import { useLocation } from 'react-router-dom';
import NavButton from './NavButton';
import { UserType } from '../../types/types';
import { Role } from '../../const';

function Navigation(props: { user: UserType }) {
    const location = useLocation();

    return (
        <ul>
            <NavButton name="HOME" path="/" actual_path={location.pathname} />

            <NavButton
                name="CALENDAR"
                path="/calendar"
                actual_path={location.pathname}
            />
            {props.user.role == Role.USER && (
                <NavButton
                    name="PROFILE"
                    path="/profile"
                    actual_path={location.pathname}
                />
            )}
        </ul>
    );
}

export default Navigation;
