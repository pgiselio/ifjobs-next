import { CSSProperties } from "react";
import { useProfilePic } from "../../../hooks/useProfilePic";
import { isBlank } from "../../../utils/isBlank";
import Image from "next/image";
import styled from "./styled.module.scss";

type ProfilePicType = {
  url?: string;
  style?: CSSProperties;
  className?: string;
  userId?: string | number;
  isCompany?: boolean;
};

export function ProfilePic(props: ProfilePicType) {
  const { data } = useProfilePic(props.userId);
  return (
    <div
      className={
        styled["styled-profile-pic"] +
        (props.isCompany ? " " + styled["company"] : "") +
        " profile-pic " +
        (props.className ?? "")
      }
      style={props.style}
    >
      <span className={styled["default-profile"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 574.07 574.07"
          className={styled["default-profile-svg"]}
        >
          <defs>
            <style>
              {`
                .cls-1 {
                  fill: #555d60;
                }
                .cls-2 {
                  fill: #c3c7c9;
                }
              `}
            </style>
          </defs>
          <rect className="cls-1" width="574.07" height="574.07" />
          <path
            className="cls-2"
            d="M453.9,685c-8.21,0-14.42-9-13-18.89C453.45,580,542,513.32,649.35,513.32S845.26,580,857.79,666.11C859.23,676,853,685,844.81,685ZM650,258.43A105.27,105.27,0,1,0,755.25,363.7,105.27,105.27,0,0,0,650,258.43Z"
            transform="translate(-363 -110.93)"
          />
        </svg>
      </span>
      <span className={styled["default-profile-svg-border"]}></span>

      {(!isBlank(props.url) || !isBlank(data)) && (
        <>
          <Image
            className={styled["img-perfil"]}
            src={props.url || data || " "}
            fill
            alt=""
          />
          <span className={styled["profile-pic-border"]}></span>
        </>
      )}
    </div>
  );
}
