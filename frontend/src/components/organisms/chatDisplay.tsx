import { useState } from "react";
import Message from "../molecules/message";

export default function ChatDisplay(props: {
  opened: boolean;
  handleChatDisplay(value: boolean): void;
}): React.ReactNode {
  const [message, setMessage] = useState<string>("");

  return (
    <div
      className={
        props.opened
          ? "chat_container chat_container--opened"
          : "chat_container chat_container--closed"
      }
    >
      <div className="d-flex justify-content-between align-items-center w-100 px-3 py-2 bottom-divider">
        <span>Messages du groupe</span>
        <i
          className="bi bi-x-circle"
          onClick={() => props.handleChatDisplay(false)}
        />
      </div>
      <div className="px-2 py-2 overflow-auto container">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="textInput-container d-flex justify-content-between align-items-center px-2 py-2">
        <textarea
          placeholder="Votre message"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button>OK</button>
      </div>
    </div>
  );
}
