import { CommentType } from '../../types/types';
import { AiFillStar } from 'react-icons/ai';
import { ReactElement } from 'react';

function Comment(props: { comment: CommentType }) {
    const vote: ReactElement[] = [];
    for (let i = 0; i < props.comment.vote; i++) {
        vote.push(
            <div className="float-left">
                <AiFillStar />
            </div>
        );
    }
    console.log(props.comment);

    return (
        <div className=" mx-auto my-[30px] bg-blue-300 p-[20px]">
            <h1 className="float-left text-xl">{props.comment.username}</h1>
            <div className="float-right">{vote}</div>
            <h1 className=" clear-both m-2 ">{props.comment.comment}</h1>
        </div>
    );
}

export default Comment;
