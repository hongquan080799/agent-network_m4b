export const createDefaulResponse = (message, statusCode, data) => {
  return {
    message: message || 'Successfully',
    statusCode: statusCode || 200,
    data: data,
  };
};
