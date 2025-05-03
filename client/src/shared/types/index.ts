export type ServerResponseType<T> = {
    data: T | null;
    message: string;
    statusCode: number;
    error: string | null;
}