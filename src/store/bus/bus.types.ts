export type Route = {
     id: string,
     origin: string,
     destination: string,
     distance_km: number,
     estimated_duration_minutes: number,
     stops?: RouteStop[]
}

export type RouteStop = {
     id: number,
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
     plate_number?: string;
     bus_type?: string;
     is_active?: string;
     total_seats?: string;
     amenities?: string;
     startPoint?: string;
     seat_layout_structure?: SeatLayout;
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