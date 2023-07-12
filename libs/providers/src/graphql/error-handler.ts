import { GraphQLError } from 'graphql';

export const gqlErrorHandler = (err: GraphQLError) => {
  if ('response' in err.extensions) {
    const { message, ...response } = err.extensions['response'] as {
      message: string;
      response: object;
    };

    return {
      message,
      extensions: {
        timestamp: new Date().toISOString(),
        ...response,
      },
    };
  }

  return err;
};
