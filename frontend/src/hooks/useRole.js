import useAuth from './useAuth';

export default function useRole(role) {
  const { user } = useAuth();
  return user && user.role === role;
}
