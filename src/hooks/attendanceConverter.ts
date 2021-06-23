import { RecordOfAttendance } from "../types/api/attendance";

export const attendanceConverter = (attendance: RecordOfAttendance) => {
  const date = new Date(attendance.commuting).toLocaleString().split(" ")[0];

  for (let key in attendance) {
    if (key === "id" || key === "user") {
      continue;
    }
    if (attendance[key] !== null) {
      attendance[key] = new Date(attendance[key])
        .toLocaleString()
        .split(" ")[1];
    }
  }
  attendance["date"] = date;
  return attendance;
};
