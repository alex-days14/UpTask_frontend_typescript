import { Link, Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"

function AppLayout() {

    const { user, authLoading } = useAuth();

    if(authLoading) return <p>Cargando...</p>
    if(!user) return <Navigate to={'/login'}/>

    if(user) return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link to={'/'}>
                            <Logo/>
                        </Link>
                    </div>

                    <NavMenu name={user.name} />
                </div>
            </header>

            <section className="container mx-auto mt-10 p-5">
                <Outlet/>
            </section>

            <footer className="py-5">
                <p className="text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}

export default AppLayout
