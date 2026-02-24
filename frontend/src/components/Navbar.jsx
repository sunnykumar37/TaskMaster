import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="glass sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-xl border-b border-white/5">
            <Link to="/" className="text-3xl font-black font-display tracking-tighter hover:opacity-80 transition-opacity">
                TASK<span className="text-primary italic">MASTER</span>
            </Link>
            <div className="flex items-center gap-8">
                {user ? (
                    <>
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Authenticated</span>
                            <span className="text-white font-semibold text-sm">{user.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2 rounded-xl text-xs font-bold transition-all border border-red-500/20 shadow-lg active:scale-95"
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                            Log In
                        </Link>
                        <Link
                            to="/register"
                            className="bg-primary hover:bg-primary-dark px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-95 translate-y-[-1px]"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
