const customLogger = (role, action, req) => {
  const { method, url, query } = req;
  const routeName = req?.route ? req?.route?.path : "unknown route";
  console.log(routeName);
};

module.exports = customLogger;
