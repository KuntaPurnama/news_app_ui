import * as React from "react";
import HeadlineNewsSectionComponent from "../components/landing-page/HeadlineNewsSectionComponent";
import MostPopularSectionComponent from "../components/landing-page/MostPopularSectionComponent";
import MostRecentSectionComponent from "../components/landing-page/MostRecentSectionComponent";
import ThisWeekNewsSectionComponent from "../components/landing-page/ThisWeekNewsSectionComponent";
import MoreNewsSectionComponent from "../components/landing-page/MoreNewsSectionComponent";

const LandingPage = () => {
  return (
      <div>
        <HeadlineNewsSectionComponent/>
        <hr style={{border: '2px solid rgba(0,0,0,0.2)', marginTop:'30px'}}/>
        <MostPopularSectionComponent/>
        <MostRecentSectionComponent/>
        <ThisWeekNewsSectionComponent/>
        <MoreNewsSectionComponent/>
      </div>
  )
};

export default LandingPage;
