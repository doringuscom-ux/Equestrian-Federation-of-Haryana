import React, { useState, useEffect } from 'react';
import { PlusCircle, Image as ImageIcon, FileText, Link as LinkIcon, Trash2, Loader2, List, Edit2 } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';
import { Link } from 'react-router-dom';

const News = () => {
  const [formData, setFormData] = useState({
    headline: '',
    summary: '',
    category: 'Official Results',
    date: '',
    pdfLink: '',
    slug: '',
    imageFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      headline: item.headline,
      summary: item.summary || '',
      category: item.category,
      date: new Date(item.date).toISOString().split('T')[0],
      pdfLink: item.pdfLink || '',
      slug: item.slug || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // 1. Upload image if exists
      if (formData.imageFile) {
        const uploadData = new FormData();
        uploadData.append('file', formData.imageFile);
        
        const uploadRes = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: uploadData,
        });
        
        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          imageUrl = uploadResult.url;
        } else {
          throw new Error('Failed to upload image.');
        }
      }

      // 2. Submit form
      const url = editingId ? `${API_BASE_URL}/news/${editingId}` : `${API_BASE_URL}/news`;
      const method = editingId ? 'PUT' : 'POST';

      const payload = { ...formData };
      if (imageUrl) payload.image = imageUrl;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Failed to ${editingId ? 'update' : 'create'} entry`);
      }

      setSuccessMsg(`Entry ${editingId ? 'updated' : 'published'} successfully!`);
      setFormData({
        headline: '',
        summary: '',
        category: 'Official Results',
        date: '',
        pdfLink: '',
        slug: '',
        imageFile: null,
      });
      setEditingId(null);
      fetchNews();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchNews();
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto animate-[fadeIn_0.4s_ease-out]">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-black text-[#0f172a] tracking-tight leading-tight mb-2 font-['Inter']">Manage Results & News</h1>
        <p className="text-[#64748b] text-[15px] font-medium">Add and manage competition results and news updates.</p>
      </div>

      <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 max-w-5xl">
        
        <div className="flex items-center gap-2 mb-8">
          <PlusCircle size={24} className="text-[#3b82f6]" strokeWidth={2.5} />
          <h2 className="text-xl font-bold text-[#0f172a]">{editingId ? 'Edit Entry' : 'Add New Entry'}</h2>
          {editingId && (
            <button 
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ headline: '', summary: '', category: 'Official Results', date: '', pdfLink: '', slug: '' });
                setError('');
                setSuccessMsg('');
              }}
              className="ml-auto text-sm font-bold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {error && <div className="mb-6 text-sm text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">{error}</div>}
        {successMsg && <div className="mb-6 text-sm text-green-500 bg-green-50 p-4 rounded-xl border border-green-100">{successMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* Left Column */}
            <div className="space-y-6">
              
              {/* Headline */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Headline</label>
                <input 
                  type="text" 
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="Result name (e.g., State Championship 2026)"
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium"
                />
              </div>

              {/* Custom URL */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Custom URL (Optional)</label>
                <input 
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Leave blank to auto-generate from headline"
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Summary</label>
                <textarea 
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Brief summary for the card view..."
                  rows="4"
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium resize-none"
                ></textarea>
              </div>

              {/* Category & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-2">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium appearance-none"
                  >
                    <option value="Official Results">Official Results</option>
                    <option value="News Update">News Update</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Circular">Circular</option>
                    <option value="Notice">Notice</option>
                    <option value="Rules">Rules</option>
                    <option value="Results">Results</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium"
                  />
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-6 flex flex-col">
              
              {/* Image Upload */}
              <div className="flex-grow mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon size={14} className="text-gray-500" />
                  <label className="block text-[13px] font-bold text-gray-700">Direct Image Upload (Optional)</label>
                </div>
                <input 
                  type="file" 
                  name="imageFile"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange}
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 transition-all font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#3b82f6]/10 file:text-[#3b82f6] hover:file:bg-[#3b82f6]/20 cursor-pointer"
                />
                <p className="text-[11px] text-gray-400 font-medium mt-2 ml-1">Upload a flyer or result image if you don't have a PDF link.</p>
              </div>

              {/* PDF Link */}
              <div className="flex-grow mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={14} className="text-gray-500" />
                  <label className="block text-[13px] font-bold text-gray-700">PDF Link</label>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <LinkIcon size={16} strokeWidth={2.5} />
                  </div>
                  <input 
                    type="text" 
                    name="pdfLink"
                    value={formData.pdfLink}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/... or https://.../result.pdf"
                    className="w-full bg-white border-2 border-[#bfdbfe] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all font-medium"
                  />
                </div>
                <p className="text-[11px] text-gray-400 font-medium mt-2 ml-1">Paste a direct link to the PDF (Google Drive, Dropbox, etc.)</p>
              </div>

              {/* Submit Button */}
              <div className="mt-auto pt-6">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 text-white font-bold text-[15px] py-4 rounded-xl transition-all shadow-[0_4px_15px_rgba(37,99,235,0.2)]"
                >
                  {isSubmitting ? 'Processing...' : editingId ? 'Update Submission' : 'Publish Submission'}
                </button>
              </div>

            </div>

          </div>
        </form>
      </div>

      {/* Recent Entries List */}
      <div className="mt-12 max-w-5xl">
        <div className="flex items-center gap-2 mb-6">
          <List size={24} className="text-[#3b82f6]" strokeWidth={2.5} />
          <h2 className="text-xl font-bold text-[#0f172a]">Recent Entries</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center p-16">
            <FileText size={48} className="text-gray-300 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-[#0f172a] mb-1">No entries found</h3>
            <p className="text-[#64748b] text-sm">Published news and results will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex-grow pr-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#eff6ff] text-[#3b82f6] px-3 py-1 rounded-lg text-xs font-bold border border-[#dbeafe]">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#0f172a] mb-1">{item.headline}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">efharyana.com/news/{item.slug}</span>
                  </div>
                  {item.summary && <p className="text-sm text-[#64748b] line-clamp-2">{item.summary}</p>}
                </div>
                
                <div className="flex items-center gap-3 flex-shrink-0 border-l border-gray-100 pl-6">
                  {item.image && (
                    <Link 
                      to={`/${item.category.toLowerCase().replace(/\s+/g, '-')}/${item.slug}`} 
                      className="w-10 h-10 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl flex items-center justify-center transition-colors border border-green-100" 
                      title="View Image"
                    >
                      <ImageIcon size={16} strokeWidth={2.5} />
                    </Link>
                  )}
                  {item.pdfLink && (
                    <Link 
                      to={`/${item.category.toLowerCase().replace(/\s+/g, '-')}/${item.slug}`} 
                      className="w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center transition-colors border border-gray-100" 
                      title="View PDF"
                    >
                      <FileText size={16} strokeWidth={2.5} />
                    </Link>
                  )}
                  <button 
                    onClick={() => handleEdit(item)}
                    className="w-10 h-10 bg-blue-50 hover:bg-blue-100 text-[#3b82f6] rounded-xl flex items-center justify-center transition-colors border border-blue-100"
                    title="Edit Entry"
                  >
                    <Edit2 size={16} strokeWidth={2.5} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl flex items-center justify-center transition-colors border border-red-100"
                    title="Delete Entry"
                  >
                    <Trash2 size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default News;
