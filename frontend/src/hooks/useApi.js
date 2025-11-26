import useAuth from './useAuth';

export default function useApi() {
  const { token } = useAuth();
  return (path, options = {}) =>
    fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    }).then(res => res.json());
}