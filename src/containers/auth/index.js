import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link } from "react-router-dom";
import UserName from "../../components/user-name";

function Auth() {
  const store = useStore();

  const select = useSelector((state) => ({
    userName: state.login.userName,
    isLogin: state.login.isLogin,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <SideLayout side="end" padding="diverse" gap="small">
      {select.isLogin && (
        <UserName link="/profile" name={select.userName} />
      )}
      {select.userName ? (
        <button onClick={callbacks.onLogout}>{t("auth.logout")}</button>
      ) : (
        <Link to={"/login"}>
          <button>{t("auth.login")}</button>
        </Link>
      )}
    </SideLayout>
  );
}

export default memo(Auth);
