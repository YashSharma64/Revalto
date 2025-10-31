import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { api } from "./services/api"
import { useNavigate } from "react-router-dom"

function LoginForm({className, onSubmit, ...props}) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGitHubLoading, setIsGitHubLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setIsSubmitting(true);
        if (typeof onSubmit === 'function') {
          await Promise.resolve(onSubmit(e));
        } else {
          const form = e.currentTarget;
          const data = Object.fromEntries(new FormData(form).entries());
          console.log('LoginForm submit', data);
          const response = await api.post('/login',data,{withCredentials:true})
          console.log("Server response:", response.data);

          if(response.status == 200){
            console.log('Login Successful: ', response.data)
            navigate('/')
          }else{
            alert("Login failed: " + (response.data?.message || "Unknown error"));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
    }
  };

  const handleGithub = async () => {
    try {
      setIsGitHubLoading(true);
      console.log('Login with GitHub clicked');
      await new Promise(r => setTimeout(r, 1000));
    } finally {
      setIsGitHubLoading(false);
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@adypu.edu.in" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="hover:shadow-md active:scale-[0.98] transition-transform duration-150 bg-white text-black hover:!bg-white/90"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            disabled={isGitHubLoading}
            onClick={handleGithub}
            className="hover:shadow-sm active:scale-[0.98] transition-transform duration-150 !text-white hover:!text-white border-white/30 hover:bg-white/10"
          >
            {isGitHubLoading ? (
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"></circle>
                <path d="M22 12a10 10 0 0 1-10 10" fill="currentColor"></path>
              </svg>
            ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor" />
            </svg>
            )}
            {!isGitHubLoading && <span>Login with GitHub</span>}
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
export default LoginForm
