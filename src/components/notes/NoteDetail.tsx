import { removeTaskNote } from '@/api/NoteAPI'
import { Note, Project, Task, User } from '@/types/index'
import { formatDate } from '@/utils/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import { Spinner } from '@chakra-ui/spinner'


type NoteDetailProps = {
    note: Note
    user: User
    projectId: Project['_id']
    taskId: Task['_id']
}

function NoteDetail({ note, user, projectId, taskId }: NoteDetailProps) {

    const canDelete = useMemo(() => user._id === note.createdBy._id, [user, note])

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: removeTaskNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            console.log(note.task)
            queryClient.invalidateQueries({ queryKey: ['task', taskId]})
        }
    })

    return (
        <div className='px-5 py-3 flex justify-between items-center '>
            <div className='w-3/5'>
                <p className='text-sm text-purple-600 mb-4'>Por: <span className='font-bold text-base'>{note.createdBy.name}</span></p>

                <p className='text-lg'>{note.content}</p>
                <p className='text-sm font-light text-slate-500'>{formatDate(note.createdAt)}</p>
            </div>
            
            {canDelete && 
                <button onClick={() => mutate({ projectId, taskId, noteId: note._id})} type='button' className=' bg-rose-500 hover:bg-rose-600 transition-colors rounded px-3 py-2 text-white uppercase font-bold text-sm  disabled:bg-rose-600' disabled={isPending}>
                    {isPending ? <Spinner className="h-4 w-4" /> : "Eliminar"}
                </button>
            }
        </div>
    )
}

export default NoteDetail
