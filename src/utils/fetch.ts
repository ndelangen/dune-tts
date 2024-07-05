export const fetch = async (url: string) => {
  return new Promise((resolve, reject) => {
    let request: WebRequest;
    const callback: WebRequestCallback = () => {
      if (request.is_error) {
        reject(request.error);
      } else {
        try {
          const json = JSON.decode(request.text);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      }
    };
    request = (WebRequest as any).get(url, callback);
  });
};
