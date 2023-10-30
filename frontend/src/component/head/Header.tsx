//import { Link } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Role } from '../../const';
import { DBCALL_URL } from '../../root';
import { useAppSelector } from '../../store/hook';
import Navigations from './Navigations';
import Logout from './Logout';
// import UserBox from './UserBox';

function Header() {
    const user = useAppSelector((state) => state.user);

    return (
        <>
            <div className=" mx-auto mb-5 h-[500px] w-[98%] min-w-[1000px] rounded-[40px] bg-gradient-to-b from-red-700 to-red-400 px-4 py-2 shadow-inner">
                <img
                    className="float-left h-[300px] w-[480px]"
                    src={DBCALL_URL + 'public/logo/starcinema.jpg'}
                    alt="STARCINEMA"
                />

                <div className="float-right w-[500px]  p-[10px] pt-[20px]">
                    {user.role == Role.GUEST && (
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
                    {user.role == Role.USER && (
                        <>
                            <div className="float-right px-[5px]">
                                <Logout />
                            </div>
                            <p className="float-right px-[5px]">
                                Welcome, {' ' + user.username}
                            </p>
                        </>
                    )}
                </div>
                <div className="relative mx-auto  my-[370px] flex  h-[70px] w-[95%] border-collapse justify-center rounded-full border-4 border-white bg-black">
                    <Navigations user={user} />
                </div>
            </div>
        </>
    );
}

export default Header;
