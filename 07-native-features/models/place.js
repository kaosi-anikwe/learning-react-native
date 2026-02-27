class Place {
  constructor(title, imageUri, address, location) {
    this.id = new Date().toString() + Math.random().toString();
    this.tile = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.21232, lng: 127.123 }
  }
}
