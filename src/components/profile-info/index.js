import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileInfo({ user, t }) {
  const cn = bem("ProfileInfo");
  return (
    <div className={cn()}>
      <h3 className={cn("title")}>{t("profile.title")}</h3>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile.name")}:</div>
        <div className={cn("value")}>{user?.profile?.name}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile.phone")}:</div>
        <div className={cn("value")}>{user?.profile?.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile.email")}:</div>
        <div className={cn("value")}>{user?.email}</div>
      </div>
    </div>
  );
}

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.object,
    email: PropTypes.string,
  }),
  t: PropTypes.func,
};

ProfileInfo.defaultProps = {
  t: (text) => text,
};

export default memo(ProfileInfo);
