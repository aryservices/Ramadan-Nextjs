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

