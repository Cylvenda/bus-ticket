import type { Bus, Schedule } from "../bus/bus.types";

export type ListResponse<T> = {
     count: string
     next: string | null
     previous: string | null
     results: T[]
}


export type ScheduleTemplate = {
     id: number;
     route: number;
     departure_time: string;
     arrival_time: string;
     base_price: string;
     is_active: boolean;
}


export type BusAssignment = {
     id: number;
     available_seats: number;
     bus: Bus;
}

export type Passenger = {
     id: number;
     first_name: string;
     last_name: string;
     email: string;
     phone: string;
     age_group?: string;
     age: number | string;
     gender: Gender;
     nationality: string;
     boarding_point: string;
     dropping_point: string;
}

export type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED";

export type Gender = "M" | "F";

export type Booking = {
     id: number;
     schedule: Schedule;
     bus_assignment: BusAssignment;
     seat_number: string;
     price_paid: number ;
     status: BookingStatus;
     is_paid: boolean;
     booked_at: string;
     passenger: Passenger;
}


export type RouteStop = {
     id: number;
     route?: Route;
     stop_name: string;
     stop_order: number;
     arrival_offset_min: number;
     departure_offset_min: number;
};

export type Route = {
     origin: string;
     destination: string;
     distance_km?: number;
     estimated_duration_minutes?: number;
     stops?: RouteStop[]
};

export type ScheduleGet = {
     travel_date: string
     departure_time: string
     arrival_time: string
     price: string
}


export type BusCompany = {
     id: string
     name: string
     contact_email: string
     license_number: string
}