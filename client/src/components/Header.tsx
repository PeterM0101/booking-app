import {Link} from "react-router-dom";
import {useAppContext} from "../contexts/appContext.tsx";
import SignOutButton from "./SignOutButton.tsx";

const Header = () => {
    const {isLoggedIn} = useAppContext()
    return (
        <div className='bg-blue-800 py-6'>
            <div className='container mx-auto flex justify-between text-white'>
                <span className='text-3xl text-white tracking-tight font-bold'>
                    <Link to='/'>MernHolidays.com</Link>
                </span>
                <span className='flex space-x-2 items-center font-bold'>
                {isLoggedIn ? <>
                        <Link className="hover:bg-blue-600 px-2" to='/my-booking'>My booking</Link>
                        <Link className="hover:bg-blue-600 px-2" to='/my-hotels'>My hotels</Link>
                        <SignOutButton />
                    </> :

                    <Link to='/sign-in'
                          className='flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white'>Sign
                        In</Link>
                }
                </span>
            </div>
        </div>
    );
};

export default Header;