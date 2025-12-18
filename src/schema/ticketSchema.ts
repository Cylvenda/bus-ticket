import * as z from "zod"


export const FormTicketUserInfoSchema = z.object({
    seatNumber: z.string().min(1, "Seat Number is required"),
    seatPrice: z.string().min(1, "Seat Price is required"),
    idType: z.enum(["passport", "drivingLicense", "nida", "voterID", "TIN", "none"]),
    idNumber: z.string().min(1, "ID Number is required"),
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    gender: z.enum(["male", "female", "null"]),
    ageGroup: z.enum(["adult", "child", "infant", "elder"]),
    country: z.string().min(1, "Country is required"),
    startJournal: z.string().min(1, "You have to select the beggining of your journal"),
    endJournal: z.string().min(1, "You have to select the end of your journal"),
    totalTicketsAmount: z.string().min(1, "Invalid Amount")
}
)