import { Link } from 'react-router-dom';
import { Role } from '../../const';
import Logout from './Logout';
import { UserType } from '../../types/types';

function UserBox(props: { user:UserType }) {
    if(props.user.role === Number(Role.GUEST)){
        return
        (<div >
            <Link to="/login"><p className='text-2xl'>login</p></Link>
            <Link to="/signin">signin</Link>
        </div>
        )
    } else {
        return (
            <>
                <Logout />
            </>
        );
    }
}

export default UserBox;
