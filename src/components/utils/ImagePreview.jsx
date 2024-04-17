import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ImagePreview = memo(({ onClick, file }) => {
  const [imgSrc, setImgSrc] = useState("../../../Default_avatar.jpg");

  useEffect(() => {
    if (file && file[0]) {
      const imgUrl = URL.createObjectURL(file[0]);
      if (imgUrl !== imgSrc) {
        setImgSrc(imgUrl);
      }
    }
  }, [file, imgSrc]);

  return (
    <div className="flex justify-center items-center mb-3">
      <img
        src={imgSrc}
        alt="Preview"
        className="h-14 w-14 cursor-pointer rounded-full"
        onClick={onClick}
      />
    </div>
  );
});

ImagePreview.displayName = "ImagePreview";

ImagePreview.propTypes = {
  onClick: PropTypes.func.isRequired,
  file: PropTypes.arrayOf(PropTypes.object),
};

export default ImagePreview;
