import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { storage } from "../../firebase";

const UploadMusic = ({ openUploadBar, setOpenUploadBar}: {openUploadBar: boolean, setOpenUploadBar: any}) => {

    const [musicFile, setMusicFile] = useState<File | null | any>(null);
    const [fileLoading, setFileLoading] = useState(false);
    const [downloadURL, setDownloadURL] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);




    const handleUploadMusic = (e : any) => {
        e.preventDefault();

        setFileLoading(true);

    if (!musicFile) {
      alert("No file selected");
      setFileLoading(false);
      return;
    }

    const fileRef = ref(storage, `files/${musicFile.name}`);
    const uploadTask = uploadBytesResumable(fileRef, musicFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading", error);
        alert(`Error: ${error.message}`)
        setFileLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
          setFileLoading(false);
          alert("File is uploaded");
        });
        console.log(downloadURL);
      }

      
    );

    }

  return (
    <>
    {openUploadBar && (
        <div className="h-screen absolute left-0 right-0 z-50
    flex justify-center items-center">
      <div
        className="bg-white/75 w-screen
    max-w-sm mx-auto h-[50vh] rounded-xl text-center"
      >
        <h1 className="text-3xl my-4">upload music</h1>

        <input type="file" accept="audio/*" onChange={(e: any) => setMusicFile(e.target.files[0])} />

        <button onClick={handleUploadMusic}
        className="bg-orange-500 text-white p-2"
        >
            {fileLoading ? <Loader2 className="animate-spin"/> : "Upload"}
        </button>

        <p className="">{downloadURL}</p>

        <button onClick={() => setOpenUploadBar(false)}
        className="bg-red-500 text-white p-2 my-4">
            close
        </button>
      </div>
    </div>
    )}
    </>
  );
};

export default UploadMusic;
