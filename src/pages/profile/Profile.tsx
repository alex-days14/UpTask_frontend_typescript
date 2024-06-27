import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/hooks/useAuth"


function Profile() {

    const { user, authLoading } = useAuth();

    if(authLoading) return 'Cargando...'

    if(user) return <ProfileForm data={user}/>
}

export default Profile
