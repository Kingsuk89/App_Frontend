import PropTypes from "prop-types";
import React from "react";

const GalleryCard = ({ pic }) => {
  return (
    <div className="md:w-[330px] lg:w-[384px] h-[400px] border bg-black dark:border-white rounded-xl bg-transparent backdrop-brightness-110 backdrop-blur-[100px]">
      <div className="flex items-center gap-3 w-full h-full">
        <img
          src={pic}
          alt="image"
          className="w-full h-full bg-cover rounded-md"
          loading="lazy"
          property="high"
        />
      </div>
    </div>
  );
};

GalleryCard.propTypes = {
  pic: PropTypes.string,
};

export default GalleryCard;
