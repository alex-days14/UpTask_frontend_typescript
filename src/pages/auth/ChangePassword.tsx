import { useState } from 'react';
import ChangePasswordForm from '@/components/auth/ChangePasswordForm';
import ChangePasswordToken from '@/components/auth/ChangePasswordToken';
import { ConfirmAccountTokenForm } from '@/types/index';

export default function ChangePassword() {
    const [token, setToken] = useState<ConfirmAccountTokenForm["token"]>("")
    const [isValidCode, setIsValidCode] = useState(false)

    return (
        <>

            <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> en tu correo</span>
            </p>    

            {isValidCode ? (
                <ChangePasswordForm token={token} />
            ) : (
                <ChangePasswordToken token={token} setToken={setToken} setIsValidCode={setIsValidCode}/>
            )}
        </>
    )
}