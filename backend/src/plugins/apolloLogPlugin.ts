import { Log } from "../mongo";

const apolloLogPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse(requestContext: any) {
        if (requestContext.operation.operation !== "query") {
          let user = "";
          switch (requestContext.operationName) {
            case "ValidateAccount":
              user = requestContext.request.variables.token;
              break;
            case "ResetPassword":
              user = requestContext.request.variables.token;
              break;
            default:
              user =
                requestContext.contextValue.user === undefined
                  ? requestContext.request.variables?.data
                    ? requestContext.request.variables?.data.email
                    : requestContext.request.variables.email
                  : requestContext.contextValue.user.id;
              break;
          }
          const log = new Log({
            message: `Request  ${requestContext.operation.operation} ${requestContext.operationName}`,
            user: user,
          });
          await log.save();
        }
      },
    };
  },
};

export default apolloLogPlugin;

/* return {
  didResolveOperation(context: any) {
    /*  if (Object.keys(req.body).length === 0) {
      const log = new Log({
        message: `Request  ${req.method} ${req.url}`,
        userId: `${user.id}`,
      });
      await log.save();
    }
    const operationType = context.operation.operation;
    console.log("CONTEXT", context);
  },
}; */
