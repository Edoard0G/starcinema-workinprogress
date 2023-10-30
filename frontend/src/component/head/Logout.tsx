import { useAppDispatch } from '../../store/hook';
import { SingOut } from '../login/userSlice';

function Logout() {
    const dispatch = useAppDispatch();
    return (
        <button
            className="appearance-none underline"
            onClick={() => dispatch(SingOut())}
        >
            Logout
        </button>
    );
}

export default Logout;
