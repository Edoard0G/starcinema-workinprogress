import { useAppDispatch, useAppSelector } from '../../store/hook';
import { changePages } from './pageSlice';

function PagesIndex() {
    const pages = useAppSelector((state) => state.pages);
    const dispatch = useAppDispatch();

    const pagebutton = [];
    for (let i = 1; i <= Number(pages.totali); i++) {
        pagebutton.push(
            <li key={i}>
                <button
                    value={i}
                    className={
                        i === pages.attuale
                            ? 'float-left m-[10px] w-min rounded-full  bg-slate-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700'
                            : 'float-left m-[10px] w-min rounded-full bg-blue-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700'
                    } //sistema qua
                    onClick={(e) => {
                        if (e.target instanceof HTMLButtonElement)
                            dispatch(changePages(Number(e.target.value)));
                    }}
                >
                    {i}
                </button>
            </li>
        );
    }
    return <ul className="flex justify-center pb-[50px]">{pagebutton}</ul>;
}
export default PagesIndex;
