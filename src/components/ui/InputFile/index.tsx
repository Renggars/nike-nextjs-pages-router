import React, { Dispatch, SetStateAction } from "react";

type PropsType = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

const InputFile = (props: PropsType) => {
  const { uploadedImage, name, setUploadedImage } = props;
  return (
    <div className="mt-2 w-full">
      <label
        htmlFor={name}
        className="bg-gray-100 flex flex-col justify-center items-center gap-3 p-3 cursor-pointer rounded-lg"
      >
        {uploadedImage?.name ? (
          <p>{uploadedImage.name}</p>
        ) : (
          <>
            <p className="text-center text-sm">
              Upload new image, Larger image will be resized automatically
            </p>
            <p className="text-center text-sm ">
              Maximum upload size is <b>1 MB</b>
            </p>
          </>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
        className="opacity-0 absolute -z-10"
      />
    </div>
  );
};

export default InputFile;
