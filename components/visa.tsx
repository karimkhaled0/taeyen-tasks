"use client";
import { Card, CardFooter, CardBody, CardHeader, Divider } from "@heroui/react";
import UserDetailsComponent from "./user-details";
import React, { useState } from "react";
import JobDetailsComponent from "./job-details";
import FileUploadComponent, { UploadedFile } from "./file-upload";
import StatusComponent from "./status";

const VisaComponent = () => {
  const [ticket, setTicket] = useState<UploadedFile | null>(null);
  const [visa, setVisa] = useState<UploadedFile | null>(null);

  return (
    <Card className="w-full max-w-[500px] min-w-0 font-cairo px-3 sm:px-4">
      <CardHeader className="flex flex-col sm:flex-row gap-3 sm:justify-between items-start sm:items-center">
        <UserDetailsComponent
          image="/person.jpg"
          name="Ahmed Nasr Mohammed"
          job="Driver"
        />
        <StatusComponent status={ticket && visa ? "DONE" : "WAITING"} />
      </CardHeader>
      <Divider className="opacity-60 bg-[#B4B4B4]" />
      <CardBody>
        <JobDetailsComponent
          currentLocation="Philippines"
          jobOffer="1200"
          age="32 years"
        />
      </CardBody>
      <Divider className="opacity-60 bg-[#B4B4B4]" />
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <FileUploadComponent
          title="Upload Ticket"
          uploadedFile={ticket}
          setUploadedFile={setTicket}
        />
        <FileUploadComponent
          title="Upload Visa"
          uploadedFile={visa}
          setUploadedFile={setVisa}
        />
      </CardFooter>
    </Card>
  );
};

export default VisaComponent;
