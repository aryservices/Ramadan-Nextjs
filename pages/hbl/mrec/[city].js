import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Mrec from '../../../components/hbl/Mrec';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const router = useRouter();
  const { city: routeCity } = router.query;
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
    // Make sure the router query is ready
    if (!router.isReady) return;

    const fetchLocationAndTimes = async () => {
      try {
        // Use the route parameter if available, else default to 'Karachi'
        let city = routeCity || 'Karachi';

        // Optional: Use geolocation if you want to override the route city
        // Comment out or remove this block if you always want to use the URL city
        if (navigator.geolocation && !routeCity) {
          await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                const geoResponse = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
                const geoData = await geoResponse.json();
                const timezone = geoData.timezone;
                // Try to get the city from the timezone (fallback to 'Karachi')
                city = timezone.split('/')[1] || 'Karachi';
                resolve();
              },
              (error) => {
                console.error('Error fetching geolocation:', error);
                resolve();
              }
            );
          });
        }

        // Fetch prayer times based on the determined city
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
          city: routeCity || 'Karachi', // Fallback to the route city or Karachi
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationAndTimes();
  }, [router.isReady, routeCity]);

  return (
    <div>
      <Mrec loading={isLoading} {...locationData} />
    </div>
  );
}
