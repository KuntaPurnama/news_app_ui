import * as React from "react";
import HeadlineNewsSectionComponent from "../components/landing-page/HeadlineNewsSectionComponent";
import MostPopularSectionComponent from "../components/landing-page/MostPopularSectionComponent";

const LandingPage = () => {
  return (
      <div>
        <HeadlineNewsSectionComponent/>
        <hr style={{border: '2px solid rgba(0,0,0,0.2)', marginTop:'30px'}}/>
        <MostPopularSectionComponent/>
      </div>
  )
};

export default LandingPage;
