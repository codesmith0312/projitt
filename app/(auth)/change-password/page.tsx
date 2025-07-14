'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircleIcon } from 'lucide-react';
import { ChangePasswordSchemaType, getChangePasswordSchema } from '../forms/change-password-schema';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') || null;

  const [verifyingToken, setVerifyingToken] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(getChangePasswordSchema()),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      // try {
      //   setVerifyingToken(true);
      //   const response = await apiFetch('/api/auth/reset-password-verify', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ token }),
      //   });
      //   if (response.ok) {
      //     setIsValidToken(true);
      //   } else {
      //     const errorData = await response.json();
      //     setError(errorData.message || 'Invalid or expired token.');
      //   }
      // } catch {
      //   setError('Unable to verify the reset token.');
      // } finally {
      //   setVerifyingToken(false);
      // }
    };

    if (token) {
      verifyToken();
    } else {
      setError('No reset token provided.');
    }
  }, [token]);

  async function onSubmit(values: ChangePasswordSchemaType) {
    setIsProcessing(true);
    setError(null);
    setSuccessMessage(null);

    // try {
    //   const response = await apiFetch('/api/auth/change-password', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ token, newPassword: values.newPassword }),
    //   });

    //   if (response.ok) {
    //     setSuccessMessage('Password reset successful! Redirecting to login...');
    //     setTimeout(() => router.push('/signin'), 3000);
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || 'Password reset failed.');
    //   }
    // } catch {
    //   setError('An error occurred while resetting the password.');
    // } finally {
    //   setIsProcessing(false);
    // }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between gap-[30px]">
        <div className="pt-[60px] flex justify-center w-full">
          <img src="/images/zaidLLC.png" alt="logo" className=" h-[48px]" />
        </div>
        <div className="w-full flex-1 flex justify-center items-center pb-[10px]">
          <div className="w-[482px] border border-[#e9e9e9] rounded-[16px] bg-white py-[40px] px-[40px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full space-y-4">
                <div className="space-y-1">
                  <h1 className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535]">
                    Set your New Password
                  </h1>
                </div>

                {/* {error && (
                <div className="text-center space-y-6">
                  <Alert variant="destructive">
                    <AlertIcon>
                      <AlertCircle />
                    </AlertIcon>
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                  <Button asChild>
                    <Link href="/signin" className="text-primary">
                      Go back to Login
                    </Link>
                  </Button>
                </div>
              )}

              {successMessage && (
                <Alert>
                  <AlertIcon>
                    <Check />
                  </AlertIcon>
                  <AlertTitle>{successMessage}</AlertTitle>
                </Alert>
              )}

              {verifyingToken && (
                <Alert>
                  <AlertIcon>
                    <LoaderCircleIcon className="size-4 animate-spin" />
                  </AlertIcon>
                  <AlertTitle>Verifing...</AlertTitle>
                </Alert>
              )} */}

                {/* {isValidToken && !successMessage && !verifyingToken && ( */}
                <>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px]/[22px] font-normal text-[#353535]">
                          New Password
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={passwordVisible ? 'text' : 'password'}
                              placeholder="Enter new password"
                              {...field}
                              className="h-[48px]"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            mode="icon"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                          >
                            {passwordVisible ? (
                              <EyeOff className="text-muted-foreground" />
                            ) : (
                              <img src="/images/icons/eye.svg" alt="eye" className='w-[15px]' />

                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px]/[22px] font-normal text-[#353535]">
                          Confirm New Password
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={passwordConfirmationVisible ? 'text' : 'password'}
                              placeholder="Confirm new password"
                              {...field}
                              className="h-[48px]"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            mode="icon"
                            onClick={() =>
                              setPasswordConfirmationVisible(!passwordConfirmationVisible)
                            }
                            className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                            aria-label={
                              passwordConfirmationVisible
                                ? 'Hide password confirmation'
                                : 'Show password confirmation'
                            }
                          >
                            {passwordConfirmationVisible ? (
                              <EyeOff className="text-muted-foreground" />
                            ) : (
                              <img src="/images/icons/eye.svg" alt="eye" className='w-[15px]' />

                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-[48px] text-[14px]/[20px] font-semibold"
                  >
                    {isProcessing && <LoaderCircleIcon className="size-4 animate-spin" />}
                    Confirm
                  </Button>
                </>
                {/* )} */}
              </form>
            </Form>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center md:mb-[-25px] mb-0">
            <img src="/images/poweredBy.png" alt="logo" className="h-[28px]" />
          </div>
          <div className=" w-full pb-[50px] pl-[80px] pr-[80px] flex md:flex-row flex-col items-center justify-between gap-[10px] md:mt-0 mt-[10px]">
            <div className="flex gap-[16px]">
              <span className="text-[14px]/[22px] underline text-[#a19e9e]">Terms of Service</span>
              <div className="w-[1px] h-[20px] bg-[#a19e9e]"></div>
              <span className="text-[14px]/[22px] underline text-[#a19e9e]">Privacy Policy</span>
            </div>

            <span className="text-[14px]/[22px] text-[#a19e9e]">© 2025 Projitt</span>
          </div>
        </div>
      </div>
    </>
  );
}
