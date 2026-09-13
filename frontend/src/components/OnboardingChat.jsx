import { useEffect, useRef, useState } from "react";
import "./OnboardingChat.css";

function OnboardingChat({ onContinue }) {
  const [savedName] = useState(() =>
    localStorage.getItem("careeros_name")
  );

  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [stage, setStage] = useState(
    savedName ? "returning" : "askName"
  );

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (savedName) {
      setMessages([
        {
          sender: "bot",
          text: `Welcome back, ${savedName} 👋`,
        },
        {
          sender: "bot",
          text: "Ready to continue your career journey?",
        },
      ]);
    } else {
      setMessages([
        {
          sender: "bot",
          text: "Hi 👋 Welcome to CareerOS.",
        },
        {
          sender: "bot",
          text: "Before we begin, what should I call you?",
        },
      ]);
    }
  }, [savedName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  function handleNameSubmit(e) {
    e.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) return;

    localStorage.setItem("careeros_name", cleanName);

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: cleanName,
      },
      {
        sender: "bot",
        text: `Nice to meet you, ${cleanName}!`,
      },
      {
        sender: "bot",
        text: "Let's start building your career profile.",
      },
    ]);

    setStage("ready");
    setName("");
  }

  return (
    <section className="onboarding">
      <div className="chat-window">

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {stage === "askName" && (
          <form
            className="name-input"
            onSubmit={handleNameSubmit}
          >
            <input
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />

            <button type="submit">
              →
            </button>
          </form>
        )}

        {stage === "ready" && (
          <button
            className="continue-button"
            onClick={onContinue}
          >
            Let's begin →
          </button>
        )}

        {stage === "returning" && (
          <button
            className="continue-button"
            onClick={onContinue}
          >
            Continue →
          </button>
        )}

      </div>
    </section>
  );
}

export default OnboardingChat;