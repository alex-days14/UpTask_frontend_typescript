import { Project, TaskProject, TaskStatus } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslationsDic } from "@/locales/es"
import DropTask from "./DropTask"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatus } from "@/api/TaskAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type TaskListProps = {
    tasks: TaskProject[],
    hasAuthorization: boolean
}

type GroupedTasks = {
    [key: string]: TaskProject[]
}

const intialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

const statusColorsDic : {[key: string]: string} = {
    pending: "border-t-slate-500",
    onHold: "border-t-red-500",
    inProgress: "border-t-blue-500",
    underReview: "border-t-amber-500",
    completed: "border-t-emerald-500",
}

function TaskList({tasks, hasAuthorization}: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, intialStatusGroups);

    const params = useParams();
    const projectId = params.projectId!

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            toast.success(response?.message)
        }
    })

    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e;
        if(over && over.id){
            const status = over.id as TaskStatus;
            const taskId = active.id.toString();
            const payload = {projectId, taskId, status}
            mutate(payload);

            queryClient.setQueryData(['project', projectId], (oldData: Project) => {
                const updatedTasks = oldData.tasks.map((prevTask) => prevTask._id == taskId ? {...prevTask, status} : prevTask)

                return {...oldData, tasks: updatedTasks}
            })
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] xl:min-w-0 xl:w-1/5'>
                            <h3 className={`capitalize text-xl font-light bg-white border border-slate-300 p-3 border-t-8 ${statusColorsDic[status]}`}>{statusTranslationsDic[status]}</h3>

                            <DropTask status={status} />
                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} hasAuthorization={hasAuthorization} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
}

export default TaskList
