import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { useEffect, useState } from 'react';
import { SingIn } from '../userSlice';
import { FetchDataPost } from '../../../asset/DBcall/fetchDB';
import { DBCALL_URL } from '../../../asset/DBcall/root';
import { Role } from '../../../asset/const/const';
import { UserDBcall } from '../../../asset/DBcall/DBcall';
import {
    BlueButton,
    InputText,
    LabelInput
} from '../../../asset/layout/layout';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.role != Role.GUEST) {
            navigate('/profile');
        }
    }, []);
    function CommitLogin() {
        FetchDataPost(DBCALL_URL + UserDBcall.SINGIN, {
            username: username,
            password: password
        }).then((res) => {
            if (res.status == 200) {
                dispatch(
                    SingIn({
                        username: res.data.username,
                        userId: res.data.userId,
                        email: res.data.email,
                        role: res.data.role
                    })
                );
                alert('Wellcome,' + username);
                // navigate('/');
                navigate(-1);
            }
            if (res.status == 201) {
                alert(res.data);
                setUsername('');
                setPassword('');
            }
        });
    }

    return (
        <div className="h-full w-full">
            <p className="w-full py-[50px] text-center text-4xl">LogIn</p>
            <div className=" mx-auto w-[500px]  space-y-5  border-[3px] border-solid border-slate-500 bg-slate-300 py-[100px]">
                <p className={LabelInput}>Username:</p>
                <div className="mx-auto w-min">
                    <input
                        className={'mx-[100px] h-[35px] w-[300px] ' + InputText}
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <p className={LabelInput}>Password:</p>
                <div className="mx-auto w-min">
                    <input
                        type="password"
                        className={'mx-[100px] h-[35px] w-[300px] ' + InputText}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <button
                    className={
                        'float-none mx-[190px] h-[35px] w-[100px]' + BlueButton
                    }
                    onClick={() => {
                        CommitLogin();
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
