import { NextPage } from "next";
import React from "react";

interface Props {
    title: string;
}

const PageTitle:NextPage<Props> = ({title}) => {
  return (
    <div className="flex pb-4 text-neutral-100">
      <span className="text-lg font-bold">{title.toUpperCase()}</span>
    </div>
  );
};

export default PageTitle;
