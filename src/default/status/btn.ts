export const statusBtnList = [
  "退勤",
  "出勤",
  "昼休憩入り",
  "昼休憩戻り",
  "残業入り",
  "残業終わり",
  "休憩入り",
  "休憩終わり"
];

export const statusBtnDisable = {
  "0": [true, false, true, true, false, true, true, true],
  "1": [false, true, false, true, true, true, true, true],
  "2": [true, true, true, false, true, true, true, true],
  "3": [false, true, true, true, true, true, true, true],
  "4": [true, true, true, true, true, false, false, true],
  "5": [true, false, true, true, true, true, true, true],
  "6": [true, true, true, true, true, true, true, false],
  "7": [true, true, true, true, true, false, true, true]
};
