import {useForm} from "react-hook-form";
import * as apiClient from "../api-client.ts";
import {useMutation} from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../contexts/appContext.tsx";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const {setToast, setIsLoggedIn} = useAppContext()
    const navigate = useNavigate()
    const mutation = useMutation(
        {
            mutationFn: apiClient.signIn,
            onSuccess: () => {
                setToast({message: 'Login is successful', type: 'SUCCESS'})
                reset()
                setIsLoggedIn(true)
                navigate('/')
            },
            onError: (error: Error) => {
                setToast({message: error.message, type: "ERROR"})
            }
        }
    )

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isValid
        }
    } = useForm<SignInFormData>(
        {
            defaultValues: {
                email: "",
                password: ""
            },
            mode: 'onTouched'
        }
    )

    function onSubmit(data: SignInFormData) {
        console.log('Data: ', data)
        mutation.mutate(data)
    }

    return (

        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <label className='font-bold text-sm text-gray-700 flex-1 relative'>
                Email
                <input
                    type='email'
                    className='w-full border rounded font-normal px-2 py-1'
                    {...register('email', {required: "This field is required"})}
                />
                {errors.email &&
                    <span className='text-red-500 text-xs absolute left-0 top-12'>{errors.email.message}</span>}
            </label>
            <label className='font-bold text-sm text-gray-700 flex-1 relative'>
                Password
                <input
                    type='password'
                    className='w-full border rounded font-normal px-2 py-1'
                    autoComplete='nope'
                    {...register('password', {
                        required: "This field is required", minLength: {
                            value: 6,
                            message: 'Must be at least 6 characters long.'
                        }
                    })}
                />
                {errors.password &&
                    <span className='text-red-500 text-xs absolute left-0 top-12'>{errors.password.message}</span>}
            </label>
            <div className='flex justify-between'>
                <span className="text-sm">
                  Not Registered?{" "}
                    <Link className="underline" to="/register">
                    Create an account here
                  </Link>
                </span>
                <button
                    type="submit"
                    className='text-white p-2 hover:bg-blue-500 bg-blue-600 font-bold text-xl disabled:bg-gray-400'
                    disabled={!isValid}
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default SignIn;