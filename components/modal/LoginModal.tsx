import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react"
import Input from "../Input"
import Modal from "../Modal"
import useRegisterModal from "@/hooks/useRegisterModal"


const LoginModal = () => {

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)



    const onToggle = useCallback(() => {
        if (isLoading) return

        loginModal.onClose()
        registerModal.onOpen()

    },

        [isLoading, registerModal, loginModal],
    )
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            // TODO ADD LOG IN

            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input

                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Don't have an account?
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline"> Register</span>
            </p>
        </div>
    )
    return (
        <Modal
            body={bodyContent}
            footer={footerContent}
            title="Login"
            actionLabel="Sign In"

            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
        />
    )
}

export default LoginModal