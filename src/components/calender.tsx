import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

type SetCalendarProps = {
    date: string
    setDate: (date: string) => void
}

export function SetCalendar({ date, setDate }: SetCalendarProps) {
    const [open, setOpen] = useState(false)

    // convert "12/12/2025" → Date (for calendar selection)
    const selectedDate = date
        ? new Date(date.split("-").reverse().join("-"))
        : undefined

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                Date of Departure
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full md:w-48 justify-between font-normal"
                    >
                        {date || "Select date"}
                        <CalendarDays />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        captionLayout="dropdown"
                        onSelect={(selected) => {
                            if (!selected) return
                            setDate(formatDate(selected))
                            setOpen(false)
                        }}
                        disabled={{ before: new Date() }}
                        toYear={new Date().getFullYear() + 2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
