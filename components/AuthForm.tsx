'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from "./CustomInput"
import { authFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import SignUp from "@/app/(auth)/sign-up/page"
import { useRouter } from "next/navigation"
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions"


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setuser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true)

        try {
            // Signup with app write & create plaid token

            if(type === 'sign-up'){
                 const newUser= await signUp(data);

                 setuser(newUser);
            }

            if(type === 'sign-in'){
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })


                if(response) router.push('/')
            }

        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }



    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className='mb-8 cursor-pointer flex items-center gap-1'>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='Novara logo'
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Novara</h1>
                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">{user
                        ? 'Logado'
                        : type === 'sign-in'
                            ? 'Login'
                            : 'Se Cadastre'}
                        <p className="text-16 font-normal text-gray-600">{user
                            ? 'Entre na sua conta para começar'
                            : 'Por favor insira seus dados'}</p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                <div className="flex gap-4">
                                <CustomInput control={form.control} name={"firstName"} label={"Nome"} placeholder={"Insira seu nome"} />
                                <CustomInput control={form.control} name={"lastName"} label={"Ultimo Sobrenome"} placeholder={"Insira seu ultimo sobrenome"} />
                                </div>

                                <CustomInput control={form.control} name={"address"} label={"Endereço"} placeholder={"Insira seu endereço"} />
                                <CustomInput control={form.control} name={"city"} label={"Cidade"} placeholder={"Insira sua cidade"} />

                                <div className="flex gap-4">
                                <CustomInput control={form.control} name={"state"} label={"Estado"} placeholder={"Exemplo: SP"} />
                                <CustomInput control={form.control} name={"postalCode"} label={"CEP"} placeholder={"Exemplo: 04693-130"} />
                                </div>

                                <div className="flex gap-4">
                                <CustomInput control={form.control} name={"dateOfBirth"} label={"Data de Nascimento"} placeholder={"dd/mm/aaaa"} />
                                <CustomInput control={form.control} name={"ssn"} label={"SSN"} placeholder={"Exemplo: 1234"} />
                                </div>
                                </>
                            )}

                            <CustomInput control={form.control} name={"email"} label={"E-mail"} placeholder={"Insira seu e-mail"} />
                            <CustomInput control={form.control} name={"password"} label={"Senha"} placeholder={"Insira sua senha"} />


                            <div className="flex flex-col gap-4">
                            <Button type="submit" className="form-btn" disabled={isLoading}>{isLoading ? (
                                <>
                                <Loader2 size={20} className="animate-spin"/> &nbsp; Carregando...
                                </>
                            ) : type === 'sign-in'
                            ? 'Login' : 'Cadastre-se'}</Button>
                            </div>
                        </form>
                    </Form>

                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">{type === 'sing-in'
                            ? "Já tem uma conta?"
                            : "Não tem uma conta?"}</p>
                        <Link className="form-link" href={type === 'sign-in' ? '/sign-up' : '/login'}>
                        {type === 'sign-in' ? 'Cadastre-se' : 'Login'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm