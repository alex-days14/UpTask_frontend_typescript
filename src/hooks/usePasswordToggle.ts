import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"

export const usePasswordToggle = () => {
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);
    const InputIcon = show ? EyeIcon : EyeSlashIcon;
    const type = show ? "text" : "password";

    return { handleToggle, InputIcon, type}
}