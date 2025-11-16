import React from "react";

const PageLoader = () => {
  return (
    <div className="w-20 h-20 relative mx-auto">
      <div className="absolute inset-0 rounded-full border-4 border-(--primary) border-t-transparent animate-spin"></div>
    </div>
  );
};

export default PageLoader;
