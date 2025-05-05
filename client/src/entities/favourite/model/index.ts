import { CardType } from "../../card/model";

export type FavouriteDataType = {
    userId:number;
    cardId: number;
    Card: CardType;
}

export type FavouriteType = FavouriteDataType & {
    id: number;
    createdAt: string;
    updatedAt: string;
}