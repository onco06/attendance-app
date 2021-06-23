import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import axios from "axios";

import { useMessage } from "../hooks/useMessage";
import { attendanceConverter } from "../hooks/attendanceConverter";
import { apiUrl } from "../default/api/apiDefault";
import { ProfileContext } from "../providers/ProfileProvider";
import { RecordOfAttendance } from "../types/api/attendance";
import { statusWord } from "../default/status/word";

type Props = {
  myAttendances: Array<RecordOfAttendance>;
  setMyAttendances: Dispatch<SetStateAction<Array<RecordOfAttendance>>>;
};

export const useChangeStatus = (props: Props) => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { showMessage } = useMessage();
  const { myAttendances, setMyAttendances } = props;
  const latestAttendance = myAttendances[0];

  const onClickStatusBtn = useCallback(
    (statusNum: string) => {
      if (statusNum === "1") {
        const nowDate = new Date();
        if (
          latestAttendance &&
          latestAttendance.date ===
            `${nowDate.getFullYear()}/${
              nowDate.getMonth() + 1
            }/${nowDate.getDate()}`
        ) {
          showMessage({
            title: "Warning: 本日の出勤は既に押しました",
            status: "warning"
          });
        } else {
          axios
            .post(
              `${apiUrl}api/myattendance/`,
              {},
              {
                headers: {
                  Authorization: `JWT ${localStorage.getItem("access")}`
                }
              }
            )
            .then((res) => {
              showMessage({
                title: "Info: 出勤を押しました",
                status: "info"
              });

              axios
                .patch(
                  `${apiUrl}api/status/${profile.statusId}/`,
                  { status: "1" },
                  {
                    headers: {
                      Authorization: `JWT ${localStorage.getItem("access")}`
                    }
                  }
                )
                .then(() => {
                  // profile　の変更
                  profile["status"] = "1";
                  setProfile(profile);
                  // myAttendances　の変更
                  // この順番だと上手くいく？？？なぜ？？？
                  const newItem = attendanceConverter(res.data);
                  setMyAttendances([newItem, ...myAttendances]);
                })
                .catch(() => {
                  showMessage({
                    title: "Error: Statusを変更できません",
                    status: "error"
                  });
                });
            })
            .catch(() => {
              showMessage({
                title: "Error: 勤怠表を作成できません",
                status: "error"
              });
            });
        }
      } else {
        let data = {};
        if (statusNum === "0") {
          data = { leaveWork: new Date() };
        } else if (statusNum === "2") {
          data = { lunchBreakStart: new Date() };
        } else if (statusNum === "3") {
          data = { lunchBreakEnd: new Date() };
        } else if (statusNum === "4") {
          data = { overtimeStart: new Date() };
        } else if (statusNum === "5") {
          data = { overtimeEnd: new Date() };
        } else if (statusNum === "6") {
          data = { restStart: new Date() };
        } else {
          data = { restEnd: new Date() };
        }
        axios
          .patch(`${apiUrl}api/myattendance/${latestAttendance.id}/`, data, {
            headers: {
              Authorization: `JWT ${localStorage.getItem("access")}`
            }
          })
          .then((res) => {
            showMessage({
              title: `Info: ${statusWord[statusNum]}を押しました`,
              status: "info"
            });

            axios
              .patch(
                `${apiUrl}api/status/${profile.statusId}/`,
                { status: statusNum },
                {
                  headers: {
                    Authorization: `JWT ${localStorage.getItem("access")}`
                  }
                }
              )
              .then(() => {
                // profile　の変更
                profile["status"] = statusNum;
                setProfile(profile);
                // myAttendances　の変更
                // この順番だと上手くいく？？？なぜ？？？
                const newItem = attendanceConverter(res.data);
                myAttendances[0] = newItem;
                setMyAttendances([...myAttendances]);
              })
              .catch(() => {
                showMessage({
                  title: "Error: Statusを変更できません",
                  status: "error"
                });
              });
          })
          .catch(() => {
            showMessage({
              title: `Error: ${statusWord[statusNum]}の変更ができません`,
              status: "error"
            });
          });
      }
    },
    [
      latestAttendance,
      myAttendances,
      setMyAttendances,
      profile,
      setProfile,
      showMessage
    ]
  );

  const onClickLeaveWork = useCallback(() => {
    const latestAttendance = myAttendances[0];
    axios
      .patch(
        `${apiUrl}api/myattendance/${latestAttendance.id}/`,
        { leaveWork: new Date() },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`
          }
        }
      )
      .then((res) => {
        showMessage({
          title: "Info: 退勤を押しました",
          status: "info"
        });

        axios
          .patch(
            `${apiUrl}api/status/${profile.statusId}/`,
            { status: "0" },
            {
              headers: {
                Authorization: `JWT ${localStorage.getItem("access")}`
              }
            }
          )
          .then(() => {
            // profile　の変更
            profile["status"] = "0";
            setProfile(profile);
            // myAttendances　の変更
            // この順番だと上手くいく？？？なぜ？？？
            const newItem = attendanceConverter(res.data);
            myAttendances[0] = newItem;
            setMyAttendances([...myAttendances]);
          })
          .catch(() => {
            showMessage({
              title: "Error: Statusを変更できません",
              status: "error"
            });
          });
      })
      .catch(() => {
        showMessage({
          title: "Error: 退勤の変更ができません",
          status: "error"
        });
      });
  }, [showMessage, myAttendances, setMyAttendances, profile, setProfile]);

  const onClickCommuting = useCallback(() => {
    axios
      .post(
        `${apiUrl}api/myattendance/`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`
          }
        }
      )
      .then((res) => {
        showMessage({
          title: "Info: 出勤を押しました",
          status: "info"
        });

        axios
          .patch(
            `${apiUrl}api/status/${profile.statusId}/`,
            { status: "1" },
            {
              headers: {
                Authorization: `JWT ${localStorage.getItem("access")}`
              }
            }
          )
          .then(() => {
            // profile　の変更
            profile["status"] = "1";
            setProfile(profile);
            // myAttendances　の変更
            // この順番だと上手くいく？？？なぜ？？？
            const newItem = attendanceConverter(res.data);
            setMyAttendances([newItem, ...myAttendances]);
          })
          .catch(() => {
            showMessage({
              title: "Error: Statusを変更できません",
              status: "error"
            });
          });
      })
      .catch(() => {
        showMessage({
          title: "Error: 勤怠表を作成できません",
          status: "error"
        });
      });
  }, [showMessage, myAttendances, setMyAttendances, profile, setProfile]);

  return { onClickStatusBtn };
};
