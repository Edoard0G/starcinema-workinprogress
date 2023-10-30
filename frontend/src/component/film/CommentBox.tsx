import { useEffect, useState } from 'react';
import { DBCALL_URL } from '../../root';
import { CommentType, UserType } from '../../types/types';
import Comment from './Comment';
import { CommentDBcall, Role } from '../../const';
import AddComment from './AddComment';
import { FetchDataGet } from '../../fetchDB';

function CommentBox(props: { id: number; user: UserType }) {
    const [isloading, setIsloading] = useState(true);
    const [comments, setComments] = useState<CommentType[]>();

    useEffect(() => {
        setIsloading(true);
        const commentlist: CommentType[] = [];
        FetchDataGet(DBCALL_URL + CommentDBcall.FILM_COMMENT + props.id).then(
            (res) => {
                res.data.map((show: CommentType) => commentlist.push(show));
                setComments(commentlist);
                setIsloading(false);
            }
        );
    }, []);

    let allcomment;
    if (!isloading && comments != undefined) {
        allcomment = (
            <div className="m-6 mx-auto min-h-[150px] w-[900px] rounded-[20px] bg-white p-[20px]">
                {comments.map((comment: CommentType) => {
                    return (
                        <Comment key={comment.commentoId} comment={comment} />
                    );
                })}
            </div>
        );
    }

    return (
        <>
            {props.user.role === Role.USER && (
                <AddComment userId={1} filmId={props.id} />
            )}
            <h1 className=" text-center">Commenti</h1>
            <div className="py-[20px]">{allcomment}</div>
        </>
    );
}

export default CommentBox;
