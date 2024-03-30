import { useRouter } from "next/navigation";
import { OutsetHeadersCornerRadius } from "../outset-radius-to-headers";

export default function SettingsHeader({title}: {title: string}) {
    const router = useRouter();
    return(
        <OutsetHeadersCornerRadius className="rounded-corner">
                <div className="header">
                  <div className="header-items slide-left">
                    <button
                      className="back-button"
                      type="button"
                      onClick={() => router.back()}
                    >
                      <i className="fas fa-arrow-left"></i>
                    </button>
                    <h3>{title}</h3>
                  </div>
                </div>
              </OutsetHeadersCornerRadius>
    );
}
