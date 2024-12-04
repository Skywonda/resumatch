import { Navigate } from "react-router-dom";
import EmailAuth from "@/components/auth/Email-auth";
import { Toaster } from "@/components/ui/toaster";

export default function Auth() {
  // Check if user is already authenticated
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <EmailAuth />
      </div>
      <Toaster />
    </div>
  );
}
