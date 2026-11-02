import { API_BASE_URL } from '@/constants/api';

const TIMEOUT_MS = 12000;

// Returns { status: 'ok', answer, placeIds, sources } or { status: 'error', message }
export async function askQuestion(question) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: controller.signal,
    });

    if (response.status === 429) {
      return { status: 'error', message: 'Too many questions. Please wait a minute and try again.' };
    }

    const data = await response.json();
    if (!response.ok) {
      return { status: 'error', message: data.error || 'Something went wrong. Please try again.' };
    }

    return {
      status: 'ok',
      answer: data.answer,
      placeIds: data.place_ids || [],
      sources: data.sources || [],
    };
  } catch (error) {
    if (error && error.name === 'AbortError') {
      return { status: 'error', message: 'The assistant took too long to answer. Please try again.' };
    }
    return {
      status: 'error',
      message: "Can't reach the assistant. Check your internet connection, or search in the Places tab.",
    };
  } finally {
    clearTimeout(timer);
  }
}