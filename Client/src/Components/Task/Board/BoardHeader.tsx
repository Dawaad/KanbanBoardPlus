import React from "react";

interface IProps {
  code: string | undefined;
}

function BoardHeader({ code }: IProps) {
  return (
    <section className="h-[2.5rem]  flex items-center justify-center">
      <h1 className="text-xl font-bold">{code}</h1>
    </section>
  );
}

export default BoardHeader;
