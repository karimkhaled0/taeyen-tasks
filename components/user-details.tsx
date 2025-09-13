import { Avatar } from "@heroui/react";
import React from "react";

type Props = {
  image?: string;
  name?: string;
  job?: string;
};

const UserDetailsComponent = ({
  image = "/person.jpg",
  name = "Ahmed Nasr Mohammed",
  job = "Driver",
}: Props) => {
  return (
    <div className="flex items-center gap-2 font-cairo">
      <Avatar radius="sm" size="lg" src={image} />
      <div className="flex flex-col">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm text-[#162F61] opacity-50 font-semibold">{job}</p>
      </div>
    </div>
  );
};

export default UserDetailsComponent;
