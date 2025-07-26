"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import AlbumImageUploader from "./AlbumImageUploader";

export default function AlbumPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close menu on outside click
  const menuRefs = useRef([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get("/api/album", { withCredentials: true });
        if (!res.data.success) {
          setError(res.data.message || "Failed to load albums.");
        } else {
          setAlbums(res.data.albums);
        }
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openMenu !== null &&
        menuRefs.current[openMenu] &&
        !menuRefs.current[openMenu].contains(event.target)
      ) {
        setOpenMenu(null);
      }
    }
    if (openMenu !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const handleDelete = async (albumId) => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    try {
      await axios.delete(`/api/album/${albumId}`, { withCredentials: true });
      setAlbums((prev) => prev.filter((a) => a._id !== albumId));
    } catch {
      alert("Failed to delete album.");
    }
    setOpenMenu(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full border-4 border-blue-600 border-t-transparent h-12 w-12 mb-3" />
        <p className="text-white text-lg">Loading albums...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-12">
        <p className="text-red-400 text-lg font-semibold mb-2">{error}</p>
        <button
          className="px-4 py-2 bg-blue-600 rounded-lg text-white mt-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-4 px-2 sm:px-6">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Your Albums
        </h2>
        <div className="mt-6 ml-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            ➕ Create Album
          </button>
        </div>
      </header>
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

      {albums.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh]">
          <img
            src="/empty-album.svg"
            alt="No albums"
            className="w-32 h-32 mb-6 opacity-80"
          />
          <p className="text-gray-400 mb-4 text-center">
            You have no albums yet.
            <br />
            Start by creating your first album!
          </p>
          <Link
            href="/albums/create"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow font-medium"
          >
            Create Album
          </Link>
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          xs:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-4
          "
        >
          {albums.map((album, index) => (
            <div
              key={album._id}
              className="relative group bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.025] transition transform"
            >
              <Link href={`/${album.albumName}`} className="block" tabIndex={0}>
                <img
                  src={album.albumImg || "/album-placeholder.png"}
                  alt={album.albumName}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover bg-gray-800 group-hover:opacity-80 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <p className="font-semibold truncate text-white text-base">
                    {album.albumName}
                  </p>
                  <p className="text-gray-300 text-xs">
                    {new Date(album.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
              {/* Three Dots Menu */}
              <div
                className="absolute top-3 right-3 z-20"
                ref={(el) => (menuRefs.current[index] = el)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === index ? null : index);
                  }}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg transition"
                  aria-label="Open album menu"
                >
                  <BsThreeDotsVertical size={20} />
                </button>
                {openMenu === index && (
                  <div className="absolute right-0 mt-2 min-w-[120px] bg-white rounded-xl shadow-lg ring-1 ring-black/10 text-black text-sm flex flex-col overflow-hidden animate-fade-in">
                    <button
                      onClick={() => {
                        setOpenMenu(null);
                        alert(
                          `Album details:\n${
                            album.description || "No description."
                          }`
                        );
                      }}
                      className="px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(album._id)}
                      className="px-4 py-2 hover:bg-red-100 text-left text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
        <label className="text-white block text-sm font-medium">
          Album Name
        </label>
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
        <label className="text-white block text-sm font-medium">
          Description
        </label>
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
