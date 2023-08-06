export const serverConfig = () => ({
  port: process.env.PORT || 3000,
  jwt: {
    app: {
      secret: process.env.APP_JWT_SECRET,
      expires: process.env.APP_JWT_EXPIRES,
    },
    admin: {
      secret: process.env.ADMIN_JWT_SECRET,
      expires: process.env.ADMIN_JWT_EXPIRES,
    },
  },
});
