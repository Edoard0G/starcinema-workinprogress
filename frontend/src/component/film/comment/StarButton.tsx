import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function StarButton(props: { vote: number; voteState: (x: number) => void }) {
    function Icon(num: number) {
        if (num <= props.vote) {
            return (
                <div className="h-[25px] w-[25px]">
                    <AiFillStar />
                </div>
            );
        } else {
            return (
                <div className="h-[25px] w-[25px]">
                    <AiOutlineStar />
                </div>
            );
        }
    }
    return (
        <div>
            <button
                value={1}
                onClick={() => {
                    props.voteState(1);
                }}
            >
                {Icon(1)}
            </button>
            <button
                value={2}
                onClick={() => {
                    props.voteState(2);
                }}
            >
                {Icon(2)}
            </button>
            <button
                value={3}
                onClick={() => {
                    props.voteState(3);
                }}
            >
                {Icon(3)}
            </button>
            <button
                value={4}
                onClick={() => {
                    props.voteState(4);
                }}
            >
                {Icon(4)}
            </button>
            <button
                value={5}
                onClick={() => {
                    props.voteState(5);
                }}
            >
                {Icon(5)}
            </button>
        </div>
    );
}

export default StarButton;
