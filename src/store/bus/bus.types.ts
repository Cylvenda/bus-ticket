export type Route = {
     id: string,
     origin: string,
     destination: string,
     distance_km: number,
     estimated_duration_minutes: number
}

export type SeatLayout = {
     rows: (string | null)[][]
}

export type Seat = {
     id: number
     seat_number: string
}

export type Bus = {
     id?: number;
     company_name?: string;
     bus_plate?: string;
     bus_type?: string;
     company?: string;
     total_seats?: string;
     amenities?: string;
     startPoint?: string;
     seat_layout_structure?: SeatLayout;
}

export type Schedule = {
     id?: number;
     route?: string;
     route_origin?: string;
     route_destination?: string;
     travel_date?: string;
     departure_time?: string;
     arrival_time?: string;
     price?: string;
     buses?: Bus[];
}

export type ScheduleSearchPayload = {
     origin?: string;
     destination?: string;
     date?: string;
}

export type GetBookedSeatsPayload = {
     schedule_id: number;
     bus_assignment_id: number;
}


export type HoldSeatPayload = {
     schedule_id: number;
     bus_assignment_id: number;
     seat_number: string;
}

export type HoldSeatResult = {
     held_seats?: string[];
     booked_seats?: string[];
}

export interface Passenger {
     id: number;
     first_name: string;
     last_name: string;
     email: string;
     phone: string;
     age: number;
     gender: "M" | "F";
     nationality: string;
     boarding_point: string;
     dropping_point: string;
}
export interface Booking {
     id: number;
     schedule: Schedule;
     bus_assignment: Bus;
     seat_number: string;
     price_paid: string;    
     status: "HELD" | "CONFIRMED" | "CANCELLED";
     is_paid: boolean;
     booked_at: string;      
     passenger: Passenger;
}