import { ListQuery, ListResponse } from '@eth/types';

export * from './api';

import { RouteObject } from 'react-router-dom';

export interface RouteItem {
  path?: string;
  redirect?: string;
  name?: string;
  icon?: React.ReactNode;
  children?: RouteItem[];

  lazy?: RouteObject['lazy'];
  index?: RouteObject['index'];
}

export type { ListQuery, ListResponse };
