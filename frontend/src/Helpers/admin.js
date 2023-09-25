// import { useState } from 'react'
// import avatar from '../assets/avatar.png'
// import '../App.css'
// import axios from 'axios';

// // const url = "https://aais-kitchen-backend.onrender.com/api/product/648841311071d14111a4d624"

// function Admin() {

//   const [postImage, setPostImage] = useState( { myFile : ""})

//   const createPost = async (newImage) => {
//     try{
//       await axios.patch(url, {imgUrl : newImage.myFile})
//     }catch(error){
//       console.log(error)
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createPost(postImage)
//     console.log("Uploaded")
//   }

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     const base64 = await convertToBase64(file);
//     // console.log(base64)
//     setPostImage({ ...postImage, myFile : base64 })
//   }

//   return (

//     <div className="App">
//       <form onSubmit={handleSubmit}>

//         <label htmlFor="file-upload" className='custom-file-upload'>
//           <img src={postImage.myFile || avatar } alt="" className='w-48 h-48' />
//         </label>

//         <input
//           type="file"
//           lable="Image"
//           name="myFile"
//           id='file-upload'
//           accept='.jpeg, .png, .jpg'
//           onChange={(e) => handleFileUpload(e)}
//          />

//          <h3>Doris Wilder</h3>
//          <span>Designer</span>

//          <button type='submit'>Submit</button>
//       </form>
//     </div>
//   )
// }

// export default Admin

// function convertToBase64(file){
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result)
//     };
//     fileReader.onerror = (error) => {
//       reject(error)
//     }
//   })
// }
