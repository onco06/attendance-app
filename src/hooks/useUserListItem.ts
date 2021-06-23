import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { apiUrl } from "../default/api/apiDefault";
import { useMessage } from "./useMessage";
import { Profile } from "../types/api/profile";

type Token = {
  access: string;
};

export const useUserListItem = () => {
  // gloablComponent でLoginUser情報を管理
  const history = useHistory();
  const { showMessage } = useMessage();

  const [userList, setUserList] = useState<Array<Profile>>([]);
  const [loading, setLoading] = useState(false);

  const getUserListItem = useCallback(async () => {
    const formDataAccess = new FormData();
    const formDataRefresh = new FormData();
    setLoading(true);
    if (localStorage.getItem("access")) {
      formDataAccess.append("token", localStorage.getItem("access"));
      formDataRefresh.append("refresh", localStorage.getItem("refresh"));
      // verify 有効かチェック 無効なら
      try {
        await axios.post(`${apiUrl}auth/jwt/verify/`, formDataAccess);
        showMessage({ title: "accessは有効です", status: "success" });
        console.log(`access is OK ${Date.now()}`);
        // token有効だから、UserLIstを取得する
        try {
          let res = await axios.get<Array<Profile>>(
            `${apiUrl}api/profile_list_admin/`,
            {
              headers: {
                Authorization: `JWT ${localStorage.getItem("access")}`
              }
            }
          );
          // setLoginUser
          setUserList(res.data);
          console.log(`get UserList ${Date.now()}`);
        } catch {
          showMessage({ title: "権限がない", status: "error" });
          history.push("/home");
          console.log("dont get Profiles");
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
          // token有効だから、UserListを取得する
          try {
            let res = await axios.get<Array<Profile>>(
              `${apiUrl}api/profile_list_admin/`,
              {
                headers: {
                  Authorization: `JWT ${localStorage.getItem("access")}`
                }
              }
            );
            // setLoginUser
            setUserList(res.data);
            console.log(`get UserList ${Date.now()}`);
          } catch {
            showMessage({ title: "権限がない", status: "error" });
            history.push("/home");
            console.log("dont get Profile");
          }
        } catch {
          showMessage({
            title: "refreshができません。ログインし直してください",
            status: "error"
          });
          history.push("/");
          console.log("refresh token none");
        }
      }
      setLoading(false);
    } else {
      showMessage({
        title: "accessTokenがありません。ログインし直してください",
        status: "error"
      });
      history.push("/");
      setLoading(false);
    }
  }, [history, showMessage, setUserList]);
  return { getUserListItem, userList, loading };
};
