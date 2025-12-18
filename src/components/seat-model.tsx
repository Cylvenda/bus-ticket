import { useState } from "react"
import { SquareArrowLeft, LifeBuoy } from "lucide-react"
import { Card } from "./ui/card"
import { SearchableSelect } from "./searchable-select"

/* ================= TYPES ================= */
type SeatStatus = "available" | "booked" | "selected"

type Seat = {
    id: string
    status: SeatStatus
}

type Row = {
    left?: Seat[]
    right?: Seat[]
    last?: Seat[]
    single?: Seat[]
    special?: "door" | "driver" | "toilet" | "empty"
}

const seatLayout: Row[] = [
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
]

const routes = [
    { value: "dar-es-salaam", label: "Dar es Salaam" },
    { value: "dodoma", label: "Dodoma" },
    { value: "arusha", label: "Arusha" },
    { value: "moshi", label: "Moshi" },
    { value: "mwanza", label: "Mwanza" },
    { value: "tanga", label: "Tanga" },
    { value: "morogoro", label: "Morogoro" },
    { value: "iringa", label: "Iringa" },
    { value: "mbeya", label: "Mbeya" },
    { value: "songea", label: "Songea" },
    { value: "singida", label: "Singida" },
    { value: "tabora", label: "Tabora" },
    { value: "kigoma", label: "Kigoma" },
    { value: "shinyanga", label: "Shinyanga" },
    { value: "kahama", label: "Kahama" },
    { value: "bukoba", label: "Bukoba" },
    { value: "musoma", label: "Musoma" },
    { value: "babati", label: "Babati" },
    { value: "njombe", label: "Njombe" },
    { value: "lindi", label: "Lindi" },
    { value: "mtwara", label: "Mtwara" },
    { value: "rombo", label: "Rombo" },
]


const Seat = ({
    seat,
    onSelect,
}: {
    seat: Seat
    onSelect: (id: string) => void
}) => {
    const base =
        "w-12 h-12 rounded-md text-white text-sm font-semibold flex items-center justify-center "

    const colors = {
        booked: "bg-red-600 cursor-not-allowed",
        available: "bg-green-600 hover:opacity-80 cursor-pointer",
        selected: "bg-yellow-500 cursor-pointer",
    }

    return (
        <button
            disabled={seat.status === "booked"}
            onClick={() => onSelect(seat.id)}
            className={`${base} ${colors[seat.status]}`}
        >
            {seat.id}
        </button>
    )
}

/* ================= MAIN COMPONENT ================= */
const BusSeatMap = () => {
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null)

    const handleSelect = (id: string) => {
        setSelectedSeat(id)
    }


    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")


    return (
        <Card className="flex flex-row gap-10 border-sm border-primary border-dashed p-5">

            {/* BUS */}
            <div className="border rounded-xl p-4 w-80 bg-white flex flex-col  ">

                {/* LEGEND */}
                <div className="flex gap-4 text-xs mb-4 p-5">
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-green-600 rounded" />
                        Available
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-red-600 rounded" />
                        Unavailable
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-yellow-500 rounded" />
                        Choice
                    </div>
                </div>

                {/* SEATS */}
                {seatLayout.map((row, index) => (
                    <div key={index} className="flex justify-between  mb-3">

                        {/* LEFT */}
                        <div className="flex gap-2">
                            {row.left?.map(seat => (
                                <Seat
                                    key={seat.id}
                                    seat={{
                                        ...seat,
                                        status:
                                            selectedSeat === seat.id ? "selected" : seat.status,
                                    }}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </div>

                        {/* AISLE */}
                        <div className="w-full text-xs text-gray-500">
                            {row.special === "door" && <SquareArrowLeft size={30} />}
                            {row.special === "driver" && <div className="flex justify-end -mb-3"><LifeBuoy size={30} /></div>}
                            {row.special === "toilet" && <span>TOILET</span>}
                        </div>

                        {/* RIGHT */}
                        <div className="flex gap-2">
                            {row.right?.map(seat => (
                                <Seat
                                    key={seat.id}
                                    seat={{
                                        ...seat,
                                        status:
                                            selectedSeat === seat.id ? "selected" : seat.status,
                                    }}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </div>

                        <div className="flex mr-7.5 gap-1">
                            {row.last?.map(seat => (
                                <Seat
                                    key={seat.id}
                                    seat={{
                                        ...seat,
                                        status: selectedSeat === seat.id ? "selected" : seat.status,
                                    }}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </div>

                    </div>
                ))}
            </div>

            {/* DETAILS */}
            <div className="flex flex-col items-center w-full gap-3 rounded p-3 border border-dashed border-primary">
                <div>
                    <h3 className="font-semibold mb-2">Seat Details</h3>
                    {selectedSeat ? (
                        <p>
                            Selected Seat:{" "} <span className="font-bold">{selectedSeat}</span>
                        </p>
                    ) : (
                        <p className="text-gray-500">Please select a seat</p>
                    )}
                </div>

                <div className="w-full flex flex-row gap-3 items-center justify-center">
                    <SearchableSelect
                        label="Select Your Starting Point"
                        placeholder="Select To"
                        value={from}
                        onChange={setFrom}
                        disabledValue={to}
                        routes={routes}
                    />

                    <SearchableSelect
                        label="Select Your Starting Point"
                        placeholder="Select To"
                        value={to}
                        onChange={setTo}
                        disabledValue={from}
                        routes={routes}
                    />
                </div>

            </div>
        </Card>
    )
}

export default BusSeatMap
