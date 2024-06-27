import { getProjectInfo } from "@/api/ProjectAPI"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams, useNavigate, Link } from "react-router-dom"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { UserGroupIcon } from "@heroicons/react/24/solid"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"


function ProjectDetails() {

    const { user, authLoading, authError } = useAuth()
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data, isError, isLoading} = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectInfo(projectId),
        retry: false
    })

    const hasAuthorization = useMemo(() => data?.manager == user?._id, [data, user])

    if (isLoading || authLoading) return 'Cargando...'
    if (isError || authError) return <Navigate to={'/404'} />

    if(data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex justify-between gap-3">
                <Link to={`/`} className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-all flex items-center gap-2">
                    Volver a Proyectos
                </Link>

                {isManager(user._id, data.manager) &&
                    <div className="flex gap-3">
                        <button type="button" className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-all flex items-center gap-2" onClick={() => navigate('?newTask=true')}>
                            <PlusCircleIcon className="h-6 w-6 font-black"/>
                            Agregar Tarea
                        </button>

                        <Link to="team" className="bg-gray-700 hover:bg-gray-800 px-8 py-3 text-white text-xl font-bold cursor-pointer transition-all flex items-center gap-2">
                            <UserGroupIcon className="h-6 w-6 font-black"/>
                            Colaboradores
                        </Link>
                    </div>
                }
            </nav>

            <TaskList tasks={data.tasks} hasAuthorization={hasAuthorization} />

            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}

export default ProjectDetails
