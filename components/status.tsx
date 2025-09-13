import React from "react";

type Props = {
  status: "WAITING" | "DONE";
};

const StatusComponent = ({ status }: Props) => {
  const colors = {
    WAITING: {
      border: "#9E9100",
      background: "#FEF9C2",
      text: "#938700",
    },
    DONE: {
      border: "#019A55",
      background: "#E0FFF1",
      text: "#019A55",
    },
  };

  return (
    <div
      className="w-28 h-9 flex items-center justify-center border-[0.42px] rounded-[4.25px]"
      style={{
        backgroundColor: colors[status].background,
        borderColor: colors[status].border,
      }}
    >
      <p
        className="font-semibold text-sm first-letter:uppercase"
        style={{
          color: colors[status].text,
        }}
      >
        {status.toLowerCase()}
      </p>
    </div>
  );
};

export default StatusComponent;
