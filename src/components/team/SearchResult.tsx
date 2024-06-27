import { addTeamMember } from "@/api/TeamAPI"
import { TeamMember, TeamMemberForm } from "@/types/index"
import { Spinner } from "@chakra-ui/spinner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UseFormReset } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"


type SearchResultProps = {
    user: TeamMember
    resetMemberForm: UseFormReset<TeamMemberForm>
}


function SearchResult({user, resetMemberForm}: SearchResultProps) {

    const params = useParams();
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: addTeamMember,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response?.message)
            queryClient.invalidateQueries({
                queryKey: ['projectTeam', projectId]
            })
            resetMemberForm()
        }
    })

    const handleAddTeamMember = () => {
        const data = {
            id: user._id,
            projectId
        }
        mutate(data)
    }
    
    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>

            <div className="flex justify-between items-center">
                <p>{user.name}</p>

                <button onClick={handleAddTeamMember} className="text-purple-600 hover:bg-purple-100 transition-colors px-10 py-3 font-bold cursor-pointer">
                    {isPending ? <Spinner className="h-5 w-5" /> : "Agregar al Proyecto"}
                </button>
            </div>
        </>
    )
}

export default SearchResult
