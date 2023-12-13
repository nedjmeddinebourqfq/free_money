import React, { useRef } from "react";
import OwlCardSlider from "../cmp/Owl";
import { productData } from "../data";

const Test = () => {
  const firstSliderRef = useRef(null);

  const handleFirstSliderChanged = (event) => {
    const secondSlider = firstSliderRef.current;
    if (secondSlider) {
      secondSlider.goTo(event.item.index); // Set the active item of the second slider
    }
  };
  return (
    <div>
      <OwlCardSlider
        ref={firstSliderRef}
        items={productData}
        maxCard={6}
        showNav={true}
        onChanged={handleFirstSliderChanged}
      />
      <OwlCardSlider items={productData} maxCard={6} showNav={false} />
    </div>
  );
};

export default Test;
