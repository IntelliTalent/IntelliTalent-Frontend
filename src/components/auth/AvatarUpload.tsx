import { Avatar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import noAvatar from "../../assets/images/no-avatar.jpg";

export default function AvatarUpload({
  photo,
  setPhoto,
}: {
  photo?: string;
  setPhoto: Function;
}) {
  const [selectedFile, setSelectedFile] = useState("");

  const handleUploadClick = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setPhoto(file);
    }
  };

  useEffect(() => {
    if (photo) {
      setSelectedFile(photo);
    }
  }, [photo]);

  return (
    <div>
      <input
        accept="image/*"
        id="upload-avatar-pic"
        onChange={handleUploadClick}
        type="file"
        hidden
      />
      <label htmlFor="upload-avatar-pic">
        <IconButton component="span">
          <Avatar
            alt="beshoy"
            src={selectedFile === "" ? noAvatar : selectedFile}
            sx={{
              width: 120,
              height: 120,
              border: "2px solid gray",
              mx: "auto",
            }}
          />
        </IconButton>
      </label>
    </div>
  );
}
