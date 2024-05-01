import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadOnCloudinar = async (localFilePath) =>{
    try {
        if(!localFilePath) return null 
        //Upload file path
       const response= await cloudinary.uploader.upload(localFilePath,{
           resource_type:"auto"
        })
        //File uploaded successfully
        console.log("File uploaded successfully" , response.url);
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath)  //remove the locally stored temp file as the operation got failed.
        return null
        
    }

}


export {uploadOnCloudinar}