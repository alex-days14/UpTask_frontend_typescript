import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RecoverAccountForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { recoverAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RecoverAccount() {
  const initialValues: RecoverAccountForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: recoverAccount,
    onError: (error) => {
      toast.error(error?.message)
    },
    onSuccess: (response) => {
      toast.success(response?.message)
      reset()
    },
  })
  
  const handleForgotPassword = (formData: RecoverAccountForm) => mutate(formData)


  return (
    <>

        <h1 className="text-5xl font-black text-white">Recuperar acceso</h1>
        <p className="text-2xl font-light text-white mt-5">
            Ingresa tu email {''}
            <span className=" text-fuchsia-500 font-bold"> y reestablece tu contraseña</span>
        </p>

        <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="space-y-8 p-10  bg-white mt-10"
            noValidate
        >
            <div className="flex flex-col gap-5">
            <label
                className="font-normal text-2xl"
                htmlFor="email"
            >Email</label>
            <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="w-full p-3  border-gray-300 border"
                {...register("email", {
                required: "El Email de registro es obligatorio",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                },
                })}
            />
            {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            </div>

            <input
            type="submit"
            value='Enviar Instrucciones'
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
            />
        </form>

        <nav className="mt-10 flex flex-col space-y-4">
            <Link
            to='/login'
            className="text-center text-gray-300 font-normal"
            >
            ¿Ya tienes cuenta? Iniciar Sesión
            </Link>

            <Link
            to='/signup'
            className="text-center text-gray-300 font-normal"
            >
            ¿No tienes cuenta? Crea una
            </Link>
        </nav>

    </>
  )
}