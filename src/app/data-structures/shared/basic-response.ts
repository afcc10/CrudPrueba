export interface BasicResponse<T> {
    status: boolean;
    message: { message: string } | Array<{ message: string }>;
    objectResponse: T
}