import Layout from "./layouts/Layout.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.tsx";
import {ToastContainer} from "react-toastify";
import SignIn from "./pages/SignIn.tsx";

function App() {

    return (
        <>
            <ToastContainer/>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout><p className='text-pink-500'>Home page</p></Layout>}/>
                    <Route path='/search' element={<Layout><p className='text-pink-500'>Search Page</p></Layout>}/>
                    <Route path='/my-booking' element={<Layout><p className='text-pink-500'>Booking</p></Layout>}/>
                    <Route path='/my-hotels' element={<Layout><p className='text-pink-500'>Hotels</p></Layout>}/>
                    <Route path="/sign-in" element={<Layout><SignIn/></Layout>}/>
                    <Route path='/register' element={<Layout><Register/></Layout>}/>
                    <Route path='*' element={<Navigate to='/'/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
