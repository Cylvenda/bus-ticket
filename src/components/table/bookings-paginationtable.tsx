import { Button } from "@/components/ui/button"

interface PaginationProps {
     page: number
     totalPages: number
     onPageChange: (page: number) => void
}

export function TablePagination({
     page,
     totalPages,
     onPageChange,
}: PaginationProps) {
     return (
          <div className="flex items-center justify-end gap-2 py-4">
               <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
               >
                    Previous
               </Button>

               <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
               </span>

               <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
               >
                    Next
               </Button>
          </div>
     )
}
