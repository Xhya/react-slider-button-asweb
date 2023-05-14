import "./App.css";
import Slider from "./lib/components/slider/slider.component";
import neonImage from "./assets/neon.jpg"

function App() {
  function onSlide() {}
  return (
    <>
      <div className="app">
        <Slider
          content={"Slide pour découvrir"}
          contentAfterSlide={"Bienvenue !"}
          onSlide={onSlide}
          imageSrc={neonImage}
        />
      </div>
    </>
  );
}

export default App;
