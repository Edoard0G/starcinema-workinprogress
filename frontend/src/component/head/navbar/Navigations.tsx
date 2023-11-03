import { useLocation } from 'react-router-dom';
import NavButton from './NavButton';
import { UserType } from '../../../asset/types/types';
import { Role } from '../../../asset/const/const';

function Navigation(props: { user: UserType }) {
    const location = useLocation();

    return (
        <ul className="  w-fit">
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
