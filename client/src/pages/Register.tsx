import {useForm} from "react-hook-form";
import * as apiClient from "../api-client.ts";
import {useMutation} from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../contexts/appContext.tsx";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const {setToast} = useAppContext()
    const navigate = useNavigate()
    const mutation = useMutation(
        {
            mutationFn: apiClient.register,
            onSuccess: () => {
                setToast({message: 'Registration is successful', type: 'SUCCESS'})
                reset()
                navigate('/')
            },
            onError: (error: Error) => {
                setToast({message: error.message, type: "ERROR"})
            }
        }
    )

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: {
            errors,
            isValid
        }
    } = useForm<RegisterFormData>(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            mode: 'onTouched'
        }
    )

    function onSubmit(data: RegisterFormData) {
        console.log('Data: ', data)
        mutation.mutate(data)
    }

    return (

        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <div className='flex md:flex-row flex-col gap-5'>
                <label className='font-bold text-sm text-gray-700 flex-1 relative'>
                    First name
                    <input
                        className='w-full border rounded font-normal px-2 py-1'
                        {...register('firstName', {required: "This field is required"})}
                    />
                    {errors.firstName &&
                        <span
                            className='text-red-500 text-xs absolute left-0 top-12'>{errors.firstName.message}</span>}
                </label>
                <label className='font-bold text-sm text-gray-700 flex-1 relative'>
                    Last name
                    <input
                        className='w-full border rounded font-normal px-2 py-1'
                        {...register('lastName', {required: "This field is required"})}
                    />
                    {errors.lastName &&
                        <span
                            className='text-red-500 text-xs absolute left-0 top-12'>{errors.lastName.message}</span>}
                </label>
            </div>
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
            <label className='font-bold text-sm text-gray-700 flex-1 relative'>
                Confirm Password
                <input
                    type='password'
                    className='w-full border rounded font-normal px-2 py-1'
                    autoComplete='nope'
                    {...register('confirmPassword', {
                        validate: (val) => {
                            if (!val) return "This field is required";
                            if (val !== watch('password')) return "Passwords do not match";
                        }
                    })}
                />
                {errors.confirmPassword && <span
                    className='text-red-500 text-xs absolute left-0 top-12'>{errors.confirmPassword.message}</span>}
            </label>
            <div className='flex justify-between'>
                <p>Already registrate?</p>
                <button
                    className='text-white p-2 hover:bg-blue-500 bg-blue-600 font-bold text-xl disabled:bg-gray-400'
                    type='submit'
                    disabled={!isValid}
                >Create Account
                </button>
            </div>
        </form>
    );
};

export default Register;