import { PropsWithChildren } from "react"


function ErrorMessage({children}: PropsWithChildren) {
    return (
        <div className="text-center my-4 bg-red-100 text-red-600 font-bold p-3 text-sm uppercase">
            {children}
        </div>
    )
}

export default ErrorMessage
