import PropTypes from "prop-types";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const ReviewCard = ({ pic, rating, name, comment }) => {
  return (
    <div className="md:w-[330px] lg:w-[384px] h-[400px] border bg-black dark:border-white rounded-xl bg-transparent backdrop-brightness-110 backdrop-blur-[100px]">
      <div className="flex items-center mx-5 my-10 gap-3">
        <img
          src={pic}
          alt={name}
          className="rounded-full"
          loading="lazy"
          width="30"
          height="30"
        />
        <p className="text-white capitalize">{name}</p>
      </div>
      <div className="mx-5 mb-5">
        <Rating value={rating} readOnly style={{ maxWidth: 100 }} />
      </div>
      <div className="px-5">{comment}</div>
    </div>
  );
};

ReviewCard.propTypes = {
  pic: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default ReviewCard;
