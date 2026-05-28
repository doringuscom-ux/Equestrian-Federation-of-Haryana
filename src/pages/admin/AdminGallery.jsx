import React, { useState, useEffect } from 'react';
import { Upload, Plus, Trash2, Loader2, Image as ImageIcon, ImagePlus, Link as LinkIcon, Video } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';

const AdminGallery = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    mediaType: 'image', // 'image' or 'video'
    videoUrl: '',
    thumbnailUrl: ''
  });

  const categories = ['Events', 'Championships', 'Trainings', 'Dressage', 'Show Jumping', 'Eventing', 'Tent Pegging', 'Endurance', 'General'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mediaType === 'image' && !selectedFile) return alert('Please select an image first.');
    if (formData.mediaType === 'video' && !formData.videoUrl) return alert('Please enter a video URL.');
    
    setIsSubmitting(true);
    try {
      let imageUrl = formData.thumbnailUrl || '';
      
      if (formData.mediaType === 'image' && selectedFile) {
        imageUrl = await uploadToCloudinary(selectedFile);
      }
      
      const res = await fetch(`${API_BASE_URL}/gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          mediaType: formData.mediaType,
          videoUrl: formData.videoUrl,
          image: imageUrl
        })
      });

      if (res.ok) {
        // Reset form
        setFormData({ title: '', category: 'General', mediaType: 'image', videoUrl: '', thumbnailUrl: '' });
        setSelectedFile(null);
        setPreviewUrl('');
        fetchGallery(); // Refresh list
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Error uploading media. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setItems(items.filter(item => item._id !== id));
      }
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const renderThumbnail = (item) => {
    if (item.mediaType === 'video') {
      if (item.image) return <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />;
      
      // Try to extract YouTube ID
      let youtubeId = '';
      const match = item.videoUrl?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
      if (match && match[1]) {
        youtubeId = match[1];
        return <img src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />;
      }
      
      // Fallback for video
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-400 group-hover:scale-110 transition-transform duration-500">
           <Video size={48} className="opacity-50" />
        </div>
      );
    }
    
    return <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-out]">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Gallery</h1>
        <p className="text-gray-500">Upload and organize images and videos for the public gallery.</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ImagePlus className="text-blue-600 w-5 h-5" />
          Add New Image
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Image Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Tournament Final Match"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Media Type</label>
                <div className="flex bg-gray-50/80 p-1.5 rounded-2xl w-max border border-gray-100 shadow-sm">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, mediaType: 'image'})} 
                    className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${formData.mediaType === 'image' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Image
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, mediaType: 'video'})} 
                    className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${formData.mediaType === 'video' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Video
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {formData.mediaType === 'video' ? (
                <>
                  <div className="flex items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-100 text-blue-500 font-medium text-sm shadow-sm">
                      <LinkIcon size={16} />
                      Video URL Support
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Video Link (YouTube/Vimeo)</label>
                    <input 
                      type="text" 
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required={formData.mediaType === 'video'}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Cover / Thumbnail Image URL <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input 
                      type="text" 
                      value={formData.thumbnailUrl}
                      onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                      placeholder="https://... (custom thumbnail image URL)"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">If left blank, YouTube thumbnail will be used automatically.</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 h-full">
                  <label className="text-sm font-semibold text-gray-700">Upload File</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group flex-1 min-h-[200px] flex flex-col items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-2" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-medium">Click to change</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Upload size={32} />
                        <span className="text-sm font-medium">Click to upload image</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required={formData.mediaType === 'image'}
                    />
                  </div>
                </div>
              )}
            </div>
            
          </div>
          
          {/* Submit Button */}
          <div className="mt-10 md:w-1/2 md:ml-auto">
            <button 
              type="submit" 
              disabled={isSubmitting || (formData.mediaType === 'image' && !selectedFile) || (formData.mediaType === 'video' && !formData.videoUrl)}
              className="w-full bg-[#185BFF] hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Add to Project Gallery'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Grid View */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <ImageIcon size={20} className="text-blue-600" />
          Gallery Items ({items.length})
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
            <p>No items in the gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item._id} className="group relative rounded-xl overflow-hidden aspect-square border border-gray-100 bg-gray-50">
                {renderThumbnail(item)}
                
                {item.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                      <Video size={20} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">{item.category}</span>
                  <h3 className="text-white text-sm font-medium truncate">{item.title}</h3>
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg scale-90 group-hover:scale-100 z-10"
                  title="Delete Item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminGallery;
