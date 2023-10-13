import Carousel from "react-bootstrap/Carousel";
import { ReactComponent as HomeIcon } from "../icons/home.svg";

function Banner() {
  return (
    // svg 파일을 보면 viewbox 라는게 있는데 viewbox = x좌표 , y좌표 , width , heigth
    // svg 파일에 width와 height를 주면 이것이 프레임이 됨
    <Carousel data-bs-theme="dark">
      <Carousel.Item interval={1000} as="div">
        <HomeIcon text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <HomeIcon text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <HomeIcon text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
