export type Route = {
     id: number,
     origin: string,
     destination: string,
     distance_km: number,
     estimated_duration_minutes: number,
     stops?: RouteStop[]
}

export type RouteStop = {
     id: number,
     route_id: number,
     stop_name: string,
     stop_order: number,
     arrival_offset_min?: number,
     departure_offset_min?: number
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
     company_id?: number;
     plate_number?: string;
     bus_type?: string;
     amenities?: string;
     is_active?: boolean;
     total_seats?: number;
     seat_layout_structure?: SeatLayout;
     seat_layout_id?: number;
}

export type Schedule = {
     id?: number;
     route?: string;
     route_id?: number;
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