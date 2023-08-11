import { RouteItem } from '@/types';
import { some } from 'lodash';

export function findRouteByPath(routes: RouteItem[], targetPath: string): RouteItem | null {
  let foundRoute: RouteItem | null = null;

  function searchRoute(route: RouteItem) {
    if (route.path === targetPath) {
      foundRoute = route;
      return true;
    }

    if (route.children) {
      return route.children.some(searchRoute);
    }

    return false;
  }

  some(routes, searchRoute);

  return foundRoute;
}
