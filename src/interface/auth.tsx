interface AuthSessionInterface {
    user: {
        id: number,
        name: string,
        email: string,
        created_at: string,
        updated_at: string
    },
    expires: string,
    token: string
}