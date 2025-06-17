import { Plus } from "lucide-react";
import image from "../assets/sigma.jpg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [friend,setFriend] = useState([])


    const getFriend = async() => {
        const response = await axios.get("http://localhost:3000/api/auth/friends", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setFriend(response.data.data)
        console.log(response.data.data)
    }

    const handleNavigate = (id, roomId) => {
        localStorage.setItem("friendId", id)
        navigate(`/chat/${roomId}`)
    }


    useEffect(() => {
        if(!token){
            navigate("/login")
        }

        getFriend()
    }, [])
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-gray-800 text-white w-full max-w-md h-full flex flex-col shadow-lg relative">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-gray-700 border-b border-gray-600">
                    <h1 className="text-lg font-semibold">Chat</h1>
                    <a href="/profile">
                        <img  src={image} alt="My Profile" className="w-10 h-10 rounded-full border-2 border-gray-500" />
                    </a>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                    {friend?.map((chat) => (
                        <>
                            <p onClick={() => handleNavigate(chat.id, chat.room_id)}>
                                <div className="flex items-center gap-3 p-3 border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
                                    <div className="relative">
                                        <img src={image}  className="w-12 h-12 rounded-full" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold">{chat.name}</h4>
                                        <p className="text-xs text-gray-400 truncate w-full">{chat.unique_number}</p>
                                    </div>
                                </div>
                            </p>
                        </>
                    ))}
                </div>

                {/* Tombol Floating (+) */}
                <a href="/add" className="absolute bottom-5 right-5 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-3xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300">
                    <Plus size={28} />
                </a>
            </div>
        </div>
    );
};

export default Dashboard;
