import classNames from "classnames";
import React from "react";

export default function Input({ error, ...props }) {
  return (
    <input
      type="text"
      className={classNames("border p-2 rounded-lg", {
        "border-red-600": error,
        "border-gray-300": !error,
      })}
      {...props}
    />
  );
}
