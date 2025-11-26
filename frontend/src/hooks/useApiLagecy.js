
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
    }).then(res => res.json());
}
