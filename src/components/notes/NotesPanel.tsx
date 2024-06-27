import type { Task } from "@/types/index"
import AddNoteForm from "./AddNoteForm"
import NoteDetail from "./NoteDetail"
import { useAuth } from "@/hooks/useAuth"
import { useLocation, useParams } from "react-router-dom"

type NotesPanelProps = {
    notes: Task['notes']
}

function NotesPanel({ notes }: NotesPanelProps) {

    const params = useParams();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const { user, authLoading } = useAuth()

    if(authLoading) return 'Cargando...'

    return (
        <>
            <AddNoteForm />

            <div className="divide-y divide-gray-200 mt-10 ">
                {notes.length ? (
                    <>
                        <p className="font-bold text-2xl text-slate-600 my-5">Notas: </p>

                        <div className="divide-y divide-gray-200 space-y-2">
                            {notes.map(note => (
                                <NoteDetail key={note._id} note={note} user={user!} projectId={projectId} taskId={taskId} />
                            ))}
                        </div>
                    </>
                ) : <p className="text-gray-500 text-center pt-3">No Hay Notas</p>
                }
            </div>
        </>
    )
}

export default NotesPanel
