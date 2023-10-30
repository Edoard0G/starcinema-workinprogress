import { useEffect, useState } from 'react';
import { DBCALL_URL } from '../../root';
import { useNavigate } from 'react-router-dom';
import { Role, UserDBcall } from '../../const';
import { FetchDataPost } from '../../fetchDB';
import { useAppSelector } from '../../store/hook';
import { BlueButton, InputText, LabelInput } from '../../layout/layout';

function NewUser() {
    const user = useAppSelector((state) => state.user);

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    useEffect(() => {
        if (user.role != Role.GUEST) {
            navigate('/profile');
        }
    }, []);
    function AuthNewUser() {
        FetchDataPost(DBCALL_URL + UserDBcall.SINGUP, {
            username: username,
            email: email,
            password: password
        }).then((res) => {
            if (res.status == 200) {
                alert('new user created');
                navigate('/');
            }
            if (res.status == 201) {
                alert(res.data);
                setUsername('');
                setPassword('');
                setEmail('');
            }
        });
    }

    return (
        <div className="h-full w-full">
            <p className="w-full py-[50px] text-center text-4xl">SignIn</p>
            <div className=" mx-auto w-[500px]  space-y-5  border-[3px] border-solid border-slate-500 bg-slate-300 py-[100px]">
                <p className={LabelInput}>username</p>
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
                <p className={LabelInput}>email</p>
                <div className="mx-auto w-min">
                    <input
                        className={'mx-[100px] h-[35px] w-[300px] ' + InputText}
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <p className={LabelInput}>password</p>
                <div className="mx-auto w-min">
                    <input
                        className={'mx-[100px] h-[35px] w-[300px] ' + InputText}
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button
                    className={'mx-[190px] h-[50px] w-[100px]' + BlueButton}
                    onClick={() => {
                        AuthNewUser();
                    }}
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default NewUser;
