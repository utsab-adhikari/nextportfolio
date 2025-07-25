"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AlbumPage from "@/components/General/AlbumPage";
import AlbumImageUploader from "@/components/General/AlbumImageUploader";
import React from "react";

export const metadata = {
  title: "Authenticated",
  description: "Page for unauthenticated access",
};

const Family = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 ">
     {/* Create Album Button */}
      <div className="mt-6 ml-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          ➕ Create Album
        </button>
      </div>

      {/* Album Display */}
      <AlbumPage />

     

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Create Album</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✖
              </button>
            </div>

            {/* Album Form */}
            <CreateAlbum closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const CreateAlbum = ({ closeModal }) => {
  const [albumName, setAlbumName] = useState("");
  const [albumImg, setAlbumImg] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    try {
      const res = await axios.post(
        "/api/album",
        { albumName, albumImg, description },
        { withCredentials: true }
      );

      // ✅ Axios doesn't have res.ok - use res.status instead
      if (res.status !== 200 || !res.data.success) {
        setError(res.data.message || "Something went wrong");
        return;
      }

      setSuccess(res.data.message);
      setAlbumName("");
      setAlbumImg("");
      setDescription("");

      // Close modal after success (optional)
      setTimeout(() => {
        closeModal();
        router.refresh(); // refresh page to show new album if needed
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Error submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Album Name */}
      <div>
        <label className="text-white block text-sm font-medium">Album Name</label>
        <input
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          required
        />
      </div>

      {/* Image Uploader */}
      <div>
        <label className="block mb-2 font-medium text-gray-300">
          Featured Image
        </label>
        <AlbumImageUploader onUpload={(url) => setAlbumImg(url)} />
        {albumImg && (
          <img
            src={albumImg}
            alt="Uploaded"
            className="mt-3 max-h-40 object-cover rounded-lg border border-gray-600"
          />
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-white block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
      >
        ✅ Create Album
      </button>

      {/* Error & Success Messages */}
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {success && <p className="text-green-500 mt-3">{success}</p>}
    </form>
  );
};

export default Family;
