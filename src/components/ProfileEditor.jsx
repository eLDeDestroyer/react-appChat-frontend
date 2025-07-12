
import { useNavigate } from "react-router-dom";
import image  from "../assets/sigma.jpg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


const ProfileEditor = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const nameRef = useRef()
    const [user, setUser] = useState()

    const getUser = async() => {
        const response = await axios.get(`${apiUrl}/api/auth/users/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setUser(response.data.data)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const response = await axios.patch(`${apiUrl}/api/auth/users/update`, {name:nameRef.current.value},{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            navigate("/dashboard")
        } catch(e){
            console.log(e)
        }
    }


    useEffect(() => {
        if(!token){
            navigate("/login")
        }

        getUser()
    },[])
    
    return (
        <div className="h-screen w-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Profil Mu</h2>
            </div>

            {/* Form Edit Profile */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                {/* Avatar */}
                <div className="mb-6">
                    <img
                        src={image}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border-4 border-gray-600"
                    />
                </div>

                {/* Input Fields */}
                <div className="w-full max-w-sm space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400">Nama</label>
                        <input
                            type="text"
                            className="w-full bg-gray-700 p-2 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan Nama"
                            defaultValue={user?.name}
                            ref={nameRef}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400">Nama Pengguna</label>
                        <input
                            type="email"
                            className="w-full bg-gray-700 p-2 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan Email"
                            value={user?.username}
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400">Nomor</label>
                        <input
                            type="text"
                            className="w-full bg-gray-700 p-2 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan Nomor HP"
                            disabled
                            value={user?.unique_number}
                        />
                    </div>

                    {/* Tombol Simpan */}
                    <button onClick={handleSubmit} className="w-full bg-blue-500 py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition">
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditor;
