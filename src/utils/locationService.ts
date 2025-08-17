// Location service for converting coordinates to addresses
export interface LocationResult {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Mock geocoding service - in a real app, you'd use Google Maps API, Mapbox, or similar
const mockAddresses = [
  "123 Main Street, Soweto, Johannesburg",
  "456 Church Street, Cape Town Central, Cape Town",
  "789 Nelson Mandela Drive, Sandton, Johannesburg",
  "321 Long Street, City Bowl, Cape Town",
  "654 Commissioner Street, Johannesburg CBD, Johannesburg",
  "987 Adderley Street, Cape Town CBD, Cape Town",
  "147 Jan Smuts Avenue, Rosebank, Johannesburg",
  "258 Kloof Street, Gardens, Cape Town",
  "369 Rivonia Road, Sandton, Johannesburg",
  "741 Loop Street, Cape Town Central, Cape Town"
];

export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, you would call a geocoding service like:
  // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);
  // const data = await response.json();
  // return data.results[0]?.formatted_address || `${lat}, ${lng}`;
  
  // For demo purposes, return a random mock address
  const randomIndex = Math.floor(Math.random() * mockAddresses.length);
  return mockAddresses[randomIndex];
};

export const getCurrentLocation = (): Promise<LocationResult> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const address = await reverseGeocode(latitude, longitude);
          resolve({
            address,
            coordinates: {
              lat: latitude,
              lng: longitude
            }
          });
        } catch (error) {
          // Fallback to coordinates if geocoding fails
          resolve({
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            coordinates: {
              lat: latitude,
              lng: longitude
            }
          });
        }
      },
      (error) => {
        reject(new Error(`Location error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};