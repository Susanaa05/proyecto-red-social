import { useState } from "react";
import { ArrowLeft, MapPin, Hash, Music, Sliders, Type } from "lucide-react";

/**
 * CreatePost Component
 * Two-step modal for creating posts: 1) Upload image, 2) Add details
 */

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreatePost({ isOpen, onClose }: CreatePostProps) {
  // Current step: 'upload' or 'details'
  const [step, setStep] = useState<'upload' | 'details'>('upload');

  // Form state
  const [formData, setFormData] = useState({
    image: "",
    description: "",
    tags: "",
    location: "",
  });

  /**
   * Handles image URL input and moves to details step
   */
  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
    setStep('details');
  };

  /**
   * Handles going back to upload step
   */
  const handleBack = () => {
    setStep('upload');
    setFormData({ image: "", description: "", tags: "", location: "" });
  };

  /**
   * Handles form submission
   */
  const handleShare = () => {
    console.log("Post data:", formData);
    // Reset and close
    setStep('upload');
    setFormData({ image: "", description: "", tags: "", location: "" });
    onClose();
  };

  /**
   * Handles input changes
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <>
      {/* ===== OVERLAY BACKGROUND ===== */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {step === 'upload' ? (
          // ===== STEP 1: UPLOAD IMAGE =====
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <h2 className="text-center text-lg font-bold text-gray-900 mb-8">
              NEW POST
            </h2>

            {/* Upload Icon */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-28 h-28 border-4 border-gray-400 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" />
                  <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <p className="text-gray-900 text-lg font-medium mb-6">
                Drag the photo here
              </p>

              {/* Upload Button */}
              <button
                onClick={() => {
                  const url = prompt("Enter image URL:");
                  if (url) handleImageUpload(url);
                }}
                className="w-full bg-[#7C6AA6] text-white py-3 rounded-xl font-medium hover:bg-[#6a5478] transition-colors"
              >
                Select from the computer
              </button>
            </div>
          </div>
        ) : (
          // ===== STEP 2: ADD DETAILS =====
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-700" />
              </button>
              <h2 className="text-lg font-bold text-gray-900">NEW POST</h2>
              <button
                onClick={handleShare}
                className="text-[#7C6AA6] font-semibold text-base hover:text-[#6a5478] transition-colors"
              >
                Share
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row">
              {/* Left: Image Preview */}
              <div className="w-full md:w-1/2 p-6">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full aspect-square object-cover rounded-2xl"
                />
              </div>

              {/* Right: Form */}
              <div className="w-full md:w-1/2 p-6 flex flex-col">
                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button className="flex flex-col items-center justify-center w-16 h-16 bg-[#7C6AA6] rounded-2xl hover:bg-[#6a5478] transition-colors">
                    <Music size={20} className="text-white mb-1" />
                    <span className="text-white text-[10px] font-medium">Audio</span>
                  </button>

                  <button className="flex flex-col items-center justify-center w-16 h-16 bg-[#7C6AA6] rounded-2xl hover:bg-[#6a5478] transition-colors">
                    <Sliders size={20} className="text-white mb-1" />
                    <span className="text-white text-[10px] font-medium">Edit</span>
                  </button>

                  <button className="flex flex-col items-center justify-center w-16 h-16 bg-[#7C6AA6] rounded-2xl hover:bg-[#6a5478] transition-colors">
                    <div className="text-white mb-1 text-xl">✨</div>
                    <span className="text-white text-[10px] font-medium">Filter</span>
                  </button>

                  <button className="flex flex-col items-center justify-center w-16 h-16 bg-[#7C6AA6] rounded-2xl hover:bg-[#6a5478] transition-colors">
                    <Type size={20} className="text-white mb-1" />
                    <span className="text-white text-[10px] font-medium">Text</span>
                  </button>
                </div>

                {/* Description */}
                <textarea
                  placeholder="Add the description or caption..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-0 focus:outline-none resize-none text-gray-700 placeholder-gray-400 mb-4"
                />

                {/* Tags */}
                <button
                  onClick={() => {
                    const tags = prompt("Enter tags (comma separated):");
                    if (tags) handleInputChange("tags", tags);
                  }}
                  className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 rounded-xl transition-colors mb-2"
                >
                  <div className="flex items-center gap-3">
                    <Hash size={20} className="text-gray-700" />
                    <span className="text-gray-700 font-medium">Tags</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Add Location */}
                <button
                  onClick={() => {
                    const location = prompt("Enter location:");
                    if (location) handleInputChange("location", location);
                  }}
                  className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-gray-700" />
                    <span className="text-gray-700 font-medium">
                      {formData.location || "Add location"}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreatePost;