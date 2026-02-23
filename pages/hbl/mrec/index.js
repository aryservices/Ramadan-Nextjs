import { useState, useEffect } from 'react';
import Mrec from '../../../components/hbl/Mrec';
import 'bootstrap/dist/css/bootstrap.min.css';

const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta'];

export default function Home() {
  const [citiesData, setCitiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('...');

  useEffect(() => {
    const fetchAllCitiesTimes = async () => {
      try {
        const promises = CITIES.map(async (city) => {
          try {
            const res = await fetch('/api/prayerTimes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ city }),
            });
            const data = await res.json();
            return {
              city,
              sehriTime: data.updatedSehriTime || 'N/A',
              iftariTime: data.updatedIftariTime || 'N/A',
              sehriTimeJafria: data.sehriTimejafria || 'N/A',
              iftariTimeJafria: data.iftariTimeJafria || 'N/A',
            };
          } catch (error) {
            console.error(`Error fetching time for ${city}:`, error);
            return {
              city,
              sehriTime: 'N/A',
              iftariTime: 'N/A',
              sehriTimeJafria: 'N/A',
              iftariTimeJafria: 'N/A',
            };
          }
        });

        const results = await Promise.all(promises);
        setCitiesData(results);

        // Set date from the first successful result, or default
        // Assuming all rely on the same API which returns the same date for "today"
        // But strictly speaking, date might vary slightly by timezone if near midnight, 
        // but for Pakistan cities it should be same.
        // We'll just fetch one to get the formatted date if needed, or take from first.

        // Actually, let's just use the date from the first response if available
        if (results.length > 0) {
          // We need to fetch date separately or extract it from the response if the API returns it. 
          // The previous code used data.formattedDate.
          // Let's see if we can get it from one of them.
          // We need to make sure we are getting the complete object from API in the map above?
          // Ah, I see I am constructing a new object in the map.
          // I should probably inspect the API response structure again in my mind.
          // The previous code used `times.formattedDate`.

          // Re-fetch date from one call or just assume they are same.
          const firstValid = results.find(r => r.sehriTime !== 'N/A');
          // Wait, I didn't include formattedDate in the return object above. 
          // Let's modify the map to include it.
        }

      } catch (error) {
        console.error('Error in fetching cities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCitiesTimes();
  }, []);

  // Revised fetch logic to include date
  useEffect(() => {
    const fetchAllCitiesTimes = async () => {
      try {
        const promises = CITIES.map(async (city) => {
          try {
            const res = await fetch('/api/prayerTimes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ city }),
            });
            const data = await res.json();
            return {
              city,
              sehriTime: data.updatedSehriTime || 'N/A',
              iftariTime: data.updatedIftariTime || 'N/A',
              sehriTimeJafria: data.sehriTimejafria || 'N/A',
              iftariTimeJafria: data.iftariTimeJafria || 'N/A',
              date: data.formattedDate
            };
          } catch (error) {
            console.error(`Error fetching time for ${city}:`, error);
            return {
              city,
              sehriTime: 'N/A',
              iftariTime: 'N/A',
              sehriTimeJafria: 'N/A',
              iftariTimeJafria: 'N/A',
              date: 'N/A'
            };
          }
        });

        const results = await Promise.all(promises);
        setCitiesData(results);

        const validDate = results.find(r => r.date && r.date !== 'N/A')?.date;
        if (validDate) {
          setCurrentDate(validDate);
        }

      } catch (error) {
        console.error('Error in fetching cities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCitiesTimes();
  }, []);


  return (
    <div>
      <Mrec loading={isLoading} citiesData={citiesData} date={currentDate} />
    </div>
  );
}

