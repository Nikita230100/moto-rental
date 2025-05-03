import { axiosInstance } from '../../../shared/lib/axiosInstance';
import { ServerResponseType } from '../../../shared/types';
import { CardDataType, CardType } from '../model';

export class CardApi {
  static async getAll(): Promise<ServerResponseType<CardType[]>> {
    const { data } = await axiosInstance.get('/cards');
    return data;
  }

  static async getById(id: number): Promise<ServerResponseType<CardType>> {
    const { data } = await axiosInstance.get(`/cards/${id}`);
    return data;
  }

  static async create(
    inputs: CardDataType
  ): Promise<ServerResponseType<CardType>> {
    const { data } = await axiosInstance.post('/cards', inputs);
    return data;
  }

  static async update(
    id: number,
    inputs: CardDataType
  ): Promise<ServerResponseType<CardType>> {
    const { data } = await axiosInstance.put(`/cards/${id}`, inputs);
    return data;
  }

  static async delete(id: number): Promise<ServerResponseType<void>> {
    const { data } = await axiosInstance.delete(`/cards/${id}`);
    return data;
  }
}
