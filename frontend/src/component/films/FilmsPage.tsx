import { useEffect, useState } from 'react';
import { FilmType } from '../../asset/types/types';
import SearchBar from './searchbar/SearchBar';
import LocandinaBox from './filmbox/LocandinaBox';
import IndexPage from './pageindex/IndexPage';
import { DIM_FILM_PAGE } from '../../asset/const/const';

function FilmsPage() {
    const [list, setList] = useState<FilmType[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [actualPage, setActualPage] = useState(1);
    const [mode, setMode] = useState(true);

    function ChangeMode() {
        setMode(!mode);
    }

    useEffect(() => {
        UpdatePages(list.length);
    }, [list, mode]);

    function UpdatePages(listLen: number) {
        let len: number;
        if (mode) len = DIM_FILM_PAGE.CLASSIC_MODE;
        else len = DIM_FILM_PAGE.ALTERNATIVE_MODE;
        let numpage = ~~(listLen / len);
        if (listLen % len > 0) numpage++;
        setTotalPages(numpage);
        setActualPage(1);
    }
    function UpdateList(filmList: FilmType[]) {
        setList(filmList);
    }
    return (
        <>
            <SearchBar
                callbackUpdateList={UpdateList}
                callbackChangeMode={ChangeMode}
            />
            <div className="min-h-[1200px]">
                <LocandinaBox list={list} mode={mode} actualPage={actualPage} />
            </div>
            <div>
                <IndexPage
                    totali={totalPages}
                    attuale={actualPage}
                    callbackSetAttuale={setActualPage}
                />
            </div>
        </>
    );
}

export default FilmsPage;
