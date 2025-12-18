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

type routesType = {
    value: string,
    label: string
}

type selectableProps = {
    label: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    disabledValue?: string
    routes: routesType[]
}
export function SearchableSelect({
    label,
    placeholder,
    value,
    onChange,
    disabledValue,
    routes = [],
}: selectableProps) {
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
