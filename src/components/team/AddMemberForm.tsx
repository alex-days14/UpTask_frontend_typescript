import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import { toast } from "react-toastify";
import { Spinner } from "@chakra-ui/spinner";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail,
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {
            formData,
            projectId
        }
        mutation.mutate(data)
    }

    const resetMemberForm = () => {
        reset(initialValues)
        mutation.reset()
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
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

                <button
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? <Spinner className="h-5 w-5"/> : 'Buscar Usuario'}
                </button>
            </form>

            {mutation.isSuccess && mutation.data &&  <SearchResult user={mutation.data} resetMemberForm={resetMemberForm} />}
        </>
    )
}