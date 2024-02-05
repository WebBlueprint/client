//LessonMain.jsx
import React, { useState } from "react";
import Side from "./Side";
import LessonsHeader from "./LessonsHeader";

const LessonsMain = () => {
  const [isPro, setIsPro] = useState(true);

  const handleTabClick = (tabName) => {
    // Your tab click logic here
  };

  return (
    <div>
      <LessonsHeader isPro={isPro} />
      <Side onTabClick={handleTabClick} isPro={isPro} />
      {/* Add the rest of your LessonsMain content here */}
    </div>
  );
};

export default LessonsMain;
