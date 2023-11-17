import {useState, useRef} from 'react'
import './ImageUpload.css'
 
function ImageUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("")

  const fileInputRef = useRef(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  function handleCaptionChange(e){
    setCaption(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault();

    const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);
    
    fetch('http://localhost:5555/image_upload', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Image uploaded successfully'){
        alert('Image uploaded succesfully');
        setImage(null)
        setCaption("")

        if (fileInputRef.current){
          fileInputRef.current.value = ""
        }

      } else {
        console.error('Error from server:', data.message);
      }
    })
    .catch(err => {
      console.error('There was an error uploading the image:', err);
    })
  };
  return (
    <form className="ImageUpload_form" onSubmit={handleSubmit}>
      <input ref={fileInputRef} className="ImageUpload_file" type="file" accept="image" onChange={handleImageChange}/>
      <input className="ImageUpload_text" type="text" placeholder='Add a caption' value={caption} onChange={handleCaptionChange}/>
      <button className="ImageUpload_button" type="submit">Upload</button>
    </form>
  )
}

export default ImageUpload