import styled from "./style.module.scss";

export default function Progressbar({ progress, backgroundColor = "var(--secondary-color)", color = " var(--accent-color)"}: { progress: number, backgroundColor?: string, color?: string}) {
  return (
    <p className={styled["progress-container"] + (progress > 0 ? " "+styled["onProgress"] : "")} style={{backgroundColor: backgroundColor}}>
      <span
        style={{
          transform: `translateX(-${100 - progress}%)`,
          backgroundColor: color,
        } }
      ></span>
    </p>
  );
}
