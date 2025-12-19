import { Card } from "@/components/ui/card"

type EmptyStateProps = {
    image?: string,
    title?: string,
    description?: string,
}

const EmptyState = ({
    image,
    title = "No data available",
    description = "Please try again later",
}: EmptyStateProps) => (
    <Card
        className="rounded-sm border-dashed border-primary flex flex-col gap-3 items-center justify-center p-6 text-center">
        {
            image === "" ?
                <img
                    src={image}
                    alt={title}
                    width={200}
                    height={200}
                    className="animate-bounce animation-duration-[2s]"
                />
                : ""
        }

        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
)
export default EmptyState
