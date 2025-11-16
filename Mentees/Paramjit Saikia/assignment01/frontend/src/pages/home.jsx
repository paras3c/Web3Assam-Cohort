import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/get`);
            const data = await res.json();
            setUser(data);
        }
        fetchUser();
    }, []);

    if (!user) return <h3>Loading...</h3>;

    return (
        <div className="p-5 w-full h-screen flex flex-col items-center justify-center">

            <div className="border text-white bg-black rounded-4xl border-gray-300 p-4 w-[60%] h-[50%] flex gap-3 items-center justify-center">
            <div className="img w-[25%] h-[80%] bg-white rounded-3xl">

            </div>
            <div className="details flex flex-col w-[70%] gap-2">
                
                <p className="text-3xl font-bold text-cyan-200"><strong>Name:</strong> {user.name}</p>
                <p className="text-2xl font-semibold"><strong>Email:</strong> {user.email}</p>
                <p className="text-2xl "><strong>Role:</strong> {user.role}</p>
            </div>
            </div>

            <br />

            <button
                onClick={() => navigate("/update")}
                className="bg-orange-500 text-white mr-2 p-2 rounded"
            >
                Update Data
            </button>

            
        </div>
    );
}