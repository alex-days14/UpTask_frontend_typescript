import type { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

function AddNoteForm() {

    const params = useParams();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const initialValues: NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<NoteFormData>({defaultValues: initialValues})

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response?.message)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            reset()
        }
    })

    const handleAddNote = async (formData: NoteFormData) => {
        mutate({ projectId, taskId, formData })
    }

    return (
        <form onSubmit={handleSubmit(handleAddNote)} className="space-y-3" noValidate>
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input 
                    type="text" 
                    id="content"
                    placeholder="Contenido de la Nota"
                    className="w-full p-3 border border-gray-300"
                    {...register("content", {required: "Este campo es requerido"})}
                />
                {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                value='Crear Nota'
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white p-3 font-black cursor-pointer w-full uppercase "
            />
        </form>
    )
}

export default AddNoteForm
