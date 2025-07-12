import { useEffect, useRef } from "react";
import image from "../assets/sigma.jpg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const AddFriend = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const nameRef = useRef()
    const numberRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = {
            name : nameRef.current.value,
            unique_number: parseInt(numberRef.current.value)
        }

        console.log(data)

        try{
            const response = await axios.post(`${apiUrl}/api/auth/friend/add`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            navigate("/dashboard")

            console.log(response)
        } catch(e){
            console.log(e)
        }
    }


    useEffect(() => {
        if(!token){
            navigate("/login")
        }
    },[])

    return (
        <div className="h-screen w-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Tambah Teman</h2>
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
                            ref={nameRef}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400">Nomor</label>
                        <input
                            type="number"
                            className="w-full bg-gray-700 p-2 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan Nomor"
                            ref={numberRef}
                        />
                    </div>

                    {/* Tombol Simpan */}
                    <button onClick={handleSubmit} className="w-full bg-blue-500 py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition">
                        Tambahkan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFriend;
