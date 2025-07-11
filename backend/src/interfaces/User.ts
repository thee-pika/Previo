interface UserT {
    _id: string;
    name: string;
    email: string;
    role: string;
    refresh_token?: string;
}

export default UserT;
