import type { SeatLayout } from "@/types/bus"


export const seatLayout: SeatLayout[] = [
    { special: "driver" },
    { special: "door" },

    {
        left: [{ id: "A3", status: "booked" }, { id: "A4", status: "available" }],
        right: [{ id: "A2", status: "booked" }, { id: "A1", status: "booked" }],
    },
    {
        left: [{ id: "B3", status: "booked" }, { id: "B4", status: "available" }],
        right: [{ id: "B2", status: "available" }, { id: "B1", status: "available" }],
    },
    {
        left: [{ id: "C3", status: "available" }, { id: "C4", status: "available" }],
        right: [{ id: "C2", status: "available" }, { id: "C1", status: "available" }],
    },
    {
        left: [{ id: "D3", status: "available" }, { id: "D4", status: "available" }],
        right: [{ id: "D2", status: "available" }, { id: "D1", status: "available" }],
    },

    {
        special: "toilet",
        right: [{ id: "E2", status: "available" }, { id: "E1", status: "available" }],
    },
    {
        special: "door",
        right: [{ id: "E2", status: "available" }, { id: "E1", status: "available" }],
    },

    {
        left: [{ id: "E3", status: "available" }, { id: "E4", status: "available" }],
        right: [{ id: "E2", status: "available" }, { id: "E1", status: "available" }],
    },
    {
        left: [{ id: "F3", status: "available" }, { id: "F4", status: "available" }],
        right: [{ id: "F2", status: "available" }, { id: "F1", status: "available" }],
    },
    {
        left: [{ id: "G3", status: "available" }, { id: "G4", status: "available" }],
        right: [{ id: "G2", status: "available" }, { id: "G1", status: "available" }],
    },
    {
        left: [{ id: "H3", status: "booked" }, { id: "H4", status: "booked" }],
        right: [{ id: "H2", status: "booked" }, { id: "H1", status: "booked" }],
    },
    {
        left: [{ id: "I3", status: "booked" }, { id: "I4", status: "booked" }],
        right: [{ id: "I2", status: "booked" }, { id: "I1", status: "booked" }],
    },

    {
        last: [
            { id: "44", status: "booked" },
            { id: "45", status: "booked" },
            { id: "46", status: "available" },
            { id: "48", status: "available" },
            { id: "47", status: "available" },
        ],
    },
] as SeatLayout[];
