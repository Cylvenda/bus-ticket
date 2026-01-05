export type Bus = {
    id: number;
    startDate: string;
    endDate: string;
    plateNumber: string;
    from: string;
    to: string;
    company: string;
    type: string;
    startTime: string;
    endTime: string;
    startPeriod: string;
    endPeriod: string;
    price: string;
    startPoint: string;
    endPoint: string;
}

export type Seat = {
    id: string;
    status: "available" | "booked" | "selected";
    price?: number;
}


export type SelectedSeat = {
    seatNumber: string;
    seatPrice: number;
}

export type PassengerInfo = {
    seatNumber: string;
    seatPrice: number;
    startJournal: string;
    endJournal: string;
    idType: "passport" | "drivingLicense" | "nida" | "voterID" | "TIN" | "none";
    idNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: "male" | "female";
    ageGroup: "adult" | "child" | "infant" | "elder";
    country: string;
}

export type SeatStatus = "available" | "booked" | "selected"


export type SeatLayout = {
    left?: Seat[]
    right?: Seat[]
    last?: Seat[]
    special?: "door" | "driver" | "toilet"
}

export type PassengerRoute = {
    selectedRouteFrom: string,
    selectedRouteTo: string,
    selecteDate: string
}