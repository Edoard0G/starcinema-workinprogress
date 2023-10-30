import FilmsBox from './component/films/FilmsBox';
import Header from './component/head/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import Film from './component/film/Films';
// import WeekBox from './component/week/WeekBox';
import Weeks from './component/week/Weeks';
import SitBox from './component/sit/SitBox';
import Login from './component/login/Login';
import NewUser from './component/login/NewUser';
import Profile from './component/login/Profile';

function App() {
    return (
        <>
            <div className="fit bg-gradient-to-t from-orange-600 via-white to-indigo-700  min-h-[800px] min-w-[1100px] shadow-inner p-[20px] ">
                
                    <Header />
                
                <div className="relative bg-slate-200  rounded-[40px] min-h-[800px] max-w-[1100px] min-w-[900px]  mx-auto">
                    <Routes>
                        <Route path="/" element={<FilmsBox />} />
                        

                        <Route path="/calendar" element={<Weeks />} />
                        {/* <Route path="/calendar" element={<WeekBox />} /> */}
                        <Route path="/film/">
                            <Route path=":id" element={<Film />} />

                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/singup" element={<NewUser />} />
                        <Route path="/seat/">
                            <Route path=":id" element={<SitBox />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
