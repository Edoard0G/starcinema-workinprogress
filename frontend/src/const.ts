//slice page reducer
export const ACTIONS = {
    UPDATE_LIST: 'update-list',
    NEW_MODE: 'new-mode',
    NEW_PAGE: 'new-page',
    // IS_LOADING: 'is-loading',
    // END_LOADING: 'end-loading'
};

// const number of element show in FilmBox mode
export const CONST = {
    CLASSIC_MODE: 6,
    ALTERNATIVE_MODE: 4
};

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

export enum Role {
    GUEST,
    USER,
    ADMIN
}
