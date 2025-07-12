import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


const Login = () => {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const token = localStorage.getItem("token")
    const navigate = useNavigate()


    const hanlderegister = async(e) => {
        e.preventDefault()

        const data = {
            name: nameRef.current.value,
            username: usernameRef.current.value,
            password : passwordRef.current.value
        }

        try{
            const response = await axios.post(`${apiUrl}/api/users/register`,data) 
            window.location.reload()
        } catch(e){
            console.log(e)
        }
    }

    const handleLogin = async(e) => {
        e.preventDefault()

        const data = {
            name: nameRef.current.value,
            username: usernameRef.current.value,
            password : passwordRef.current.value
        }

        try{
            const response = await axios.post(`${apiUrl}/api/users/login`,data) 
            console.log(response.data.data.token)
            localStorage.setItem("token", response.data.data.token)
            navigate("/dashboard")
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(token){
            navigate("/dashboard")
        }
    }, [])


    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-gray-800 text-white w-full max-w-sm p-6 rounded-lg shadow-lg">
                {/* Judul */}
                <h2 className="text-2xl font-bold text-center mb-6">Masuk</h2>
                

                {/* Form */}
                <form>
                    {/* Input Username */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-1">Nama</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Masukan Nama"
                            ref={nameRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-1">Nama Pengguna</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Masukan Nama Pengguna"
                            ref={usernameRef}
                        />
                    </div>

                    {/* Input Password */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-1">Kata Sandi</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Masukan Kata Sandi"
                            ref={passwordRef}
                        />
                    </div>

                    {/* Tombol Login */}
                    <div className="mt-5 flex gap-2">
                        <button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-md font-semibold hover:scale-105 active:scale-95 transition-all">
                            Masuk
                        </button>
                        <button onClick={hanlderegister} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-md font-semibold hover:scale-105 active:scale-95 transition-all">
                            Daftar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default Login;
