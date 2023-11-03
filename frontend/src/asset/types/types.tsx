export interface FilmType {
    filmId: number;
    titolo: string;
    trama: string;
    youtube: string;
    durata: string;
}

export interface ListShows {
    day: string;
    time: string[];
}

export interface CommentType {
    commentoId: number;
    username: string;
    vote: number;
    comment: string;
}

export interface PagesType {
    attuale: number;
    totali: number;
    classic: boolean;
}

export interface ShowInfoType {
    giorno: string;
    ora: string;
    spettacoloId: number;
}

export interface UserType {
    username: string | null;
    userId: string | null;
    email: string | null;
    role: number;
}

export interface ReservationType {
    reservationId: string;
    title: string;
    day: string;
    time: string;
    seat: string[];
}
export interface ShowType {
    spettacoloId: number;
    giorno: string;
    ora: string;
    sala: number;
    titolo: string;
    durata: string;
}
