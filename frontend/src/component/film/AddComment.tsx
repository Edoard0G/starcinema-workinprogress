import { useState, useEffect } from 'react';
import { DBCALL_URL } from '../../root';
import { CommentDBcall } from '../../const';
import { FetchDataPost } from '../../fetchDB';
import StarButton from './StarButton';

function AddComment(props: { userId: number; filmId: number }) {
    const [comment, setComment] = useState('');
    const [vote, setVote] = useState(0);

    const bridge = (voteValue: number) => {
        setVote(voteValue);
        return;
    };
    function FetchData() {
        FetchDataPost(DBCALL_URL + CommentDBcall, {
            filmId: props.filmId,
            userId: props.userId,
            vote: vote,
            comment: comment
        }).then((res) => {
            alert(res.data);
        });
    }

    useEffect(() => {}, []);
    return (
        <div className="m-6 mx-auto min-h-[150px] w-[900px] rounded-[20px] bg-white p-[20px]">
            <div className="float-left"></div>
            <div>
                <StarButton voteState={bridge} vote={vote} />
            </div>
            <div className="clear-both ">
                <textarea
                    // className=" clear-both appearance-none resize-none"
                    className="min-h-[100px] w-[700px] resize-none appearance-none border-2 border-b-indigo-500"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <button
                    className="  float-right m-[10px] w-min rounded-full bg-blue-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    onClick={() => {
                        FetchData();
                    }}
                >
                    Post
                </button>
            </div>
        </div>
    );
}

export default AddComment;
