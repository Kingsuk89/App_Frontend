import React from "react";

import Banner from "../utils/Banner";
import Freebook from "../utils/Freebook";
import UserReview from "../review/UserReview";
import Map from "../map/Map";

function Home() {
  return (
    <React.Fragment>
      <Banner />
      <Freebook />
      <UserReview />
      <Map />
    </React.Fragment>
  );
}

export default Home;
