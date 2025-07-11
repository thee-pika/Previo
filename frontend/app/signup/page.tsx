"use client";
import AuthLayout from "../components/  AuthLayout";
import AuthForm from "../components/ AuthForm";


export default function SignUpPage() {
    return (
        <AuthLayout>
            <AuthForm isSignUp={true} onToggle={() => {}} />
        </AuthLayout>
    );
}

