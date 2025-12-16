import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"

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

export function SearchableSelect({
                                     label,
                                     placeholder,
                                     value,
                                     onChange,
                                     disabledValue,
                                 }: {
    label: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    disabledValue?: string
}) {
    const [open, setOpen] = React.useState(false)

    const selectedLabel =
        routes.find((r) => r.value === value)?.label

    return (
        <div className="w-full flex flex-col gap-3">
            <Label className="px-1">{label}</Label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {selectedLabel ?? placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search city..." />
                        <CommandList>
                            <CommandEmpty>No city found.</CommandEmpty>

                            {routes.map((route) => (
                                <CommandItem
                                    key={route.value}
                                    value={route.label}
                                    disabled={route.value === disabledValue}
                                    onSelect={() => {
                                        onChange(route.value)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === route.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {route.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
