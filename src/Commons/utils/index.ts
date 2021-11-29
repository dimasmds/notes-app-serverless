const getTokenFromAuthHeader = (authHeader: string) => {
  if (!authHeader) {
    throw new Error('No authentication header');
  }

  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    throw new Error('Invalid authentication header');
  }

  const split = authHeader.split(' ');
  return split[1];
};

export {
  getTokenFromAuthHeader,
};
