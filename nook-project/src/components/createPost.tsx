import { useState, useRef } from "react";
import { ArrowLeft, MapPin, Hash, Music, Sliders, Type, Upload, X } from "lucide-react";
import { supabase, uploadImage } from '../lib/supabase';

/**
 * CreatePost Component
 * Two-step modal for creating posts: 1) Upload image, 2) Add details
 */

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreatePost({ isOpen, onClose }: CreatePostProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Current step: 'upload' or 'details'
  const [step, setStep] = useState<'upload' | 'details'>('upload');

  // Form state
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "",
    description: "",
    tags: "",
    location: "",
  });

  // Drag & drop state
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Uploading state
  const [uploading, setUploading] = useState(false);

  /**
   * Handles file selection
   */
  const handleFileSelect = async (file: File) => {
    try {
      setUploading(true);
      console.log('📤 Iniciando subida de imagen...');

      const imageUrl = await uploadImage(file);

      console.log('✅ Imagen subida:', imageUrl);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      setImagePreview(imageUrl);
      setStep('details');

    } catch (error) {
      setUploading(false); // Reset uploading state on error
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  };

  /**
   * Handles file input change
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  /**
   * Handles drag over event
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handles drag leave event
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * Handles drop event
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  /**
   * Handles going back to upload step
   */
  const handleBack = () => {
    setStep('upload');
    setImagePreview("");
    setFormData(prev => ({ ...prev, image: "" }));
  };

  /**
   * Handles form submission - Creates new post in Supabase
   */
  const handleShare = async () => {
    if (!formData.image) {
      alert('Por favor selecciona una imagen primero');
      return;
    }

    try {
      console.log(' Guardando post en la base de datos...');

      // gets authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        alert('Por favor inicia sesión para crear un post');
        return;
      }

      // Create new post
      const newPost = {
        user_id: user.id,
        image_url: formData.image,
        title: formData.title || "Sin título",
        category: formData.category || "General",
        description: formData.description || "",
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        location: formData.location || "",
        created_at: new Date().toISOString(),
      };

      console.log('📝 Insertando post:', newPost);

      // Insert on the data base
      const { data: postData, error: insertError } = await supabase
        .from('posts')
        .insert(newPost)
        .select()
        .single();

      if (insertError) {
        console.error(' Error insertando post:', insertError);
        throw new Error(`Error al guardar el post: ${insertError.message}`);
      }

      console.log('Post guardado exitosamente:', postData);

      // 👇 NOTIFY THAT A NEW POST WAS CREATED
      window.dispatchEvent(new CustomEvent('postCreated'));

      // Reset form
      setStep('upload');
      setImagePreview("");
      setFormData({
        image: "",
        title: "",
        category: "",
        description: "",
        tags: "",
        location: ""
      });

      // Close modal
      if (onClose) onClose();

      // Success message
      alert('¡Post creado exitosamente!');

    } catch (error) {
      // reset in case of an error
      setUploading(false);

      console.error('Error creando post:', error);
      if (error instanceof Error) {
        alert('Error al crear el post: ' + error.message);
      } else {
        alert('Error al crear el post: ' + String(error));
      }
    }
  };

  /**
   * Handles input changes
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Opens file selector
   */
  const handleSelectFile = () => {
    fileInputRef.current?.click();
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
              <X size={20} className="text-gray-600" />
            </button>

            {/* Header */}
            <h2 className="text-center text-lg font-bold text-gray-900 mb-8">
              CREATE NEW POST
            </h2>

            {/* Upload Area */}
            <div className="flex flex-col items-center mb-8">
              {/* Drag & Drop Zone */}
              <div
                className={`w-28 h-28 border-4 border-dashed rounded-2xl flex flex-col items-center justify-center mb-6 cursor-pointer transition-all duration-200${uploading
                  ? 'border-[#7C6AA6] bg-[#7C6AA6]/10 cursor-not-allowed'
                  : isDragging
                    ? 'border-[#7C6AA6] bg-[#7C6AA6]/10'
                    : 'border-gray-400 hover:border-[#7C6AA6] hover:bg-gray-50'
                  }`}
                onDragOver={uploading ? undefined : handleDragOver}
                onDragLeave={uploading ? undefined : handleDragLeave}
                onDrop={uploading ? undefined : handleDrop}
                onClick={uploading ? undefined : handleSelectFile}
              >
                {uploading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#7C6AA6] mx-auto mb-2"></div>
                    <span className="text-[#7C6AA6] text-xs font-medium">Uploading...</span>
                  </div>
                ) : isDragging ? (
                  <div className="text-center">
                    <Upload size={24} className="text-[#7C6AA6] mx-auto mb-2" />
                    <span className="text-[#7C6AA6] text-xs font-medium">Drop here</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      className="w-8 h-8 text-gray-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" />
                      <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="text-gray-500 text-xs">Upload</span>
                  </div>
                )}
              </div>

              <p className="text-gray-900 text-lg font-medium mb-2 text-center">
                Drag photos here
              </p>
              <p className="text-gray-500 text-sm text-center mb-6">
                or select from your computer
              </p>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*"
                className="hidden"
              />

              {/* Upload Button */}
              <button
                onClick={uploading ? undefined : handleSelectFile}
                disabled={uploading}
                className={`w-full bg-[#7C6AA6] text-white py-3 rounded-xl font-medium transition-colors${uploading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#6a5478]'
                  }`}
              >
                {uploading ? 'Uploading...' : 'Select from computer'}
              </button>

              {/* Format Info */}
              <p className="text-gray-400 text-xs mt-4 text-center">
                Supports: JPG, PNG, WEBP • Max: 10MB
              </p>
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
              <h2 className="text-lg font-bold text-gray-900">CREATE POST</h2>
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
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                  {/* Change Image Button */}
                  <button
                    onClick={handleSelectFile}
                    className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Upload size={16} />
                  </button>
                </div>

                {/* Hidden File Input (para cambiar imagen) */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/*"
                  className="hidden"
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

                {/* Title Input */}
                <input
                  type="text"
                  placeholder="Add a title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-2 border-0 focus:outline-none text-gray-900 font-semibold placeholder-gray-400 mb-2"
                />

                {/* Category Input */}
                <input
                  type="text"
                  placeholder="Category (e.g., Urban, Nature)..."
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-4 py-2 border-0 focus:outline-none text-gray-700 placeholder-gray-400 mb-2"
                />

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
                    <span className="text-gray-700 font-medium">
                      {formData.tags || "Tags"}
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
