// Базовый API-клиент для выполнения HTTP-запросов с помощью fetch.
// Выполняет построение url на основе базового URL,
// проверяет статус ответа и автоматически преобразует результат в JSON.

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = async <T>(
  url: string,
  config?: Omit<RequestInit, "signal"> & { signal?: AbortSignal },
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...config,
    signal: config?.signal || null,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
