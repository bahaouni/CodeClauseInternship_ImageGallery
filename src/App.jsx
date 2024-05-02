import React, { useState } from 'react';
import data from './data.json';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    
    setSelectedTag(null);
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const filteredImages = data.filter((image) => {
    if (selectedCategory && image.category !== selectedCategory) {
      return false;
    }
    if (selectedTag && !image.tags.includes(selectedTag)) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="flex justify-center">
        <h2 className="font-bold text-3xl">Image Gallery</h2>
      </div>

    
      <div className="flex justify-center mt-3 space-x-4">
       
        <div>
          <label className="text-white">Filter by Category:</label>
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory || ''}
            className="ml-2 p-1 rounded"
          >
            <option value="">All</option>
            {Array.from(new Set(data.map((image) => image.category))).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

      
        <div>
          <label className="text-white">Filter by Tag:</label>
          <select
            onChange={(e) => handleTagChange(e.target.value)}
            value={selectedTag || ''}
            className="ml-2 p-1 rounded"
          >
            <option value="">All</option>
            {Array.from(new Set(data.flatMap((image) => image.tags))).map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

     
      <div className="mt-5">
        <div className="flex flex-wrap justify-center gap-3">
          {filteredImages.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                className="hover:scale-105 duration-150 rounded-xl"
              />
              <p className="text-white font-normal">Category: {image.category}</p>
              <p className="text-white font-normal">Tags: {image.tags.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
