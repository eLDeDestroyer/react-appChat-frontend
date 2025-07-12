import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Chatbox = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const chatEndRef = useRef(null);
    const messageRef = useRef();
    const { id } = useParams(); // room_id dari URL
    const [allMessage, setAllMessage] = useState([]);
    const [userId, setUserId] = useState("");
    const [socket, setSocket] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [friendId, setFriendId] = useState(parseInt(id))

    // Ambil userId dari token
    const getMe = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/auth/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserId(response.data.data.id);
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    };

    // Ambil semua pesan berdasarkan room_id
    const getMessage = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/auth/chats/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllMessage(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Kirim pesan ke WebSocket & ke endpoint HTTP
    const handleMessage = async (e) => {
        e.preventDefault();

        const newMessage = {
            chat: messageRef.current.value,
            user_id: userId,
            room_id: parseInt(id),
        };

        // Kirim via WebSocket
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(newMessage));
        }

        // Kirim via HTTP ke database
        try {
            const response = await axios.post("http://localhost:3000/api/auth/chats/add", newMessage, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log(error);
        }

        messageRef.current.value = "";
    };

    // Hapus semua pesan
    const handleDeleteMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:3000/api/auth/chats/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllMessage([]);
        } catch (e) {
            console.log(e);
        }
    };

    // Auto-scroll ke bawah
    useEffect(() => {
        chatEndRef.current?.scrollIntoView();
    }, [allMessage]);

    // Pertama kali load
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        getMe();
        getMessage();
    }, []);

    // Koneksi WebSocket setelah dapat userId & room_id
    useEffect(() => {
        if (!userId || !id) return;

        const ws = new WebSocket(`ws://localhost:3000/ws/chat?room_id=${id}`);

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setAllMessage((prev) => [...prev, data]);
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [userId, id]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-gray-800 text-white w-full h-full flex flex-col">
                <div className="bg-gray-700 px-4 py-3 flex justify-between items-center relative">
                    <h2 className="text-sm font-semibold">Chat</h2>
                    <button className="text-white text-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        ⋮
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-12 right-4 bg-gray-700 shadow-md rounded-md w-40 py-2">
                            <a href={`/friend/${friendId}`} className="block px-4 py-2 text-left text-xs w-full hover:bg-gray-600">
                                Lihat Profil
                            </a>
                            <button onClick={handleDeleteMessage} className="block px-4 py-2 text-left text-xs w-full hover:bg-gray-600">
                                Hapus Semua Pesan
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {allMessage.map((chat, index) => (
                        <div
                            key={index}
                            className={`flex ${userId !== chat.user_id ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`px-3 py-1 text-[0.75rem] border rounded-lg max-w-[60%] ${
                                    userId !== chat.user_id
                                        ? "bg-gray-700 text-white border-gray-500"
                                        : "bg-blue-500 text-white border-blue-400"
                                }`}
                            >
                                {chat.chat}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-2 bg-gray-700 flex items-center">
                    <input
                        type="text"
                        className="flex-1 px-3 py-1 bg-gray-600 text-white text-xs rounded-md focus:outline-none border border-gray-500"
                        placeholder="Ketik sesuatu"
                        ref={messageRef}
                    />
                    <button onClick={handleMessage} className="ml-2 bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2H3m13 2a9 9 0 110-18 9 9 0 010 18z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
