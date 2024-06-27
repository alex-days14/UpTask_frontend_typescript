import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import CreateProject from "@/pages/projects/CreateProject";
import EditProject from "@/pages/projects/EditProject";
import ProjectDetails from "@/pages/projects/ProjectDetails";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ConfirmAccount from "@/pages/auth/ConfirmAccount";
import RequestNewCode from "@/pages/auth/RequestNewCode";
import RecoverAccount from "@/pages/auth/RecoverAccount";
import ChangePassword from "./pages/auth/ChangePassword";
import UpdatePassword from "./pages/profile/UpdatePassword";
import ProjectTeam from "./pages/projects/ProjectTeam";
import Profile from "./pages/profile/Profile";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./pages/NotFound";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" index element={<Dashboard />} />
                    <Route path="/projects/create" element={<CreateProject />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/projects/:projectId/edit" element={<EditProject />} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeam />} />

                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/change-password" element={<UpdatePassword />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/confirm-account" element={<ConfirmAccount />} />
                    <Route path="/request-code" element={<RequestNewCode />} />
                    <Route path="/recover-account" element={<RecoverAccount />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
