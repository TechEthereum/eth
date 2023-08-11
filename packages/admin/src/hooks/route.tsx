import { routes } from '@/routes';
import { findRouteByPath } from '@/utils';
import { useLocation, useNavigate } from 'react-router-dom';

export function useRouteRedirect() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const route = findRouteByPath(routes, pathname);
  const directPath = route?.children?.[0].path;

  if (!directPath || pathname === directPath) {
    return true;
  }

  navigate(directPath, { replace: true });

  return true;
}
