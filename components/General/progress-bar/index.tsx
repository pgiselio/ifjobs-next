import styled from "./style.module.scss";

export default function Progressbar({ progress }: { progress: number }) {
  return (
    <p className={styled["progress-container"] + (progress > 0 ? " "+styled["onProgress"] : "")}>
      <span
        style={{
          transform: `translateX(-${100 - progress}%)`,
        }}
      ></span>
    </p>
  );
}
