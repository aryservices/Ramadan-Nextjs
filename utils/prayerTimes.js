const { PrayerTimes, CalculationMethod, Coordinates, Madhab } = require('adhan');
const axios = require('axios');
const moment = require('moment');

// export function getPrayerTimes(latitude, longitude) {

//   // Define the location coordinates dynamically
//   const coordinates = new Coordinates(latitude, longitude);

//   // Set calculation parameters
//   const params = CalculationMethod.MuslimWorldLeague();
//   params.madhab = Madhab.Hanafi;

//   // Use a JavaScript Date object for the current date
//   const today = new Date();

//   // Calculate prayer times
//   const prayerTimes = new PrayerTimes(coordinates, today, params);

//   // Format time for output
//   const formatTime = (date) => {
//     return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
//   };

    


//   return {
//     sehriTime: formatTime(prayerTimes.fajr),
//     iftariTime: formatTime(prayerTimes.maghrib)
//   };
// }


function adjustTime(timeStr, adjustment) {
  // Parse the time string
  const [time, meridian] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  // Create a Date object
  const date = new Date();
  date.setHours(meridian.toLowerCase() === 'pm' && hours !== 12 ? hours + 12 : hours % 12);
  date.setMinutes(minutes + adjustment);

  // Adjust for overflow or underflow of minutes
  date.setSeconds(0);

  // Format the updated time
  const updatedHours = date.getHours();
  const updatedMinutes = date.getMinutes();
  const updatedMeridian = updatedHours >= 12 ? 'pm' : 'am';
  const formattedHours = ((updatedHours + 11) % 12 + 1); // Convert to 12-hour format
  const formattedMinutes = updatedMinutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${updatedMeridian}`;
}




const cityCoordinates = {
  'karachi': { lat: 24.8607, lng: 67.0011 },
  // Add more cities as needed
};

export async function getPrayerTimes2(city) {
  try {
    const cityName = city.toLowerCase();
    const coords = cityCoordinates[cityName] || cityCoordinates['karachi']; // Default to Karachi

    const coordinates = new Coordinates(coords.lat, coords.lng);
    const date = new Date();
    const params = CalculationMethod.Karachi();
    params.madhab = Madhab.Hanafi;

    const prayerTimes = new PrayerTimes(coordinates, date, params);

    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const meridian = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${meridian}`;
    };

    const sehriTime = formatTime(prayerTimes.fajr);
    const iftariTime = formatTime(prayerTimes.maghrib);
    const formattedDate = moment(date).format("Do MMMM YYYY");

    // Apply adjustments consistent with previous logic
    const updatedSehriTime = adjustTime(sehriTime, -2);
    const updatedIftariTime = adjustTime(iftariTime, 1);
    const iftariTimeJafria = adjustTime(updatedIftariTime, 10);
    const sehriTimejafria = adjustTime(updatedSehriTime, -10);

    return {
      updatedSehriTime,
      updatedIftariTime,
      sehriTimejafria,
      iftariTimeJafria,
      formattedDate
    };
  } catch (error) {
    console.error('Error calculating local prayer times:', error.message);
    throw error;
  }
}
