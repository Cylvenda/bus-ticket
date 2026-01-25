export interface TicketDataTypes {
     booking: {
          booking_id: number
          schedule: {
               origin: string
               destination: string
               date: string
               departure_time: string
               arrival_time: string
          }
          bus: {
               plate_number: string
               company: string
          }
          seat_number: string
          price_paid: string
          original_price: string
          discount: string
          passenger: {
               first_name: string
               last_name: string
               phone: string
               email: string
          }
     }
}