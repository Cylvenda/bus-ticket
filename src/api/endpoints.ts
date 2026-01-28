export const API_ENDPOINTS = {
     // root api endpoint
     API_ROOT: "http://127.0.0.1:8000/api/",

     // Bus & Booking Endpoints
     ROUTES: "routes/active/",
     SCHEDULES: "schedules/search/",
     BOOKINGS: "bookings/",
     BOOKED_SEATS: "get-booked-seats/",
     HOLD_SEAT: "hold-seat/",
     GET_BOOKINGS: "get-bookings/",

     GET_MY_BOOKING: "my-bookings/",

     // User Authentication Endpoints
     USER_REGISTRATION: "auth/users/",
     USER_TOKEN_LOGIN: "auth/jwt/create/",
     USER_TOKEN_REFRESH: "auth/jwt/refresh/",
     USER_TOKEN_VERIFY: "auth/jwt/verify/",
     USER_LOGOUT: "auth/jwt/logout/",

     // Emails activations
     USER_ACCOUNT_ACTIVATION: "auth/users/activation/",
     USER_RESEND_ACTIVATION_EMAIL: "auth/users/resend_activation/",

     //current users
     CURRENT_USER_PROFILE: "auth/users/me/",

     //admin-data
     USERS: "auth/users/",
     BUSES: "bus/",
     BUS_COMPANIES: "bus-companies/",
     SEAT_LAYOUTS: "seat-layout/",
     SCHEDULE: "schedule/",
     ROUTES_GET: "route/",
     SCHEDULE_TEMPLATE: "schedule-template/",
     ROUTE_STOPS: "route/",

}
