import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import Loader from "../loader";
import { Button } from "../ui/button";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import ConfirmationModal from "../shared/confirmation-modal";

interface FormValues {
  email: string;
  password: string;
}

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export default function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const navigate = useNavigate({
    from: "/",
  });
  const { isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  async function handleOnFormSubmit({ value }: { value: FormValues }) {
    await authClient.signIn.email(
      {
        email: value.email,
        password: value.password,
      },
      {
        onSuccess: async () => {
          const { data, error } = await authClient.twoFactor.sendOtp();
          if (data) {
            setOtpMode(true);
          } else {
            toast.error(error.message);
          }
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  }

  async function handlePasskeyLogin() {
    setIsLoading(true);
    await authClient.signIn.passkey({
      fetchOptions: {
        onSuccess: () => {
          setIsLoading(false);
          handleSuccessfulSignIn();
        },
        onError: (error) => {
          setIsLoading(false);
          toast.error(error.error.message);
        },
      },
    });
    setIsLoading(false);
  }

  const verifyOtp = async (code: string) => {
    await authClient.twoFactor.verifyOtp(
      { code },
      {
        onSuccess: async () => {
          setOtpMode(false);
          setIsConfirmationModalOpen(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  function handleSuccessfulSignIn() {
    navigate({
      to: "/dashboard",
    });
    toast.success("Sign in successful");
  }

  async function handleConfirmationModalResponse(response: boolean) {
    if (response) await authClient.passkey.addPasskey();
    handleSuccessfulSignIn();
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md p-6">
      <h1 className="mb-6 text-center font-bold text-3xl">
        Class Monitoring System
      </h1>

      {!otpMode ? (
        <>
          <Form handleOnSubmit={handleOnFormSubmit} />

          <br />
          <hr />
          <br />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
            onClick={handlePasskeyLogin}
          >
            {isLoading ? "Logging In" : "Login with Passkey"}
          </Button>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={onSwitchToSignUp}
              className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Need an account? Sign Up
            </Button>
          </div>
        </>
      ) : (
        <OtpForm otp={otp} setOtp={setOtp} verifyOtp={verifyOtp} />
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        question="Do you want to add passkey in this device?"
        onResponse={handleConfirmationModalResponse}
        onOpenChange={setIsConfirmationModalOpen}
      />
    </div>
  );
}

interface FormProps {
  handleOnSubmit: ({ value }: { value: FormValues }) => void;
}

function Form({ handleOnSubmit }: FormProps) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: handleOnSubmit,
    validators: {
      onSubmit: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      }),
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Password</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      <form.Subscribe>
        {(state) => (
          <Button
            type="submit"
            className="w-full"
            disabled={!state.canSubmit || state.isSubmitting}
          >
            {state.isSubmitting ? "Submitting..." : "Sign In"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

function OtpForm({
  otp,
  setOtp,
  verifyOtp,
}: {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  verifyOtp: (code: string) => void;
}) {
  return (
    <>
      <Input
        id={"otp"}
        name={"otp"}
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <div className="mt-4 text-center">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          onClick={() => verifyOtp(otp)}
        >
          Send OTP
        </Button>
      </div>
    </>
  );
}
