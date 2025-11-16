import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth.js";

export default function UserForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message);

        
        loginUser();

        navigate("/home");
    };

    
    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage("");

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message);

        navigate("/home");
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">User Form</h1>

            <form className="grid gap-2.5 w-80">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded" />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded" />
                <input name="role" placeholder="Role" value={form.role} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded" />

                <button onClick={handleRegister} className="bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600">
                    Register
                </button>

                <button onClick={handleUpdate} className="bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600">
                    Update
                </button>
            </form>

            {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>
    );
}