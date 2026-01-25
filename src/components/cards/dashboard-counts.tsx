import { ArrowBigRightDash, type LucideIcon } from "lucide-react"
import { Card, CardHeader } from "../ui/card"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

type DashboardProps = {
     name: string
     count: string | number
     icon: LucideIcon
     link?: string
     color?: string
}

type CardHeaderCountProps = {
     items: DashboardProps[]
}

const colorVariants: Record<string, string> = {
     green: "text-green-500",
     blue: "text-blue-500",
     yellow: "text-yellow-500",
     red: "text-red-500",
     purple: "text-purple-500",
     orange: "text-orange-500",
     emerald: "text-emerald-500",
     primary: "text-primary",
}

export const CardHeaderCount = ({ items }: CardHeaderCountProps) => {
     return (
          <CardHeader className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
               {items.map((item, index) => (
                    <div
                         key={index}
                         className="rounded border flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                    >
                         <div className="flex flex-row justify-between p-3">
                              <item.icon
                                   className={cn(
                                        "size-12 md:size-15",
                                        item.color && colorVariants[item.color]
                                   )}
                              />

                              <div className="flex flex-col gap-2 items-end">
                                   <h1 className="text-3xl md:text-4xl font-bold">{item.count}</h1>
                                   <p className="text-sm text-right text-muted-foreground">{item.name}</p>
                              </div>
                         </div>

                         {item.link && (
                              <Link to={item.link} className="w-full">
                                   <span className="bg-accent rounded-b flex flex-row justify-between items-center py-2 px-4 hover:px-5 transition-all duration-300">
                                        <p className="text-sm">View Details</p>
                                        <ArrowBigRightDash className="size-5" />
                                   </span>
                              </Link>
                         )}
                    </div>
               ))}
          </CardHeader>
     )
}

type CardPageCountProps = {
     id: number
     count: string | number
     name: string
}

type CardCountProps = {
     items: CardPageCountProps[]
}

export const CardCount = ({ items }: CardCountProps) => {
     return (
          <Card className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-1 border-none rounded-none items-center">
               {items.map((item) => (
                    <div
                         key={item.id}
                         className="bg-primary rounded border cursor-pointer py-2 md:py-4 flex flex-col items-center hover:opacity-90 transition-opacity"
                    >
                         <h1 className="text-2xl md:text-4xl font-bold">{item.count}</h1>
                         <p className="text-xs md:text-sm text-center px-2">{item.name}</p>
                    </div>
               ))}
          </Card>
     )
}