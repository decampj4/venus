const token = '8y93z2TiXJEgTt7vQRouGM9IcymNVwZs';
const baseURL = 'http://tenant.place/api/v1/';

var constructGetRequest = (url) => {
  return new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
  });
};

var constructPostRequest = (url, body) => {
  return new Request(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  });
};

var fetchJSON = (request) => {
  return fetch(request).then((response) => {return response.json();});
}

module.exports = {
  getReviews() {
    let url = `${baseURL}reviews?token=${token}`;
    let request = constructGetRequest(url);
    return fetchJSON(request);
  },

  getReviewsByProperty(propertyId) {
    let url = `${baseURL}reviews/by_property?token=${token}&id=${propertyId}`;
    let request = constructGetRequest(url);
    return fetchJSON(request);
  },

  getReviewsByLandlord(landlordId) {
    let url = `${baseURL}reviews/by_landlord?token=${token}&id=${landlordId}`;
    let request = constructGetRequest(url);
    return fetchJSON(request);
  },

  createReview(body) {
    let url = `${baseURL}review?token=${token}`;
    let request = constructPostRequest(url, body);
    return fetchJSON(request);
  },

  getProperties() {
    let url = `${baseURL}properties?token=${token}`;
    let request = constructGetRequest(url);
    return fetchJSON(request);
  },

  getPropertiesByLandlord(landlordId) {
    let url = `${baseURL}properties/by_landlord?token=${token}&id=${landlordId}`;
    let request = constructGetRequest(url);
    return fetchJSON(request);
  },

  createProperty(body) {
    let url = `${baseURL}property?token=${token}`;
    let request = constructPostRequest(url, body);
    return fetchJSON(request);
  },

  getLandlords() {
    let url = `${baseURL}landlords?token=${token}`;
    let request = constructGetRequest(url);
    return fetchJSON(request);
  },

  createLandlord(body) {
    let url = `${baseURL}landlord?token=${token}`;
    let request = constructPostRequest(url, body);
    return fetchJSON(request);
  },
}