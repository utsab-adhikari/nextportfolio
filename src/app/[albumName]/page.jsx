"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader"; // Ensure this exists

export default function AlbumDetailsPage() {
  const { albumName } = useParams();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const [imageUrls, setImageUrls] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [gridColumns, setGridColumns] = useState(4);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedImageDetails, setSelectedImageDetails] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`/api/album/v1?albumName=${albumName}`);
        if (res.data.success) {
          setImages(res.data.images);
        } else {
          setError(res.data.message || "Failed to load images");
        }
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [albumName]);

  const handleImageUpload = (urls) => {
    setImageUrls((prev) => [...prev, ...urls]);
  };

  const handleRemove = (indexToRemove) => {
    setImageUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
    setUploading(true);

    try {
      const res = await axios.post(
        `/api/images`,
        { albumName, imageUrls },
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccess(res.data.message);
        setImageUrls([]);
        const updatedRes = await axios.get(`/api/album/v1?albumName=${albumName}`);
        if (updatedRes.data.success) {
          setImages(updatedRes.data.images);
        }
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error submitting the form.");
    } finally {
      setUploading(false);
    }
  };

  const groupImagesByDate = (imagesArray) => {
    const grouped = {};
    imagesArray.forEach((imageDoc) => {
      if (imageDoc.createdAt) {
        const date = new Date(imageDoc.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(imageDoc);
      }
    });
    return grouped;
  };

  const groupedImages = groupImagesByDate(images);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDownload = async (imageUrl, imageId) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `image-${imageId || Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setOpenMenuId(null);
    } catch (error) {
      console.error("Error downloading image:", error);
      setError("Failed to download image.");
    }
  };

  const handleShowDetails = (imageDoc, url) => {
    setSelectedImageDetails(imageDoc);
    setSelectedImageUrl(url);
    setShowDetailsModal(true);
    setOpenMenuId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 space-y-6 min-h-screen text-gray-100 font-inter">
      <h2 className="text-3xl font-extrabold text-white mb-6 capitalize">
        Album: {albumName}
      </h2>

      {/* Upload Section */}
      <form
        className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-semibold text-white mb-4">Add more images</h3>
        <div className="space-y-6">
          <ImageUploader onUpload={handleImageUpload} />

          {imageUrls.length > 0 && (
            <>
              <h3 className="text-base font-semibold text-gray-400">
                Uploaded Images ({imageUrls.length})
              </h3>

              <div
                className="grid gap-2 p-2 rounded-md border border-gray-600 bg-gray-800"
                style={{
                  gridTemplateColumns: `repeat(${gridColumns}, minmax(80px, 1fr))`,
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {imageUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-md overflow-hidden hover:scale-105 transition-transform duration-200 ease-in-out shadow-md"
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${idx + 1}`}
                      className="w-full h-20 object-cover rounded-md"
                      loading="lazy"
                    />
                    <button
                      onClick={() => handleRemove(idx)}
                      className="absolute top-1 right-1 bg-red-600 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
        {success && <p className="text-green-400 mt-4 text-sm">{success}</p>}
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          disabled={uploading || imageUrls.length === 0}
        >
          {uploading ? "Uploading..." : "Submit Images"}
        </button>
      </form>

      {/* Grid Column Controller */}
      <div className="flex justify-end items-center gap-2">
        <label htmlFor="gridCols" className="text-gray-300 text-sm">
          Grid Columns:
        </label>
        <select
          id="gridCols"
          className="bg-gray-800 text-white px-2 py-1 rounded-md border border-gray-600"
          value={gridColumns}
          onChange={(e) => setGridColumns(Number(e.target.value))}
        >
          {[2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Display Images */}
      {loading ? (
        <p className="text-gray-400 text-lg">Loading images...</p>
      ) : error && !success ? (
        <p className="text-red-400 text-lg">{error}</p>
      ) : images.length === 0 ? (
        <p className="text-gray-400 text-lg">No images in this album yet.</p>
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            Total Images: {images.length}
          </h3>

          {Object.keys(groupedImages)
            .sort((a, b) => new Date(b) - new Date(a))
            .map((date) => (
              <div key={date} className="mb-10">
                <h4 className="text-xl font-bold text-gray-300 mb-5 pb-2 border-b border-gray-700">
                  {date}
                </h4>
                <div
                  className="grid gap-4 overflow-visible"
                  style={{
                    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
                  }}
                >
                  {groupedImages[date].map((imageDoc) =>
                    imageDoc.image.map((url, i) => {
                      const uniqueId = imageDoc._id + "-" + i;
                      return (
                        <div
                          key={uniqueId}
                          className="relative group rounded-lg shadow-lg overflow-visible"
                        >
                          <img
                            src={url}
                            alt={`img-${i}`}
                            className="w-full h-full rounded object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                            loading="lazy"
                            onClick={() => handleShowDetails(imageDoc, url)}
                          />
                         
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
        </>
      )}

      {showDetailsModal && selectedImageDetails && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl max-w-3xl w-full border border-gray-700 relative">
            <img
              src={selectedImageUrl}
              alt="Full Image"
              className="w-full max-h-[60vh] object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-white mb-2">Image Details</h3>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold">Uploaded By:</span> {selectedImageDetails.uploader || "N/A"}
            </p>
            <p className="text-gray-300 mb-4">
              <span className="font-semibold">Created At:</span> {formatDate(selectedImageDetails.createdAt)}
            </p>

            <button
              onClick={() => handleDownload(selectedImageUrl, selectedImageDetails._id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mr-4"
            >
              Download
            </button>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
