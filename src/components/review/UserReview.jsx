import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../utils/utils";
import review from "../../../review.json";
import ReviewCard from "./ReviewCard";

const UserReview = () => {
  return (
    <div className="mx-10">
      <Carousel
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        transitionDuration={500}
        className="my-36"
      >
        {review.map((item) => (
          <ReviewCard
            key={item.id}
            comment={item.Comment}
            name={item.name}
            pic={item.pic}
            rating={item.rating}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default UserReview;
