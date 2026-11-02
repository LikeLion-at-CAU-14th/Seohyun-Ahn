
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // 자동 스크롤을 위한 ref
  const bottomRef = useRef(null);

  // 추천 질문 목록
  const suggestions = [
    "React의 useState를 설명해 줘",
    "AI API는 어떻게 작동해?",
    "프론트엔드 개발자가 하는 일은?",
  ];

  // 메세지 시간
  const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  };

  // 메시지 또는 로딩 상태가 변경되면 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // 메시지 전송 함수
  const sendMessage = async (messageText = input) => {
    if (!messageText.trim() || loading) return;

    const userMessage = messageText.trim();

    // 사용자 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
        time: new Date(),
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      // 1. Gemini API Key 가져오기
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      // 2. 사용할 Gemini AI 모델 지정
      const model = "gemini-3.6-flash";

      if (!apiKey) {
        throw new Error(
          "API Key를 찾을 수 없습니다. .env 파일을 확인해주세요."
        );
      }

      // 3. API 요청 URL 생성
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      console.log("REQUEST MODEL:", model);

      // 4. Gemini API 호출
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      });

      // 5. API 응답 JSON 변환
      const data = await response.json();

      console.log("HTTP STATUS:", response.status);
      console.log("Gemini Response:", data);

      // 6. API 오류 처리
      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            `Gemini API 요청에 실패했습니다. (${response.status})`
        );
      }

      // 7. AI 응답 텍스트 추출
      const aiText =
        data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text)
          .filter(Boolean)
          .join("\n") || "API 응답이 없습니다.";

      // 8. AI 응답을 메시지 목록에 추가
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: aiText,
          time: new Date(),
        },
      ]);
    } catch (error) {
      // API 오류 처리
      console.error("Gemini API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `오류가 발생했습니다.\n${error.message}`,
        },
      ]);
    } finally {
      // 로딩 종료
      setLoading(false);
    }
  };

  // Enter 전송 / Shift + Enter 줄바꿈
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // AI 답변 복사
  const copyMessage = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch (error) {
      console.error("복사 실패:", error);
    }
  };

  // 새로운 대화 시작
  const resetChat = () => {
    if (loading) return;

    setMessages([]);
    setInput("");
    setCopiedIndex(null);
  };

  return (
    <div className="app">
      <div className="chat-container">

        {/* 헤더 */}
        <header className="chat-header">
          <div>
            <h1>AHN Chatbot ✿</h1>
            <p>by Seohyun Ahn</p>
          </div>

          <div className="header-right">
            <div className="status">
              <span />
              Online
            </div>

            <button
              className="reset-button"
              onClick={resetChat}
              disabled={loading}
            >
              새 대화
            </button>
          </div>
        </header>

        {/* 채팅 영역 */}
        <main className="chat-body">

          {/* 첫 화면: 환영 메시지 + 추천 질문 */}
          {messages.length === 0 && (
            <div className="welcome-screen">
              <div className="welcome-flower">✿</div>

              <h2>안녕하세요, 서현님!</h2>

              <p>
                오늘은 어떤 이야기를 나눠볼까요?
                <br />
                궁금한 것을 자유롭게 질문해 보세요.
              </p>

              <div className="suggestion-title">
                이런 질문은 어떠세요?
              </div>

              <div className="suggestion-list">
                {suggestions.map((question, index) => (
                  <button
                    key={index}
                    className="suggestion-button"
                    onClick={() => sendMessage(question)}
                  >
                    {question}
                    <span>↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 메시지 목록 */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${
                message.role === "user"
                  ? "user-row"
                  : "assistant-row"
              }`}
            >
              {/* AI 아바타 */}
              {message.role === "assistant" && (
                <div className="avatar">✿</div>
              )}

              <div className="message-wrapper">
                <div
                  className={`message ${
                    message.role === "user"
                      ? "user-message"
                      : "assistant-message"
                  }`}
                >
                  {message.text}
                </div>

                {/* AI 답변 복사 버튼 */}
                {message.role === "assistant" && (
                  <button
                    className="copy-button"
                    onClick={() =>
                      copyMessage(message.text, index)
                    }
                  >
                    {copiedIndex === index
                      ? "✓ 복사 완료!"
                      : "▢ 복사"}
                  </button>
                )}

                {/* 메시지 시간 */}
                <span className="message-time">
                   {formatTime(message.time)}
                </span>
              </div>
            </div>
          ))}

          {/* AI 응답 대기 중 */}
          {loading && (
            <div className="message-row assistant-row">
              <div className="avatar">✿</div>

              <div className="message assistant-message loading-message">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {/* 자동 스크롤 기준점 */}
          <div ref={bottomRef} />

        </main>

        {/* 입력창 */}
        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="궁금한 것을 입력해 보세요..."
            rows={1}
          />

          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            {loading ? "..." : "↑"}
          </button>
        </div>

        <div className="input-caption">
          AI가 생성한 답변은 부정확할 수 있습니다.
        </div>

      </div>
    </div>
  );
}

export default App;
