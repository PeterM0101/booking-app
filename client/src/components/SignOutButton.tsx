import * as apiClient from "../api-client";
import {useAppContext} from "../contexts/appContext.tsx";
import {useMutation} from "@tanstack/react-query";

const SignOutButton = () => {
    const {setToast, setIsLoggedIn} = useAppContext();

    const mutation = useMutation({
        mutationFn: apiClient.signOut,
        onSuccess: async () => {
            setIsLoggedIn(false)
            setToast({message: "Signed Out!", type: "SUCCESS"});
        },
        onError: (error: Error) => {
            setToast({message: error.message, type: "ERROR"});
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return (
        <button
            onClick={handleClick}
            className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;