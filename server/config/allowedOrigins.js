const allowedOrigins = [
    process.env.NODE_ENV === 'production' ? process.env.HOST_ALLOWED : 'http://localhost:3000'
]

export default allowedOrigins