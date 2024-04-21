import React from "react";

import UserReview from "../review/UserReview";
import Map from "../map/Map";
import Contact from "../contact/Contact";
import Hero from "../utils/Hero";

function Home() {
  return (
    <React.Fragment>
      <Hero />
      <UserReview />
      <Contact />
      <Map />
    </React.Fragment>
  );
}

export default Home;
