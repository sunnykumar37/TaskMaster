import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/users/me");
                setFormData({ name: data.name || "", email: data.email || "", password: "" });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
            };
            if (formData.password) {
                payload.password = formData.password;
            }

            const { data } = await api.put("/users/me", payload);
            updateUserProfile(data);
            setFormData((prev) => ({ ...prev, password: "" }));
            setSuccess("Profile updated successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="glass px-10 py-8 rounded-3xl shadow-2xl border border-white/10 text-gray-300 text-sm">
                    Loading profile...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-lg w-full glass p-10 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black font-display tracking-tight text-white mb-3">Profile</h1>
                    <p className="text-gray-400 font-medium">Update your account information</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 mb-6 text-sm rounded-2xl font-bold text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 mb-6 text-sm rounded-2xl font-bold text-center">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Name</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-600 font-medium text-white"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-600 font-medium text-white"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">New Password (optional)</label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-600 font-medium text-white"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            minLength={6}
                            placeholder="Leave blank to keep current password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transform active:scale-[0.98] mt-4 uppercase tracking-widest text-sm"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;

