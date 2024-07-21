export type generalError = {
    message: string;
}

export type ApiResponse = {
    error: boolean;
    message: string;
    data?: unknown;
}