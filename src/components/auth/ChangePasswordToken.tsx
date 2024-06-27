import { Link } from "react-router-dom"
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from "@tanstack/react-query";
import { validateRecoveryToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { ConfirmAccountTokenForm } from "@/types/index";

type ChangePasswordTokenProps = {
    setIsValidCode: React.Dispatch<React.SetStateAction<boolean>>,
    token: ConfirmAccountTokenForm["token"],
    setToken: React.Dispatch<React.SetStateAction<string>>
}

function ChangePasswordToken({setIsValidCode, token, setToken}: ChangePasswordTokenProps) {

    const handleChange = (token: ConfirmAccountTokenForm["token"]) => {
        setToken(token)
    }

    const { mutate } = useMutation({
        mutationFn: validateRecoveryToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response?.message)
            setIsValidCode(true)
        }
    })

    const handleComplete = async (token: ConfirmAccountTokenForm["token"]) => mutate( {token} )

    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center font-bold" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center font-bold" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center font-bold" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center font-bold" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center font-bold" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center font-bold" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}

export default ChangePasswordToken
