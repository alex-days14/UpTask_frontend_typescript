import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserFormData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"
import { useMemo } from "react"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors,  }, watch } = useForm<UserFormData>({ defaultValues: data })

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            queryClient.invalidateQueries({ queryKey: ["user"]})
        }
    })

    const nameInput = watch('name');
    const emailInput = watch('email');

    const noChanges = useMemo(() => nameInput.trim() == data.name && emailInput.trim() == data.email, [nameInput, emailInput, data.name, data.email])

    const handleEditProfile = (formData: UserFormData) => mutate(formData)

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200"
                            {...register("name", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3  border border-gray-200"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
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
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 disabled:bg-fuchsia-300 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer disabled:cursor-default transition-colors"
                        disabled={noChanges || isPending}
                    />
                </form>
            </div>
        </>
    )
}