"use client";
import AuthLayout from "../components/  AuthLayout";
import AuthForm from "../components/ AuthForm";

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthForm isSignUp={false} onToggle={() => {}} />
    </AuthLayout>
  );
}

