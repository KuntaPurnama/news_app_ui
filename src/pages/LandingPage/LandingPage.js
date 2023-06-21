import * as React from "react";
import HeadlineNewsSectionComponent from "../../components/headline/HeadlineNewsSectionComponent";
import MostPopularSectionComponent from "../../components/most-popular/MostPopularSectionComponent";
import MostRecentSectionComponent from "../../components/most-recent/MostRecentSectionComponent";
import ThisWeekNewsSectionComponent from "../../components/this-week/ThisWeekNewsSectionComponent";
import MoreNewsSectionComponent from "../../components/more-news/MoreNewsSectionComponent";

const LandingPage = () => {
  const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('resize', checkMobileView)

        return () => {
            window.removeEventListener('resize', checkMobileView)
        }
    }, []);


    const checkMobileView = () => {
        setIsMobile(window.innerWidth <= 800);
    }

  return (
      <div>
        <HeadlineNewsSectionComponent isMobile={isMobile}/>
        <hr style={{border: '2px solid rgba(0,0,0,0.2)', marginTop:'30px'}}/>
        <MostPopularSectionComponent isMobile={isMobile}/>
        <MostRecentSectionComponent isMobile={isMobile}/>
        <ThisWeekNewsSectionComponent isMobile={isMobile}/>
        <MoreNewsSectionComponent isMobile={isMobile}/>
      </div>
  )
};

export default LandingPage;
