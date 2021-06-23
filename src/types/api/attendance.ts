export type RecordOfAttendance = {
  id: number;
  user: string;
  leaveWork: string;
  commuting: string;
  lunchBreakStart: string;
  lunchBreakEnd: string;
  overtimeStart: string;
  overtimeEnd: string;
  restStart: string;
  restEnd: string;
  date?: string;
};
