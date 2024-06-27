import { Link } from "react-router-dom"


function NotFound() {
    return (
        <>
            <h1 className="text-center text-4xl font-bold text-white mt-16 mb-5">Página No Encontrada</h1>
            <h2 className="text-center text-6xl font-bold text-purple-300">404</h2>

            <p className="text-white text-xl font-semibold text-center mt-16">
                Para {' '}
                <Link className="text-fuchsia-500" to={'/'}>Volver a Inicio</Link>
            </p>
        </>
    )
}

export default NotFound
