import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    getProfile,
    updateProfile,
    deleteAccount,
} from "../components/Utils/authApi";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import { useAuth } from "../components/Utils/AuthContext"

const Account = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [editing, setEditing] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { updateUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();

                setUser(data.user);
                setEmail(data.user.email);
            } catch (error) {
                console.error(error);

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/signin");
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleUpdate = async () => {
        setError("");
        setSuccess("");

        const trimmedEmail = email.trim().toLowerCase();

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!trimmedEmail) {
            setError("Email is required");
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            const data = await updateProfile({
                email: trimmedEmail,
            });

            setUser(data.user);
            setEmail(data.user.email);

            updateUser(data.user);

            setEditing(false);

            setSuccess("Profile updated successfully!");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Update failed",
            );
        }
    };

    const handleDelete = async () => {
        try {
            setError("");

            await deleteAccount();

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Delete failed",
            );
        }
    };

    if (!user) {
        return null;
    }

    const displayName = user.email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .split(" ")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1),
        )
        .join(" ");

    return (
        <main>
            <HomeLayout>
                <div className="min-h-screen bg-black px-6 py-32 text-white">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="text-4xl font-bold">
                            Account
                        </h1>

                        <div className="mt-10 border-t border-gray-700 pt-8">
                            <h2 className="text-2xl font-semibold">
                                Profile
                            </h2>

                            <div className="mt-6 rounded-lg bg-zinc-900 p-6">
                                <h3 className="text-xl font-medium">
                                    {displayName}
                                </h3>

                                <p className="mt-2 text-gray-400">
                                    {user?.email}
                                </p>

                                {editing ? (
                                    <div className="mt-6">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded bg-zinc-800 px-4 py-3 text-white outline-none"
                                        />

                                        <div className="mt-4 flex gap-3">
                                            <button
                                                onClick={handleUpdate}
                                                className="rounded bg-white px-5 py-2 text-black"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setEmail(user.email);
                                                    setEditing(false);
                                                    setError("");
                                                }}
                                                className="rounded bg-zinc-700 px-5 py-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEmail(user.email);
                                            setEditing(true);
                                        }}
                                        className="mt-6 rounded bg-white px-5 py-2 text-black"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            {success && (
                                <div className="mt-4 flex w-fit items-center gap-3 rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                                        ✓
                                    </div>

                                    <p>{success}</p>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 flex w-fit items-center gap-3 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                        !
                                    </div>

                                    <p>{error}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 border-t border-gray-700 pt-8">
                            <h2 className="text-2xl font-semibold">
                                Danger Zone
                            </h2>

                            <p className="mt-2 text-gray-400">
                                Permanently delete your account
                                and all associated data.
                            </p>

                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="mt-5 rounded bg-red-600 px-5 py-2 font-medium hover:bg-red-700"
                            >
                                Delete Account
                            </button>
                            {showDeleteModal && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
                                    <div className="w-full max-w-md rounded-xl bg-[#181818] p-6 shadow-2xl">
                                        <h2 className="text-2xl font-semibold text-white">
                                            Delete Account?
                                        </h2>

                                        <p className="mt-3 text-sm leading-6 text-gray-400">
                                            Are you sure you want to permanently delete your
                                            account? This action cannot be undone.
                                        </p>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <button
                                                onClick={() => setShowDeleteModal(false)}
                                                className="rounded-md bg-zinc-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-600"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={handleDelete}
                                                className="rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}  
                        </div>
                    </div>
                </div>

            </HomeLayout>
        </main>



    );
};

export default Account;