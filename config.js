module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 4000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "mySecret",
  },
  post: {
    host: process.env.POST_HOST || "localhost",
    port: process.env.POST_PORT || 3002,
  },
  mysql: {
    username: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "social_media",
    host: process.env.MYSQL_HOST || "localhost",
  },
  mysqlService: {
    host: process.env.MYSQL_SERVICE_HOST || "localhost",
    port: process.env.MYSQL_SERVICE_PORT || 3001,
  },
  cache_Service: {
    host: process.env.MYSQL_SERVICE_HOST || "localhost",
    port: process.env.MYSQL_SERVICE_PORT || 3003,
  },
  redis: {
    host:
      process.env.REDIS_HOST ||
      "redis-16221.c44.us-east-1-2.ec2.cloud.redislabs.com",
    port: process.env.REDIS_PORT || 16221,
    password: process.env.REDIS_PASSWORD || "etNLeFAJ43tba4l8gYd4Z7J7ZkGLjMeu",
  },
};
