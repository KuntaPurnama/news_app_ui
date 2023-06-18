import * as React from "react";
import HeadlineNewsSectionComponent from "../../components/headline/HeadlineNewsSectionComponent";
import MostPopularSectionComponent from "../../components/most-popular/MostPopularSectionComponent";
import MostRecentSectionComponent from "../../components/most-recent/MostRecentSectionComponent";
import ThisWeekNewsSectionComponent from "../../components/this-week/ThisWeekNewsSectionComponent";
import MoreNewsSectionComponent from "../../components/more-news/MoreNewsSectionComponent";

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
