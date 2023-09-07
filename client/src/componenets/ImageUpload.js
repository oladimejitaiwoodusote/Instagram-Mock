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

    const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);
    
    fetch('/image_upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.message){
        console.log('Image uploaded successfully.');
      } else {
        console.error('Error from server:', data.message);
      }
    })
    .catch(err => {
      console.error('There was an error uploading the image:', err);
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image" onChange={handleImageChange}/>
      <input type="text" placeholder='Add a caption' value={caption} onChange={handleCaptionChange}/>
      <button type="submit">Upload</button>
    </form>
  )
}

export default ImageUpload