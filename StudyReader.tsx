import React, { useState } from 'react';
import { SYLLABUS_MODULES } from '../constants';
import { SubjectModule } from '../types';

const StudyReader: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<SubjectModule | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  // Simulation of Offline Storage
  const [offlineTopics, setOfflineTopics] = useState<string[]>([]);
  
  // Progress States
  const [downloadingIds, setDownloadingIds] = useState<string[]>([]);
  const [bulkProgress, setBulkProgress] = useState<number | null>(null);

  const toggleDownload = (topicId: string) => {
    if (offlineTopics.includes(topicId)) {
      // Delete is instant
      setOfflineTopics(prev => prev.filter(id => id !== topicId));
    } else {
      // Simulate Download Delay
      setDownloadingIds(prev => [...prev, topicId]);
      
      setTimeout(() => {
        setOfflineTopics(prev => [...prev, topicId]);
        setDownloadingIds(prev => prev.filter(id => id !== topicId));
      }, 1500); // 1.5s simulated download
    }
  };

  const handleDownloadAll = async () => {
    if (!selectedModule) return;
    
    const topicsToDownload = selectedModule.topics.filter(t => !offlineTopics.includes(t.id));
    if (topicsToDownload.length === 0) return;

    setBulkProgress(0);

    // Simulate bulk download with progress bar
    const total = topicsToDownload.length;
    for (let i = 0; i < total; i++) {
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms per file
      setBulkProgress(Math.round(((i + 1) / total) * 100));
    }

    const newIds = topicsToDownload.map(t => t.id);
    setOfflineTopics(prev => [...prev, ...newIds]);
    setBulkProgress(null);
  };

  if (!selectedModule) {
    return (
      <div className="p-4 grid gap-4">
        <h2 className="text-xl font-bold mb-2 text-white">Syllabus & Reader</h2>
        {SYLLABUS_MODULES.map(mod => (
          <div 
            key={mod.id} 
            onClick={() => setSelectedModule(mod)}
            className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between hover:bg-slate-750 cursor-pointer transition"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${mod.color}`}>
                <i className={`${mod.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="font-bold text-slate-200">{mod.id}</h3>
                <p className="text-xs text-slate-500">{mod.topics.length} Topics • Click to Read</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-600"></i>
          </div>
        ))}
      </div>
    );
  }

  const activeTopic = selectedModule.topics.find(t => t.id === activeTopicId);

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Reader Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center space-x-4 sticky top-0 z-10">
        <button onClick={() => { setSelectedModule(null); setActiveTopicId(null); }} className="text-slate-400 hover:text-white">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <div className="flex-1 overflow-hidden">
          <h2 className="font-bold text-white text-sm truncate">{selectedModule.id}</h2>
          <p className="text-xs text-slate-500 truncate">{activeTopic ? activeTopic.title : 'Select a topic'}</p>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          {!activeTopicId && (
            <button 
              onClick={handleDownloadAll}
              disabled={bulkProgress !== null}
              className={`bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center transition-all ${bulkProgress !== null ? 'w-32 justify-center' : ''}`}
            >
              {bulkProgress !== null ? (
                <div className="flex items-center space-x-2 w-full">
                  <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${bulkProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px]">{bulkProgress}%</span>
                </div>
              ) : (
                <>
                  <i className="fa-solid fa-download mr-2"></i> Save All
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Topic List (Sidebar on desktop, full on mobile if no topic selected) */}
        <div className={`w-full md:w-1/3 bg-slate-900 overflow-y-auto border-r border-slate-800 ${activeTopicId ? 'hidden md:block' : 'block'}`}>
          {selectedModule.topics.map(topic => {
             const isDownloading = downloadingIds.includes(topic.id);
             const isDownloaded = offlineTopics.includes(topic.id);

             return (
              <div 
                key={topic.id}
                onClick={() => !isDownloading && setActiveTopicId(topic.id)}
                className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800 transition ${activeTopicId === topic.id ? 'bg-slate-800' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-sm font-medium ${activeTopicId === topic.id ? 'text-blue-400' : 'text-slate-300'}`}>
                    {topic.title}
                  </h3>
                  
                  {/* Status Icon */}
                  <div className="ml-2">
                    {isDownloading ? (
                      <i className="fa-solid fa-circle-notch fa-spin text-blue-500 text-xs"></i>
                    ) : isDownloaded ? (
                      <i className="fa-solid fa-circle-check text-green-500 text-xs"></i>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content View */}
        <div className={`w-full md:w-2/3 bg-slate-800 overflow-y-auto p-6 ${activeTopicId ? 'block' : 'hidden md:flex md:items-center md:justify-center'}`}>
          {activeTopic ? (
            <div className="max-w-prose mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">{activeTopic.title}</h1>
                <button 
                  onClick={() => toggleDownload(activeTopic.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                    offlineTopics.includes(activeTopic.id) ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                  disabled={downloadingIds.includes(activeTopic.id)}
                  title={offlineTopics.includes(activeTopic.id) ? "Downloaded" : "Download to Offline"}
                >
                  {downloadingIds.includes(activeTopic.id) ? (
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                  ) : offlineTopics.includes(activeTopic.id) ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <i className="fa-solid fa-download"></i>
                  )}
                </button>
              </div>
              <div 
                className="prose prose-invert prose-slate"
                dangerouslySetInnerHTML={{ __html: activeTopic.content }} 
              />
            </div>
          ) : (
             <div className="text-slate-500 text-center">
               <i className="fa-solid fa-book-open text-4xl mb-3 opacity-30"></i>
               <p>Select a topic to start reading</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyReader;