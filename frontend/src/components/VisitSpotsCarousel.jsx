import Carousel from "react-multi-carousel";
import VisitCard from "./VisitCard";
import "react-multi-carousel/lib/styles.css";

export default function VisitCarousel({visits}) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
}

const visitsCarouselList = visits.map((visit) => {
  return <VisitCard className="carousel__spotCard" visit={visit} key={visit.id} />
});

return(
<Carousel
  swipeable={true}
  draggable={true}
  arrows={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  sliderClass='react-multi-carousel-track'
>
  { visitsCarouselList }
  {visitsCarouselList.length === 0 && <p className='sideBar__error'>No search results found</p>}
</Carousel>
)

};
