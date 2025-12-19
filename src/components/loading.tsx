import { assets } from "@/assets/assets"
import LoadingCore from "./ui/loading-core"

// Default Loading with bus animation
export const DefaultLoading = () => {
    return (
        <LoadingCore
            image={assets.busEmpty}
            title="Finding Available Buses..."
            description="Please wait while we search for the best routes"
        />
    )
}

//  Fullscreen Loading (for initial page load)
export const FullscreenLoading = () => {
    return (
        <LoadingCore
            image={assets.busEmpty}
            title="Loading Your Journey..."
            description="Preparing your bus booking experience"
            variant="fullscreen"
        />
    )
}

//  Minimal Loading (for small components)
export const MinimalLoading = () => {
    return (
        <LoadingCore variant="minimal" />
    )
}

//  Large Loading with custom title styling
export const LargeLoading = () => {
    return (
        <LoadingCore
            image={assets.busEmpty}
            title="Booking Your Ticket..."
            description="This will only take a moment"
            classNameTitle="text-2xl text-primary"
            size="lg"
        />
    )
}

//  Loading without spinner (just animation)
export const AnimationOnlyLoading = () => {
    return (
        <LoadingCore
            image={assets.busEmpty}
            title="Processing Payment..."
            description="Securing your transaction"
            showSpinner={false}
        />
    )
}
