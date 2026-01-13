export type User = {
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    password?: string
}

export type PassengerInfo = {
    schedule_id: number,
    bus_id: number,
    seatNumber: string; 
    startJournal: string;
    endJournal: string;
    idType: "passport" | "drivingLicense" | "nida" | "voterID" | "TIN" | "none";
    idNumber?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: "male" | "female";
    ageGroup: "adult" | "child" | "infant" | "elder";
    country: string;
}

