import useAuth from './useAuth';

export default function useApi() {
  const { token } = useAuth();

  return (path, method = "GET", payload = null) =>
    fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json"
      },
      ...(payload && { body: JSON.stringify(payload) })
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          return { error: "Invalid JSON", raw: text };
        }
      });
}
