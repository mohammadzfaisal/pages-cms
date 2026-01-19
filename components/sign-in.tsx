"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import { handleEmailSignIn, handleGithubSignIn } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import{ Github } from "lucide-react";

export function SignIn() {
  const [emailSignInState, emailSignInAction] = useFormState(handleEmailSignIn, { message: ""});
  const emailInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "";

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (emailSignInState?.message) {
      toast.success(emailSignInState.message, { duration: 10000});
      if (emailInputRef.current) emailInputRef.current.value = "";
    }
  }, [emailSignInState]);

  return (
    <div className="h-screen p-4 md:p-6 flex justify-center items-center">
      <div className="sm:max-w-[340px] w-full space-y-6">
        {/* Logo at top */}
        <div className="flex justify-center">
          <div className="w-20 h-20 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white" aria-hidden="true">
              <path
                d="M20 32 L12 14 Q11 11 14 12 L30 20 Q36 12 46 15 Q50 10 54 15 Q64 12 70 20 L86 12 Q89 11 88 14 L80 32 Q86 40 86 56 Q86 78 68 88 Q59 93 50 93 Q41 93 32 88 Q14 78 14 56 Q14 40 20 32 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="24" y="40" width="24" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
              <rect x="52" y="40" width="24" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
              <line x1="48" y1="49" x2="52" y2="49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <text x="31" y="53" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">F</text>
              <text x="59" y="53" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">M</text>
              <path d="M50 60 L46 64 Q50 67 54 64 Z" fill="currentColor" />
              <path d="M44 66 Q50 71 56 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-center">Sign in to frontmatter</h1>
        <form action={handleGithubSignIn}>
          <SubmitButton type="submit" variant="brand" className="w-full">
            <Github className="h-4 w-4 mr-2" />
            Sign in with GitHub
          </SubmitButton>
        </form>
        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center">
            <hr className="border-t w-full"/>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <form action={emailSignInAction} className="space-y-2">
          <Input ref={emailInputRef} type="email" name="email" placeholder="Email" required/>
          {emailSignInState?.error &&
            <div className="text-sm font-medium text-red-500">{emailSignInState.error}</div>
          }
          <SubmitButton type="submit" variant="brand" className="w-full">
            Sign in with email
          </SubmitButton>
        </form>
        <p className="text-sm text-muted-foreground">By clicking continue, you agree to our <a className="underline hover:decoration-muted-foreground/50" href="https://pagescms.org/terms" target="_blank">Terms of Service</a> and <a className="underline hover:decoration-muted-foreground/50" href="https://pagescms.org/privacy" target="_blank">Privacy Policy</a>.</p>
      </div>
    </div>
  );
}
