import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "@/components/atoms";
import { useMutation } from "@tanstack/react-query";
import { verifyPasswordUserFn } from "@/api/services/users";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_PAGE } from "@/lib/constants/routes";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import useUpdateEmail from "@/hooks/useUpdateEmail";

const verifyPasswordSchema = zod.object({
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type VerifyPasswordInput = zod.TypeOf<typeof verifyPasswordSchema>;

export default function VerifyPasswordPage() {
  const navigate = useNavigate();
  const { setIsCanUpdateProfile } = useUpdateProfile();
  const { setFalseUpdateEmail } = useUpdateEmail();

  const methods = useForm<VerifyPasswordInput>({
    resolver: zodResolver(verifyPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (password: string) =>
      await verifyPasswordUserFn(password),
  });

  const onSubmitHandler: SubmitHandler<VerifyPasswordInput> = ({
    password,
  }: VerifyPasswordInput) => {
    mutation.mutate(password);
  };

  if (mutation.isSuccess) {
    setIsCanUpdateProfile(true);
    setFalseUpdateEmail();
    navigate(UPDATE_PROFILE_PAGE);
  }

  return (
    <div className="md:w-[480px] md:mx-auto mb-10">
      <div className="flex flex-col items-center justify-center px-4 ">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-4xl pt-10">
          Enter Your Password For Next Steps
        </h1>
      </div>
      <div className=" px-4 mt-10">
        <FormProvider {...methods}>
          <form
            autoComplete="off"
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            className="flex-col w-full "
          >
            {/* {registerUser.isError && (
                <Alert variant="destructive" className="flex items-center">
                  <div className="mr-4">
                    <AlertTriangle />
                  </div>
                  <div>
                    <AlertTitle>{(registerUser.error as any).response.data.message}</AlertTitle>
                    <AlertDescription>{(registerUser.error as any).response.data.errors}</AlertDescription>
                  </div>
                </Alert>
              )} */}
            <Input
              name="password"
              label="Password"
              isFill={methods.watch().password}
              placeholder="Enter Your Password"
              type="password"
            />
            <div className="flex flex-col gap-2 mt-7">
              <Button
                className="py-6 text-lg font-semibold"
                type="submit"
                isLoading={mutation.isPending}
              >
                Send
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}