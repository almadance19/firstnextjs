import { useEffect, useRef } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState } from "react";

const UploadWidget = ({ onParameterChange }) => {
  const { data: session } = useSession();
  const SessionID = session?.user.id ;
  const cloudinaryRef = useRef();
  const [childData, setChildData] = useState(null);


  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'daoqznkat',
      uploadPreset: 'ameuxyn1',
      maxImageFileSize: 2000000,
      multiple: false,
      cropping: true,
      croppingAspectRatio: 1,
      croppingShowDimensions: true,
      folder: 'my_ticket',
      //publicId: SessionID,

    }, function(error, result) {

      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info.public_id);
        // Call the callback function in the parent component
        setChildData(result.info.public_id);
        if (typeof onParameterChange === 'function') {
          // Call the callback function in the parent component
          onParameterChange(result.info.public_id);
        } else {
          console.error('onParameterChange is not a function');
        }
      }

    });
  }, [onParameterChange]);




  const widgetRef = useRef();

  return (
    <div>
      <button className='btn btn-success' onClick={() => widgetRef.current.open()}>
        Upload
      </button>
      {/* <div className='primary-content py-4 my-2'>
        <p id="event_image" name="event_image" value={childData} className='desc text-left'>
          {childData}
        </p>
       </div> */}
    </div>
  );

};


export default UploadWidget;
