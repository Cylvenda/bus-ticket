import * as z from "zod"


export const FormTicketUserInfoSchema = z.object({
    seatNumber: z.string(),
    idType: z.enum(["passport", "drivingLicense", "nida", "voterID", "TIN", "none"]),
    idNumber: z.string().optional(),
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    gender: z.enum(["male", "female"]),
    ageGroup: z.enum(["adult", "child", "infant", "elder"]),
    country: z.string().min(1, "Country is required"),
    startJournal: z.string().min(1, "You have to select the beggining of your journal"),
    endJournal: z.string().min(1, "You have to select the end of your journal")
}).superRefine((data, ctx) => {
    // NONE → no validation
    if (data.idType === "none") return

    if (!data.idNumber || !data.idNumber.trim()) {
        ctx.addIssue({
            path: ["idNumber"],
            message: "ID Number is required",
            code: z.ZodIssueCode.custom,
        })
        return
    }

    switch (data.idType) {
        case "nida":
            if (!/^\d{20}$/.test(data.idNumber)) {
                ctx.addIssue({
                    path: ["idNumber"],
                    message: "NIDA must be exactly 20 digits",
                    code: z.ZodIssueCode.custom,
                })
            }
            break

        case "passport":
            if (!/^[A-Z0-9]{6,9}$/i.test(data.idNumber)) {
                ctx.addIssue({
                    path: ["idNumber"],
                    message: "Passport number must be 6–9 alphanumeric characters",
                    code: z.ZodIssueCode.custom,
                })
            }
            break

        case "drivingLicense":
            if (data.idNumber.length < 5) {
                ctx.addIssue({
                    path: ["idNumber"],
                    message: "Driving License number is too short",
                    code: z.ZodIssueCode.custom,
                })
            }
            break

        case "TIN":
            if (!/^\d{9}$/.test(data.idNumber)) {
                ctx.addIssue({
                    path: ["idNumber"],
                    message: "TIN must be exactly 9 digits",
                    code: z.ZodIssueCode.custom,
                })
            }
            break

        case "voterID":
            if (data.idNumber.length < 10) {
                ctx.addIssue({
                    path: ["idNumber"],
                    message: "Voter ID number is invalid",
                    code: z.ZodIssueCode.custom,
                })
            }
            break
    }
})
