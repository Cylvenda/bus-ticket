export type ticketUserInfoType = {
    seatNumber: string,
    seatPrice: number,
    idType: "passport" | "driverLicense" | "nida" | "voterId" | "TIN" | "none",
    idNumber: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: "male" | "female" | null,
    ageGroup: "adult" | "child" | "infant" | "elder",
    country: string | "Tanzania",
    startJournal: string,
    endJournal: string,
    totalTicketsAmount: number
}