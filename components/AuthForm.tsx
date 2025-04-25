"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/client'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { signIn, signUp } from '@/lib/actions/auth.action'
import FormField from './FormField'
import { Loader2 } from "lucide-react"


const AuthFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6).max(50)
    })
}


const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const formSchema = AuthFormSchema(type);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // Define submit handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            if (type === "sign-up") {
                const { name, email, password } = values;
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password
                })
                if (!result?.success) {
                    toast.error(result?.message)
                    return
                }
                toast.success("Account created successfully", {
                    position: "top-right"
                })
                router.push("/sign-in")
            }
            else {
                const { email, password } = values;
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredentials.user.getIdToken();
                if (!idToken) {
                    toast.error("Could not sign in")
                    return;
                }
                await signIn({
                    email,
                    idToken
                });
                toast.success("Signed in successfully", {
                    position: "top-right"
                })
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(`There was an error ${error}`)
        } finally {
            setIsLoading(false);
        }
    };

    const isSignIn = type === "sign-in";

    return (
        <div className='card-border lg:min-w-[566px]'>
            <div className='flex flex-col gap-6 card py-14 px-10'>
                <div className='flex flex-row gap-2 justify-center '>
                    <Image
                        src={"/logo.svg"}
                        alt='logo'
                        height={32}
                        width={32} />
                    <h2 className='text-primary-100'>Habeeb AI Prep</h2>
                </div>
                <h3 className='text-center'>practice job interview with AI</h3>
                <Form {...form}>
                    <form className="w-full mt-4 form space-y-8" onSubmit={form.handleSubmit(onSubmit)} >
                        {!isSignIn && <FormField
                            control={form.control}
                            name="name"
                            Label="Name"
                            type="text"
                            placeholder='Your Name' />}
                        <FormField
                            control={form.control}
                            name="email"
                            Label="Email"
                            type='email'
                            placeholder='Your Email address' />
                        <FormField
                            control={form.control}
                            name="password"
                            Label="Password"
                            type='password'
                            placeholder='Enter Your password' />
                        <Button className='btn' type="submit">
                            {isLoading && <Loader2 className='animate-spin' />}
                            {!isLoading && (isSignIn ? "Sign In" : "Sign Up")}
                        </Button>
                    </form>
                </Form>
                <p className='text-center'>
                    {isSignIn ? "Don't have an account?" : "Already have an account?"}
                    <Link href={isSignIn ? "/sign-up" : "/sign-in"} className='font-bold text-user-primary ml-1'>
                        {isSignIn ? "Sign Up" : "Sign In"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm
