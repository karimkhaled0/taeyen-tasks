import React from "react";

type Props = {
  currentLocation?: string;
  jobOffer?: string;
  age?: string;
};

const JobDetailsComponent = ({
  currentLocation = "Philippines",
  jobOffer = "1200",
  age = "32 years",
}: Props) => {
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold">Current location</p>
        <p className="text-sm text-[#162F61] opacity-50 font-semibold">
          {currentLocation}
        </p>
      </div>
      <div className="flex flex-col justify-self-center gap-1">
        <p className="text-sm font-bold">Job Offer</p>
        <p className="text-sm text-[#162F61] opacity-50 font-semibold">
          {jobOffer}
        </p>
      </div>
      <div className="flex flex-col justify-self-end gap-1">
        <p className="text-sm font-bold">Age</p>
        <p className="text-sm text-[#162F61] opacity-50 font-semibold">{age}</p>
      </div>
    </div>
  );
};

export default JobDetailsComponent;
