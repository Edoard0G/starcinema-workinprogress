import { DBCALL_URL } from '../../asset/DBcall/root';
import { useAppSelector } from '../../store/hook';
import Navigations from './navbar/Navigations';
import UserBox from './userbox/UserBox';
// import UserBox from './UserBox';

function Header() {
    const user = useAppSelector((state) => state.user);

    return (
        <>
            <div className=" mx-auto mb-5 h-[400px] w-[98%] min-w-[1000px] rounded-[40px] bg-gradient-to-b from-red-700 to-red-400 px-4 py-2 shadow-inner">
                <img
                    className="float-left h-[300px] w-[480px]"
                    src={DBCALL_URL + 'public/logo/starcinema.jpg'}
                    alt="STARCINEMA"
                />
                <UserBox user={user} />
                <div className="relative mx-auto  my-[300px]   flex  h-[60px] w-full  border-collapse justify-center rounded-full border-4 border-white bg-black shadow-lg shadow-zinc-700">
                    <Navigations user={user} />
                </div>
            </div>
        </>
    );
}

export default Header;
