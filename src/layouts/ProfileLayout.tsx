import Tabs from "@/components/profile/Tabs"
import { Outlet } from "react-router-dom"


function ProfileLayout() {
    return (
        <>
            <div>
                <Tabs />
            </div>

            <Outlet />
        </>
    )
}

export default ProfileLayout
