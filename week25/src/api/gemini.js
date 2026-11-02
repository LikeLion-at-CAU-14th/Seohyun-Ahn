// src/api/gemini.js
// 패키지(SDK) 없이 fetch로 Gemini REST API를 직접 호출하는 모듈
 
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.6-flash";
 
// API 오류를 구분하기 위한 커스텀 에러
export class GeminiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
  }
}
 
// 화면용 메시지({ role: "user" | "assistant", text }) → API 형식으로 변환
// Gemini는 assistant 대신 "model" role을 사용합니다.
function toContents(messages) {
  return messages
    .filter((m) => !m.isError) // 오류 메시지는 대화 맥락에서 제외
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    }));
}
 
// 응답 JSON에서 텍스트만 추출
function extractText(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  const text = parts?.map((p) => p.text).filter(Boolean).join("\n");
 
  if (text) return text;
 
  // 텍스트가 없는 경우 (안전 필터 등) 이유를 알려줌
  const reason =
    data?.promptFeedback?.blockReason || data?.candidates?.[0]?.finishReason;
  return reason ? `응답을 받지 못했습니다. (사유: ${reason})` : "API 응답이 없습니다.";
}
 
/**
 * Gemini generateContent 호출
 * @param {Array} messages  지금까지의 대화 (방금 보낸 사용자 메시지 포함)
 * @param {Object} options  { signal } - AbortController 취소용
 */
export async function generateContent(messages, { signal } = {}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiError("API Key를 찾을 수 없습니다. .env 파일을 확인해주세요.");
  }
 
  // 1. Request 구성
  const url = `${API_BASE}/models/${MODEL}:generateContent`;
  const body = { contents: toContents(messages) };
 
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 키를 URL 쿼리(?key=)에 넣으면 주소창/로그에 노출되므로 헤더로 전달
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
    signal,
  };
 
  console.groupCollapsed(`[Gemini] ▶ REQUEST  POST ${url}`);
  console.log("model:", MODEL);
  console.log("body:", body);
  console.groupEnd();
 
  // 2. 요청 전송
  const startedAt = performance.now();
  let response;
  try {
    response = await fetch(url, options);
  } catch (err) {
    if (err.name === "AbortError") throw err;
    // 네트워크 단절, CORS 등
    throw new GeminiError("네트워크 오류가 발생했습니다. 연결을 확인해주세요.");
  }
 
  // 3. Response 파싱
  const data = await response.json().catch(() => null);
  const elapsed = Math.round(performance.now() - startedAt);
 
  console.groupCollapsed(
    `[Gemini] ◀ RESPONSE ${response.status} ${response.statusText} (${elapsed}ms)`
  );
  console.log("ok:", response.ok);
  console.log("data:", data);
  console.log("usage:", data?.usageMetadata); // 토큰 사용량
  console.groupEnd();
 
  // 4. HTTP 오류 처리 (400 잘못된 요청 / 403 키 문제 / 404 모델 없음 / 429 한도 초과 등)
  if (!response.ok) {
    throw new GeminiError(
      data?.error?.message || `Gemini API 요청에 실패했습니다. (${response.status})`,
      response.status
    );
  }
 
  // 5. 텍스트 추출
  return extractText(data);
}