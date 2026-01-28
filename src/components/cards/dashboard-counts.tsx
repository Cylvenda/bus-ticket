import { ArrowBigRightDash, TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"
import { Card, CardHeader } from "../ui/card"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"

type DashboardProps = {
     name: string
     count: string | number
     icon: LucideIcon
     link?: string
     color?: string
     trend?: {
          value: number
          isUp: boolean
     }
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
          <CardHeader className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
               {items.map((item, index) => (
                    <div
                         key={index}
                         className="group rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm flex flex-col cursor-pointer hover:shadow-lg hover:border-border transition-all duration-300 hover:-translate-y-1"
                    >
                         <div className="flex flex-row justify-between p-4">
                              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors">
                                   <item.icon
                                        className={cn(
                                             "size-6 transition-transform group-hover:scale-110",
                                             item.color && colorVariants[item.color]
                                        )}
                                   />
                              </div>

                              <div className="flex flex-col gap-1 items-end">
                                   <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{item.count}</h1>
                                   <p className="text-xs text-right text-muted-foreground font-medium">{item.name}</p>
                                   {item.trend && (
                                        <div className={`flex items-center text-xs font-medium gap-1 ${item.trend.isUp ? 'text-green-600' : 'text-red-600'
                                             }`}>
                                             {item.trend.isUp ? (
                                                  <TrendingUp className="size-3" />
                                             ) : (
                                                  <TrendingDown className="size-3" />
                                             )}
                                             {item.trend.value}%
                                        </div>
                                   )}
                              </div>
                         </div>

                         {item.link && (
                              <Link to={item.link} className="w-full">
                                   <span className="bg-muted/50 group-hover:bg-muted rounded-b-xl flex flex-row justify-between items-center py-2.5 px-4 transition-all duration-300 border-t border-border/50">
                                        <p className="text-sm font-medium">View Details</p>
                                        <ArrowBigRightDash className="size-4 transition-transform group-hover:translate-x-1" />
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