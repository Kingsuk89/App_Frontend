import Carousel from "react-multi-carousel";
import { responsive } from "../../utils/utils";
import GalleryCard from "./GalleryCard";
const pic = "/Hero.jpg";

const Gallery = () => {
  return (
    <div className="mx-10 w-screen h-screen">
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
        <GalleryCard pic={`https://source.unsplash.com/random/200x200?sig=2`} />
        <GalleryCard pic={`https://source.unsplash.com/random/200x200?sig=3`} />
        <GalleryCard pic={`https://source.unsplash.com/random/200x200?sig=4`} />
        <GalleryCard pic={`https://source.unsplash.com/random/200x200?sig=5`} />
        <GalleryCard pic={`https://source.unsplash.com/random/200x200?sig=1`} />
        <GalleryCard pic={`https://source.unsplash.com/random/200x200?sig=6`} />
        {/* ))} */}
      </Carousel>
    </div>
  );
};

export default Gallery;
