const token = '8y93z2TiXJEgTt7vQRouGM9IcymNVwZs';
const baseURL = 'http://tenant.place/api/v1/';

var constructRequest = (url, method) => {
  return new Request(url, {
    method: method,
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
  });
};

var fetchJSON = (request) => {
  return fetch(request).then((response) => {return response.json();});
}

module.exports = {
  getReviews() {
    let url = `${baseURL}reviews?token=${token}`;
    let request = constructRequest(url, 'GET');
    return fetchJSON(request);
  }
}