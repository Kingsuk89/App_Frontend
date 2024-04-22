import Carousel from "react-multi-carousel";
import { responsive } from "../../utils/utils";
import GalleryCard from "./GalleryCard";
// const pic = "/Hero.jpg";

const Gallery = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Carousel
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        transitionDuration={500}
        className=""
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
