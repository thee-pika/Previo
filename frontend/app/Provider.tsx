import { AuthProvider } from "./hooks/useAuth";

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default Provider;