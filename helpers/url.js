export const apiUrl = path => {
  const baseUrl = process.env['API_BASE_URL'];

  return [baseUrl, path].join('');
};

export const appUrl = (path, protocol = 'https') => {
  const baseUrl = process.env['APPLICATION_BASE_URL'];

  return [protocol, ':', baseUrl, path].join('');
};
