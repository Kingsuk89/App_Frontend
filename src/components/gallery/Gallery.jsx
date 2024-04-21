import Carousel from "react-multi-carousel";
import { responsive } from "../../utils/utils";
import GalleryCard from "./GalleryCard";
const pic = "/Hero.jpg";

const Gallery = () => {
  return (
    <div className="mx-10">
      <Carousel
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        transitionDuration={500}
        className="mb-36 pt-36"
      >
        {/* {review.map((item) => ( */}
        <GalleryCard pic={pic} />
        <GalleryCard pic={pic} />
        <GalleryCard pic={pic} />
        <GalleryCard pic={pic} />
        <GalleryCard pic={pic} />
        <GalleryCard pic={pic} />
        {/* ))} */}
      </Carousel>
    </div>
  );
};

export default Gallery;
