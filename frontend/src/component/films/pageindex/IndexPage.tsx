import { ActiveButton, BlueButton } from '../../../asset/layout/layout';

function IndexPage(props: {
    totali: number;
    attuale: number;
    callbackSetAttuale: (num: number) => void;
}) {
    const pagebutton = [];
    if (props != undefined) {
        for (let i = 1; i <= props.totali; i++) {
            pagebutton.push(
                <li key={i}>
                    <button
                        value={i}
                        className={
                            (i === props.attuale ? ActiveButton : BlueButton) +
                            ' m-[10px] p-2 px-4 py-2'
                        }
                        onClick={() => {
                            // if (e.target instanceof HTMLButtonElement)
                            // dispatch(changePages(Number(e.target.value)));
                            props.callbackSetAttuale(i);
                        }}
                    >
                        {i}
                    </button>
                </li>
            );
        }
    }
    return (
        <>
            <ul className="flex justify-center pb-[50px]">{pagebutton}</ul>
        </>
    );
}

export default IndexPage;
