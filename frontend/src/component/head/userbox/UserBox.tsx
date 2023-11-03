import { Link } from 'react-router-dom';
import { Role } from '../../../asset/const/const';
import Logout from './Logout';
import { UserType } from '../../../asset/types/types';

function UserBox(props: { user: UserType }) {
    return (
        <div className="float-right w-[500px]  p-[10px] pt-[20px]">
            {props.user.role == Role.GUEST && (
                <>
                    <Link className="mx-[5px] px-[5px]" to="/singup">
                        <p className="float-right pl-[10px] pr-[50px] text-2xl underline">
                            signup
                        </p>
                    </Link>
                    <Link className="mx-[5px] px-[5px]" to="/login">
                        <p className="float-right px-[10px] text-2xl underline">
                            login
                        </p>
                    </Link>
                </>
            )}
            {props.user.role == Role.USER ||
                (props.user.role == Role.ADMIN && (
                    <>
                        <div className="float-right px-[5px]">
                            <Logout />
                        </div>
                        <p className="float-right px-[5px]">
                            Welcome, {' ' + props.user.username}
                        </p>
                    </>
                ))}
        </div>
    );
}

export default UserBox;
