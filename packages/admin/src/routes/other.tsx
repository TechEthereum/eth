export const otherRoutes = [
  {
    path: '/login',
    lazy: async () => ({ Component: (await import('@/containers/Login')).Login }),
  },
  {
    path: '*',
    lazy: async () => ({ Component: (await import('@/layouts/NotFound')).NotFound }),
  },
];
