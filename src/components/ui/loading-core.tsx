import { Card } from "./card"
import { Loader2 } from "lucide-react"

type LoadingProps = {
    image?: string,
    title?: string,
    description?: string,
    classNameTitle?: string,
    showSpinner?: boolean,
    variant?: "default" | "minimal" | "fullscreen",
    size?: "sm" | "md" | "lg"
}

const LoadingCore = ({
    image,
    title = "Loading...",
    description = "Please wait while we fetch your data",
    classNameTitle,
    showSpinner = true,
    variant = "default",
    size = "md"
}: LoadingProps) => {

    const sizeClasses = {
        sm: "w-32 h-32",
        md: "w-48 h-48",
        lg: "w-64 h-64"
    }

    // Minimal variant - just spinner
    if (variant === "minimal") {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // Fullscreen variant
    if (variant === "fullscreen") {
        return (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <Card className="rounded-sm border-dashed border-primary flex flex-col gap-4 items-center justify-center p-8 text-center max-w-md">
                    {image && (
                        <div className="relative w-full overflow-hidden h-32">
                            <img
                                src={image}
                                alt="Loading"
                                className={`absolute ${sizeClasses[size]} object-contain animate-drive`}
                            />
                        </div>
                    )}

                    {showSpinner && (
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    )}

                    <div className="space-y-2">
                        <p className={`font-semibold text-lg ${classNameTitle}`}>{title}</p>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
                    </div>
                </Card>
            </div>
        )
    }

    // Default variant
    return (
        <Card className="rounded-sm border-dashed border-primary flex flex-col gap-4 items-center justify-center p-6 text-center">
            {image ? (
                <div className="relative w-full h-40 bg-linear-to-r from-muted/20 via-muted/40 to-muted/20 rounded-lg">
                    {/* Road lines animation */}
                    <div className="absolute inset-x-0 bottom-8 flex justify-around overflow-hidden">
                        <div className="w-12 h-1 bg-muted-foreground/30 animate-scroll" />
                        <div className="w-12 h-1 bg-muted-foreground/30 animate-scroll" />
                        <div className="w-12 h-1 bg-muted-foreground/30 animate-scroll" />
                        <div className="w-12 h-1 bg-muted-foreground/30 animate-scroll" />
                    </div>

                    {/* Bus moving left to right - no overflow hidden on parent */}
                    <div className="absolute inset-0 overflow-visible">
                        <img
                            src={image}
                            alt="Loading"
                            className={`absolute top-40 -translate-y-1/2 ${sizeClasses[size]} object-contain animate-drive`}
                        />
                    </div>

                    {/* Dust/smoke effect behind the bus */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-muted/20 rounded-full blur-xl animate-fade-out" />
                </div>
            ) : (
                showSpinner && (
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                )
            )}

            <div className="space-y-2">
                <p className={`font-semibold ${classNameTitle}`}>{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {/* Loading dots indicator */}
            <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
            </div>

            {/* Progress bar (optional) */}
            <div className="w-full max-w-xs h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-progress" />
            </div>
        </Card>
    )
}

export default LoadingCore