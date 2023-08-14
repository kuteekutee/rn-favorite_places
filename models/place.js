export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    // this.address = location.address;
    this.location = {
      lat: location.lat,
      lng: location.lng,
      address: location.address,
    }; // { lat: 0.141212, lng: 127.032323 }
    this.id = id;
  }
}
