// components/StoryModal.tsx
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: number;
  name: string;
  storyImg: string;
  profileImg: string;
}

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex: number;
}

function StoryModal({ isOpen, onClose, stories, initialStoryIndex }: StoryModalProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentStoryIndex];

  // Reset progress cuando cambia la historia
  useEffect(() => {
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Pasar a la siguiente historia
          goToNextStory();
          return 0;
        }
        return prev + 2; // Ajusta la velocidad aquí
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // Si es la última historia, cerrar el modal
      onClose();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Si click en la izquierda, historia anterior; derecha, siguiente historia
    if (x < rect.width / 2) {
      goToPrevStory();
    } else {
      goToNextStory();
    }
  };

  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Barra de progreso */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full">
            <div
              className={`h-full rounded-full transition-all duration-100 ${
                index === currentStoryIndex
                  ? "bg-white"
                  : index < currentStoryIndex
                  ? "bg-white"
                  : "bg-gray-600"
              }`}
              style={{
                width: index === currentStoryIndex ? `${progress}%` : index < currentStoryIndex ? "100%" : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Header con información del usuario */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center gap-3">
        <img
          src={currentStory.profileImg}
          alt={currentStory.name}
          className="w-8 h-8 rounded-full border-2 border-white"
        />
        <span className="text-white font-semibold">{currentStory.name}</span>
        <span className="text-gray-300 text-sm">• 5h</span>
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="ml-auto p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={24} className="text-white" />
        </button>
      </div>

      {/* Imagen de la historia */}
      <div
        className="w-full h-full flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={currentStory.storyImg}
          alt={`Story by ${currentStory.name}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Botones de navegación (solo en desktop) */}
      <button
        onClick={goToPrevStory}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/20 rounded-full transition-colors hidden md:block"
        disabled={currentStoryIndex === 0}
      >
        <ChevronLeft size={32} className="text-white" />
      </button>

      <button
        onClick={goToNextStory}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/20 rounded-full transition-colors hidden md:block"
        disabled={currentStoryIndex === stories.length - 1}
      >
        <ChevronRight size={32} className="text-white" />
      </button>
    </div>
  );
}

export default StoryModal;