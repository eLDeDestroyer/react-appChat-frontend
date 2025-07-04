import { useNavigate, useParams } from "react-router-dom";
import image from "../assets/sigma.jpg"
import { use, useEffect, useRef, useState } from "react";
import axios from "axios";


const FriendEditor = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [friend,setFriend] = useState({})
    const {id} = useParams()
    const nameRef = useRef()


    const getFriendData = async() => {
        const response = await axios.get(`http://localhost:3000/api/auth/friend/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        console.log(response.data.data)
        setFriend(response.data.data)
    }

    const handleFriendUpdate = async(e) => {
        e.preventDefault()

        try{
            const response = await axios.patch(`http://localhost:3000/api/auth/friend/update/${id}`,{name: nameRef.current.value}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            console.log(response)
            window.location.reload()
        } catch(e){
            console.log(e)
        }
    }

    const handleDeleteFriend = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:3000/api/auth/friend/delete`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    id: parseInt(id)
                }
            })
            console.log(response)
            navigate("/dashboard")
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(!token){
            navigate("/login")
        }

        getFriendData()
    },[])

    return (
        <div className="h-screen w-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Profil Teman</h2>
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
                            placeholder="Ubah Nama"
                            defaultValue={friend.name}
                            ref={nameRef}
                        />
                    </div>

                    {/* Tombol Simpan */}
                    <button onClick={handleFriendUpdate} className="w-full bg-blue-500 mt-[2rem] py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition">
                        Simpan Perubahan
                    </button>
                    {/* <button onClick={handleDeleteFriend} className="w-full bg-red-500 py-2 rounded-md text-white font-semibold hover:bg-red-600 transition">
                        Hapus Teman
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default FriendEditor;
