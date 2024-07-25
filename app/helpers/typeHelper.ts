import {$Enums} from "@prisma/client";

export type generalError = {
    message: string;
}

export type ApiResponse = {
    error: boolean;
    message: string;
    data?: unknown;
}

export type tripRequest = {
    area: string
    estimasi: string
    status: $Enums.TripStatus
    wage: number
    date: Date | string
    car_id?: number
    employee1_id?: number
    employee2_id?: number
    activity?: number[]
}