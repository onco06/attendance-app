import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiUrl } from "../default/api/apiDefault";

import { useMessage } from "./useMessage";
import { JWTToken } from "../types/api/token";
import { Status } from "../types/api/status";
import { Profile } from "../types/api/profile";
import { User } from "../types/api/user";

type Props = {
  email: string;
  password: string;
  username: string;
};

export const useAuth = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();

  const jwtTokenCreateUrl = `${apiUrl}auth/jwt/create/`;
  const createUserUrl = `${apiUrl}api/register/`;
  const createStatusUrl = `${apiUrl}api/status/`;
  const createMyProfileUrl = `${apiUrl}api/myprofile/`;

  const jwtLogin = useCallback(
    (props: Omit<Props, "username">) => {
      const { email, password } = props;
      let form_data = new FormData();
      form_data.append("email", email);
      form_data.append("password", password);
      // 認証については考える必要がある -> 現状はlocalstorageに保存するかな。。。
      // https://coders-shelf.com/react-auth-problem/
      // 認証周り？？？
      // https://tech.hicustomer.jp/posts/modern-authentication-in-hosting-spa/
      // localstorage https://zenn.dev/marokanatani/articles/d0777a34641d22
      // cookie の使い方がわからない
      setLoading(true);
      axios
        .post<JWTToken>(jwtTokenCreateUrl, form_data)
        .then((res) => {
          // reactHooksのlocalstorageを使って保存
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          setLoading(false);
          showMessage({
            title: "Success: ログインしました",
            status: "success"
          });
          history.push("/home");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          showMessage({
            title: "Error: ログインできません。サーバーが停止している？",
            status: "error"
          });
          setLoading(false);
        });
    },
    [history, showMessage, jwtTokenCreateUrl]
  );

  const register = useCallback(
    async (props: Props) => {
      const { email, password, username } = props;
      let form_data = new FormData();
      form_data.append("email", email);
      form_data.append("password", password);
      form_data.append("username", username);

      setLoading(true);
      try {
        await axios.post<User>(createUserUrl, form_data);
        showMessage({
          title: "Success: 登録しました",
          status: "success"
        });
        try {
          // 続けてログイン
          form_data.delete("username");
          let res = await axios.post<JWTToken>(jwtTokenCreateUrl, form_data);
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          setLoading(false);
          showMessage({
            title: "Success: ログインしました",
            status: "success"
          });

          try {
            // statusも作ってしまう
            axios
              .post<Status>(
                createStatusUrl,
                {},
                {
                  headers: {
                    Authorization: `JWT ${localStorage.getItem("access")}`
                  }
                }
              )
              .catch((err) => console.log(err));
            // profileも
            let form_data = new FormData();
            form_data.append("fullName", username);
            axios
              .post<Profile>(createMyProfileUrl, form_data, {
                headers: {
                  Authorization: `JWT ${localStorage.getItem("access")}`
                }
              })
              .catch((err) => console.log(err));
            history.push("/home");
          } catch {
            showMessage({
              title: "Error: status, profileの作成ができていない",
              status: "error"
            });
          }
        } catch {
          showMessage({
            title: "Error: ログインできません。",
            status: "error"
          });
        }
        setLoading(false);
      } catch {
        showMessage({
          title: "Error: 登録できません",
          status: "error"
        });
        setLoading(false);
      }
    },
    [
      history,
      showMessage,
      createUserUrl,
      jwtTokenCreateUrl,
      createMyProfileUrl,
      createStatusUrl
    ]
  );
  return { jwtLogin, register, loading };
};
