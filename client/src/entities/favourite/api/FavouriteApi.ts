import { axiosInstance } from "../../../shared/lib/axiosInstance";
import { ServerResponseType } from "../../../shared/types";
import { FavouriteType } from "../model";

export class FavouriteApi {
    static async createOrDel(id:number): Promise<ServerResponseType<FavouriteType>> {
        const {data} = await axiosInstance.post(`/favourite/card/${id}/likes`)
        return data
    }

    static async getAll():Promise<ServerResponseType<FavouriteType[]>> {
        const {data} = await axiosInstance.get(`/favourite/my`)
        return data
    }
}