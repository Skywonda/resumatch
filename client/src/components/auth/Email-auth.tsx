import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initiateEmailLogin, verifyEmailLogin } from "@/lib/utils/api";

export default function EmailAuth() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInitiateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await initiateEmailLogin(email);
      setIsCodeSent(true);
      toast({
        title: "Code Sent!",
        description: "Please check your email for the verification code.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token } = await verifyEmailLogin(email, code);
      localStorage.setItem("token", token);
      navigate("/dashboard");
      toast({
        title: "Success!",
        description: "You have been successfully logged in.",
      });
    } catch (error) {
      console.log("🚀 ~ handleVerifyCode ~ error:", error);
      toast({
        title: "Error",
        description: "Invalid verification code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Sign in to ResuMatch</h2>
        <p className="text-gray-500 mt-2">
          {isCodeSent
            ? "Enter the verification code sent to your email"
            : "Enter your email to receive a verification code"}
        </p>
      </div>

      {!isCodeSent ? (
        <form onSubmit={handleInitiateLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Sending Code..." : "Send Code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
          <Button
            variant="link"
            className="w-full"
            onClick={() => setIsCodeSent(false)}
            type="button"
          >
            Use different email
          </Button>
        </form>
      )}
    </div>
  );
}
