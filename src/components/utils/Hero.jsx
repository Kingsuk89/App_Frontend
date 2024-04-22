const Hero = () => {
  return (
    <div
      rel="preload"
      loading="lazy"
      className="md:bg-[url('/Hero.webp')] text-black h-[500px] bg-no-repeat bg-cover bg-center bg-fixed bg-[url('/Mobile_Hero.webp')] overflow-hidden"
    />
  );
};

export default Hero;
