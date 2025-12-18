import type { Row } from "./seat-model";

export const seatLayout: Row[] = [
    /* ===== FRONT (DOOR + DRIVER AREA) ===== */
    { special: "door" },

    {
        left: [
            { id: "A3", status: "booked" },
            { id: "A4", status: "available" },
        ],
        right: [
            { id: "A2", status: "booked" },
            { id: "A1", status: "booked" },
        ],
    },

    /* ===== ROW B ===== */
    {
        left: [
            { id: "B3", status: "booked" },
            { id: "B4", status: "available" },
        ],
        right: [
            { id: "B2", status: "available" },
            { id: "B1", status: "available" },
        ],
    },

    /* ===== ROW C ===== */
    {
        left: [
            { id: "C3", status: "available" },
            { id: "C4", status: "available" },
        ],
        right: [
            { id: "C2", status: "available" },
            { id: "C1", status: "available" },
        ],
    },

    /* ===== ROW D ===== */
    {
        left: [
            { id: "D3", status: "available" },
            { id: "D4", status: "available" },
        ],
        right: [
            { id: "D2", status: "available" },
            { id: "D1", status: "available" },
        ],
    },

    /* ===== TOILET (NO SEATS) ===== */
    { special: "toilet" },

    /* ===== ROW E ===== */
    {
        left: [
            { id: "E3", status: "available" },
            { id: "E4", status: "available" },
        ],
        right: [
            { id: "E2", status: "available" },
            { id: "E1", status: "available" },
        ],
    },

    /* ===== ROW F ===== */
    {
        left: [
            { id: "F3", status: "available" },
            { id: "F4", status: "available" },
        ],
        right: [
            { id: "F2", status: "available" },
            { id: "F1", status: "available" },
        ],
    },

    /* ===== ROW G ===== */
    {
        left: [
            { id: "G3", status: "available" },
            { id: "G4", status: "available" },
        ],
        right: [
            { id: "G2", status: "available" },
            { id: "G1", status: "available" },
        ],
    },

    /* ===== ROW H ===== */
    {
        left: [
            { id: "H3", status: "booked" },
            { id: "H4", status: "booked" },
        ],
        right: [
            { id: "H2", status: "booked" },
            { id: "H1", status: "booked" },
        ],
    },

    /* ===== ROW I ===== */
    {
        left: [
            { id: "I3", status: "booked" },
            { id: "I4", status: "booked" },
        ],
        right: [
            { id: "I2", status: "booked" },
            { id: "I1", status: "booked" },
        ],
    },

    /* ===== LAST ROW (NUMBERED SEATS) ===== */
    {
        left: [
            { id: "45", status: "booked" },
            { id: "46", status: "available" },
        ],
        right: [
            { id: "47", status: "available" },
            { id: "44", status: "booked" },
        ],
    },
]
