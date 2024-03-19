import { HTMLAttributes, use, useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";

interface NotifyCard
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  titulo: string;
  detalhes?: string;
  date: string;
  link?: string;
  read?: boolean;
  markAsRead?: () => void;
}

export function NotificationCard({
  titulo,
  detalhes,
  date,
  link,
  read,
  markAsRead,
  ...rest
}: NotifyCard) {
  const [collapse, setColapse] = useState(false);
  const [show, setShow] = useState(true);
  function animationEnd() {
    if (read) return;

    if(show)
      setShow(false);
    else
      setShow(true);

    setTimeout(() => {
      setShow(true);
      if (markAsRead) {
        markAsRead();
      }
    }, 300);
  }
  return (
    <div
      title={titulo}
      className={
        "notification-card" +
        (collapse && !read ? " collapse" : "") +
        (show ? " show" : " hide") +
        (read ? " read" : "")
      }
      tabIndex={0}
      {...(read && { "data-read": true })}
      {...rest}
    >
      <>
        <div
          className="notification-content"
          onClick={() => {
            setColapse(!collapse);
          }}
        >
          <div className="message">
            <span>{titulo}</span>
            {detalhes && <p>{detalhes}</p>}
          </div>
          <div className="card-date">
            <span>{date}</span>
          </div>
        </div>
        <div className={"card-options"}>
          <button
            type="button"
            className="btn-markasread"
            title="Marcar como visto"
            {...(read && { disabled: true })}
            onClick={() => animationEnd()}
            onFocus={() => {setColapse(true)}}
          >
            <i className="fas fa-eye"></i>
            <span>Marcar lida</span>
          </button>
        </div>
      </>
    </div>
  );
}
