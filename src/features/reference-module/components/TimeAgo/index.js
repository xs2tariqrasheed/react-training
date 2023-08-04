import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
require("dayjs/locale/en"); // Import the locale you want to use
dayjs.locale("en"); // Set the locale for Day.js

function TimeAgo({ timestamp }) {
  
  const pastDate = dayjs(timestamp);
  const timeAgo = pastDate.fromNow();

  return <span>{timeAgo}</span>;
}

export default TimeAgo;
