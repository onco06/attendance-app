import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { apiUrl } from "../default/api/apiDefault";
import { ProfileContext } from "../providers/ProfileProvider";
import { useMessage } from "./useMessage";
import { Profile } from "../types/api/profile";
import { RecordOfAttendance } from "../types/api/attendance";
import { attendancesConverter } from "./attendancesConverter";

type Token = {
  access: string;
};

export const useHomeItem = () => {
  // gloablComponent でLoginUser情報を管理
  const { setProfile } = useContext(ProfileContext);
  const history = useHistory();
  const { showMessage } = useMessage();

  const [myAttendances, setMyAttendances] = useState<Array<RecordOfAttendance>>(
    []
  );

  const getHomeItem = useCallback(async () => {
    const formDataAccess = new FormData();
    const formDataRefresh = new FormData();
    if (localStorage.getItem("access")) {
      formDataAccess.append("token", localStorage.getItem("access"));
      formDataRefresh.append("refresh", localStorage.getItem("refresh"));
      // verify 有効かチェック 無効なら
      try {
        await axios.post(`${apiUrl}auth/jwt/verify/`, formDataAccess);
        showMessage({ title: "accessは有効です", status: "success" });
        console.log(`access is OK ${Date.now()}`);
        // token有効だから、Profileを取得する
        try {
          let res = await axios.get<Array<Profile>>(`${apiUrl}api/myprofile/`, {
            headers: {
              Authorization: `JWT ${localStorage.getItem("access")}`
            }
          });
          // setLoginUser
          setProfile(res.data[0]);
          console.log(`get Profile ${Date.now()}`);
        } catch {
          alert("Profileが見つからない");
          console.log("dont get Profile");
        }
        // token有効だから、myAttendanceを取得する
        try {
          let res = await axios.get<Array<RecordOfAttendance>>(
            `${apiUrl}api/myattendance/`,
            {
              headers: {
                Authorization: `JWT ${localStorage.getItem("access")}`
              }
            }
          );
          // setLoginUser
          // setMyAttendancesの前にデータを変換させたい
          let newData = attendancesConverter(res.data);
          setMyAttendances(newData);
          console.log(`get attendances ${Date.now()}`);
        } catch {
          alert("Attendancesが見つからない");
          console.log("dont get attandances");
        }
      } catch (err) {
        showMessage({
          title: "accessは無効なので、refreshを試みます",
          status: "warning"
        });
        console.log(`try refresh ${Date.now()}`);
        try {
          let res = await axios.post<Token>(
            `${apiUrl}auth/jwt/refresh/`,
            formDataRefresh
          );
          showMessage({
            title: "refreshに成功。accessの上書きを行います",
            status: "info"
          });
          localStorage.setItem("access", res.data.access);
          console.log(`refresh OK ${Date.now()}`);
          // token有効だから、Profileを取得する
          try {
            let res = await axios.get<Array<Profile>>(
              `${apiUrl}api/myprofile/`,
              {
                headers: {
                  Authorization: `JWT ${localStorage.getItem("access")}`
                }
              }
            );
            // setLoginUser
            setProfile(res.data[0]);
            console.log(`get Profile ${Date.now()}`);
          } catch {
            alert("Profileが見つからない");
            console.log("dont get Profile");
          }
          // token有効だから、myAttendanceを取得する
          try {
            let res = await axios.get<Array<RecordOfAttendance>>(
              `${apiUrl}api/myattendance/`,
              {
                headers: {
                  Authorization: `JWT ${localStorage.getItem("access")}`
                }
              }
            );
            // setLoginUser
            let newData = attendancesConverter(res.data);
            setMyAttendances(newData);
            console.log(`get attendances ${Date.now()}`);
          } catch {
            alert("Attendancesが見つからない");
            console.log("dont get attandances");
          }
        } catch {
          showMessage({
            title: "refreshができません。ログインし直してください",
            status: "error"
          });
          history.push("/");
          console.log("access token none");
        }
      }
    } else {
      showMessage({
        title: "accessTokenがありません。ログインし直してください",
        status: "error"
      });
      history.push("/");
      return;
    }
  }, [history, showMessage, setProfile, attendancesConverter]);
  return { getHomeItem, myAttendances, setMyAttendances };
};
