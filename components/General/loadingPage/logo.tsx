import Image from "next/image";
import CircularProgressFluent from "../circular-progress-fluent";
import styles from "./styles.module.scss";

export function LoadingPageLogo({reason}: {reason?: string}) {
    return(
        <div className={styles["loadingPageLogoStyle"]}>
            <Image src="/logo192.png" alt="logo" width={140} height={140} />
            <CircularProgressFluent height="35px" width="35px" color="white"/>
            {reason && <p>{reason}</p>}
        </div>
    );
}
