import { useState, useEffect } from 'react';
import BillBoard from '../../../components/BillBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/custom.css';

export default function Home() {
  const [locationData, setLocationData] = useState({
    sehriTime: 'N/A',
    iftariTime: 'N/A',
    sehriTimeJafria: 'N/A',
    iftariTimeJafria: 'N/A',
    timezone: 'Loading',
    city: 'Loading',
    date: '...',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndTimes = async () => {
      try {
        let city = 'Karachi'; // Default city

        if (navigator.geolocation) {
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;

                const geoResponse = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
                const geoData = await geoResponse.json();

                const timezone = geoData.timezone;
                city = timezone.split('/')[1] || 'Karachi'; // Fallback to Karachi if city is not found
                resolve();
              },
              (error) => {
                console.error('Error fetching geolocation:', error);
                resolve(); // Proceed with default city
              }
            );
          });
        }

        // Fetch prayer times based on city (default or determined)
        const times = await fetch('/api/prayerTimes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city }),
        }).then((res) => res.json());

        setLocationData({
          sehriTime: times.updatedSehriTime || 'N/A',
          iftariTime: times.updatedIftariTime || 'N/A',
          sehriTimeJafria: times.sehriTimejafria || 'N/A',
          iftariTimeJafria: times.iftariTimeJafria || 'N/A',
          timezone: times.timezone || 'Asia/Karachi',
          city,
          date: times.formattedDate || 'N/A',
        });
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        setLocationData((prev) => ({
          ...prev,
          city: 'Karachi', // Fallback to Karachi
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationAndTimes();
  }, []);

  return (
    <div>
      <BillBoard loading={isLoading} {...locationData} />
    </div>
  );
}
