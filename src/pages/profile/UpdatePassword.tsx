import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { UpdatePasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/ProfileAPI";
import { toast } from "react-toastify";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";

export default function UpdatePassword() {
  const initialValues: UpdatePasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { handleToggle, InputIcon, type } = usePasswordToggle()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UpdatePasswordForm>({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response)
    }
  })

  const password = watch('password');

  const handleChangePassword = (formData: UpdatePasswordForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >Password Actual</label>
            <input
                id="current_password"
                type="password"
                placeholder="Password Actual"
                className="w-full p-3  border border-gray-200"
                {...register("current_password", {
                    required: "El password actual es obligatorio",
                })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="password"
            >Nuevo Password</label>
            <div className="border border-gray-200 relative">
                <input
                id="password"
                type={type}
                placeholder="Nuevo Password"
                className="w-full p-3  border border-gray-200"
                {...register("password", {
                    required: "El Nuevo Password es obligatorio",
                    minLength: {
                    value: 8,
                    message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                })}
                />
                <button onClick={handleToggle} className="absolute right-5 top-1/2 -translate-y-1/2"><InputIcon className="h-4 w-4" /></button>
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >Repetir Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3  border border-gray-200"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: value => value === password || 'Los Passwords no son iguales'
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Cambiar Password'
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}
