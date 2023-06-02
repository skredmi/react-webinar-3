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
    user: state.login.data,
    isLogin: state.login.isLogin,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <SideLayout side="end" padding="medium" gap="small">
      {select.isLogin && (
        <UserName link="/profile" name={select.user?.profile?.name} />
      )}
      {select.user ? (
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
