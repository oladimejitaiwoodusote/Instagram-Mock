import {useState} from 'react'
 
function ImageUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("")

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  function handleCaptionChange(e){
    setCaption(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault();

    
  }

  
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image" onChange={handleImageChange}/>
      <input type="text" placeholder='"Add a caption' value={caption} onChange={handleCaptionChange}/>
      <button type="submit">Upload</button>
    </form>
  )
}

export default ImageUpload