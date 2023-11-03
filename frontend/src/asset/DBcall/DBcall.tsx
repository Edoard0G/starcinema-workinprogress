export const FilmDBcall = {
    ALL: 'film/all-title',
    DAY: 'film/find-film-date?day=',
    TITLE: 'film/find-film-title?title=',
    FILM: 'film/view-film?id='
};

export const ShowDBcall = {
    FIND: 'show/get-show?id=',
    FIND_BY_SHOWID: 'show/get-show-by-showId?showId=',
    NEW: 'show/new-show',
    WEEK_SHOW: 'show/list-show'
};
export const CommentDBcall = {
    NEW: 'comment/new-comment',
    FILM_COMMENT: 'comments/list-comment?id=',
    DELETE: 'comment/delete-comment?id=' //da implementare
};
export const UserDBcall = {
    SINGUP: 'user/signup',
    SINGIN: 'user/signin'
};

export const ReservationDBcall = {
    GETSEAT: 'reservation/get-seat?showId=',
    CREATE_RESERVATION: 'reservation/create-reservation',
    USER_RESERVATION: 'reservation/get-user-reservation',
    DELETE_RESERVATION: 'reservation/delete-user-reservation'
};
