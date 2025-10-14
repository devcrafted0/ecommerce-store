'use client'

import { useState } from 'react';
import { Upload, Edit2, ChevronDown, Play } from 'lucide-react';
import axios from 'axios';
import ProgressBar from '@/components/ProgressBar';
import FormStatus from '@/components/main/FormStatus';

export default function VideoUpload() {

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnailUrl , setThumbnailUrl] = useState<string>('');
  const [duration , setDuration] = useState<number>(0); 
  const [tags, setTags] = useState('');
  
  const [visibility, setVisibility] = useState('public');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [thumbnailUploadProgress , setThumbnailUploadProgress] = useState<number>(0);
  const [response , setResponse] = useState<string>('');
  const [disabled , setDisabled] = useState<boolean>(false);

  const handleFileSelect = async (e : React.ChangeEvent<HTMLInputElement>, type:string) => {
    setDisabled(false);
    const file = e.target.files?.[0];

    if (type === 'video') {
      setVideoFile(file!);
    }
    
    const formData = new FormData();
    formData.append('video', file!);

    const response = await axios.post('/api/v1/video/upload', formData, {
      onUploadProgress:(progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100)/ progressEvent.total!);
        setUploadProgress(percent);
      }
    });

    setVideoUrl(response.data.videoUrl);
    setDuration(response.data.duration);
    setDisabled(true);
  };

  const handleThumbnailSelect = async (e : React.ChangeEvent<HTMLInputElement>, type : string) => {
    const file = e.target.files?.[0];

    if (type === 'thumbnail') {
      setThumbnail(file!);
    }

    const formData = new FormData();
    formData.append('thumbnail', file!);

    const response = await axios.post('/api/v1/video/upload-thumbnail', formData, {
      onUploadProgress:(progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100)/ progressEvent.total!);
        setThumbnailUploadProgress(percent);
      }
    });
    setThumbnailUrl(response.data.videoUrl);
  };

  const toggleSection = (section:string | null) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const publishVideo = async() => {
    const res = await axios.post('/api/v1/video/post-video', {title , description , videoUrl , thumbnailUrl , duration})
    setResponse(res.data.message)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full pt-20">
      <div className="max-w-6xl mx-auto">
        {response !== '' && <FormStatus text={response} success={true}/>}
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload Video</h1>
          <p className="text-gray-600">Share your content with your audience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Upload Section */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Video Details</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition cursor-pointer mb-6 bg-gray-50"
                onClick={() => document.getElementById('video-input')?.click()}>
                <Upload size={32} className="mx-auto mb-3" style={{ color: '#B6349A' }} />
                <label htmlFor="video-input" className="cursor-pointer">
                  <button
                    className="px-6 py-2 rounded-full font-semibold text-white transition hover:shadow-lg"
                    style={{ backgroundColor: '#B6349A' }}
                  >
                    Select File
                  </button>
                </label>
                <p className="text-gray-600 text-sm mt-3">or drag and drop your video here</p>
                <p className="text-gray-500 text-xs mt-2">MP4, WebM, or Ogg (max 500MB)</p>
              </div>
              <input
                id="video-input"
                type="file"
                accept="video/*"
                onChange={(e) => handleFileSelect(e, 'video')}
                className="hidden"
              />
              {videoFile && (
                <p className="text-sm text-green-600 font-medium">✓ Video selected: {videoFile.name}</p>
              )}

              {uploadProgress !== 0 && <ProgressBar progress={uploadProgress}/>}
            </div>

            {/* Video Metadata */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Video Information</h3>
              
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter video title"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                    style={{ focusOutline: 'none', '--tw-ring-color': '#B6349A' } as React.CSSProperties}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #B6349A40'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                  <Edit2 size={18} style={{ color: '#B6349A' }} className="cursor-pointer" />
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <div className="flex gap-3">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your video content..."
                    rows={4}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#B6349A' } as React.CSSProperties}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #B6349A40'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                  <Edit2 size={18} style={{ color: '#B6349A' }} className="cursor-pointer mt-2" />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Add tags separated by commas"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#B6349A' } as React.CSSProperties}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #B6349A40'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                  <Edit2 size={18} style={{ color: '#B6349A' }} className="cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thumbnail</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition cursor-pointer bg-gray-50"
                onClick={() => document.getElementById('thumbnail-input')?.click()}>
                <button
                  className="px-4 py-2 rounded-full font-semibold text-white transition hover:shadow-lg text-sm"
                  style={{ backgroundColor: '#B6349A' }}
                >
                  Upload Thumbnail
                </button>
                <p className="text-gray-600 text-sm mt-2">Recommended: 1280x720</p>
              </div>
              <input
                id="thumbnail-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleThumbnailSelect(e, 'thumbnail')}
                className="hidden"
              />
              {thumbnail && (
                <p className="text-sm text-green-600 font-medium mt-3">✓ Thumbnail selected: {thumbnail.name}</p>
              )}
              {thumbnailUploadProgress !== 0 && <ProgressBar progress={thumbnailUploadProgress}/>}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center mb-4">
                <Play size={56} className="text-white" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm font-medium text-gray-900">0:00 / 0:00</span>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full" style={{ backgroundColor: '#B6349A40' }}>
                  <div className="h-full rounded-full w-1/3" style={{ backgroundColor: '#B6349A' }}></div>
                </div>
                <Edit2 size={16} style={{ color: '#B6349A' }} className="cursor-pointer" />
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <button
                onClick={() => toggleSection('visibility')}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-900">Visibility</h3>
                <ChevronDown
                  size={20}
                  style={{ color: '#B6349A' }}
                  className={`transition-transform ${expandedSection === 'visibility' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSection === 'visibility' && (
                <div className="mt-4 space-y-3">
                  {['Public', 'Private', 'Unlisted'].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="visibility"
                        value={option.toLowerCase()}
                        checked={visibility === option.toLowerCase()}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="w-4 h-4"
                        style={{ accentColor: '#B6349A' }}
                      />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Audience */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <button
                onClick={() => toggleSection('audience')}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-900">Audience</h3>
                <ChevronDown
                  size={20}
                  style={{ color: '#B6349A' }}
                  className={`transition-transform ${expandedSection === 'audience' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSection === 'audience' && (
                <div className="mt-4 space-y-3">
                  {['Playlist', 'Audience Selection'].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded"
                        style={{ accentColor: '#B6349A' }}
                      />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Publish Button */}
            <button
              onClick={()=>publishVideo()}
              className="w-full py-3 px-6 bg-primary rounded-full font-semibold text-white transition hover:shadow-lg transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!disabled}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}