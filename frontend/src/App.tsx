import Header from './component/head/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import Film from './component/film/Films';
// import WeekBox from './component/week/WeekBox';
import Weeks from './component/week/Weeks';
import SeatBox from './component/seat/SeatBox';
import Login from './component/user/login/Login';
import NewUser from './component/user/signin/NewUser';
import Profile from './component/user/profile/Profile';
import FilmsPage from './component/films/FilmsPage';
import Footer from './component/footer/Footer';

function App() {
    return (
        <>
            <div className="fit min-h-[800px] min-w-[1100px] bg-gradient-to-t from-orange-600  via-white to-indigo-700 p-[20px] shadow-inner ">
                <Header />

                <div className="relative mx-auto  min-h-[800px] min-w-[900px] max-w-[1100px] rounded-[40px]  bg-slate-200">
                    <Routes>
                        <Route path="/" element={<FilmsPage />} />

                        <Route path="/calendar" element={<Weeks />} />
                        <Route path="/film/">
                            <Route path=":id" element={<Film />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/singup" element={<NewUser />} />
                        <Route path="/seat/">
                            <Route path=":id" element={<SeatBox />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
