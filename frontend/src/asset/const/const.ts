//slice page reducer
export const ACTIONS = {
    UPDATE_LIST: 'update-list',
    NEW_MODE: 'new-mode',
    NEW_PAGE: 'new-page'
    // IS_LOADING: 'is-loading',
    // END_LOADING: 'end-loading'
};

// const number of element show in FilmBox mode
export const DIM_FILM_PAGE = {
    CLASSIC_MODE: 6,
    ALTERNATIVE_MODE: 4
};

export enum Role {
    GUEST,
    USER,
    ADMIN
}
