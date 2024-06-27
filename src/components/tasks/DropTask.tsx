import { useDroppable } from "@dnd-kit/core"
import React from "react"

type DropTaskProps = {
    status: string
}

function DropTask({ status }: DropTaskProps) {

    const { isOver, setNodeRef } = useDroppable({
        id: status
    })

    const style: React.CSSProperties = {
        opacity: isOver ? 0.4 : 1,
    }
    
    return (
        <div ref={setNodeRef} style={style} className="text-xs font-semibold p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500 uppercase">
            Soltar Tarea Aquí
        </div>
    )
}

export default DropTask
