import React from 'react';
import '../../styles/Home.module.css'; // Import the CSS module
import hblStyles from '../../styles/hbl-mrec.module.css'; // Import HBL specific styles as a module

const CITY_MAPPING = {
  'Karachi': 'کراچی',
  'Lahore': 'لاہور',
  'Islamabad': 'اسلام آباد',
  'Peshawar': 'پشاور',
  'Quetta': 'کوئٹہ'
};

export default function Mrec({ loading, citiesData, date, city, sehriTime, iftariTime, sehriTimeJafria, iftariTimeJafria }) {

  if (loading) {
    return (
      <div className="bgRamadanH d-flex flex-column align-items-center justify-content-center text-white">
        <div className="text-center mt-5">
          <div className="spinner-border " style={{ width: '3rem', height: '3rem', color: '#FFF' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: '#FFF', textShadow: '2px 3px 10px #000' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Helper to strip "am/pm"
  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === 'N/A') return '-';
    // Remove am/pm case insensitively
    return timeStr.replace(/\s*[ap]m/i, '').trim();
  };

  // New Mode: 5 Cities Table
  if (citiesData && citiesData.length > 0) {
    return (
      <div className="bgRamadanH d-flex flex-column align-items-center justify-content-start text-white">
        {/* Header Section */}
        {/* Adjusted top margin to position date below the background title and save vertical space */}
        <div className="text-center w-100 mb-0" style={{ marginTop: '26px', marginLeft: '62px' }}>
          <div className="font-shadowH">
            {/* <h5 className="mb-0 fw-bold fs-5">Ramadan Timing</h5> */}
            {/* Reduced bottom margin to 0 */}
            <p className="mb-1 fw-bold" style={{ fontSize: '0.75rem' }}>{date}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-100" style={{ fontSize: '0.7rem' }}>

          {/* Fiqh Headers */}
          <div className="d-flex justify-content-between align-items-center px-1 mb-1">
            <div className="text-center w-40" style={{ marginTop: '5px' }}>
              <span className="text-white fw-bold" style={{ fontSize: '1.0rem' }}>فقہ حنفی</span>
              <div className="d-flex gap-1 justify-content-center text-white leading-none" style={{ fontSize: '0.65rem' }}>
                <div className="text-center" style={{ width: '45px' }}>افطار</div>
                <div className="text-center" style={{ width: '45px' }}>سحری</div>
              </div>
            </div>
            <div className="w-20"></div> {/* Spacer for City Column */}
            <div className="text-center w-40" style={{ marginTop: '5px' }}>
              <span className="text-white fw-bold" style={{ fontSize: '1.0rem' }}>فقہ جعفریہ</span>
              <div className="d-flex gap-1 justify-content-center text-white leading-none" style={{ fontSize: '0.65rem' }}>
                <div className="text-center" style={{ width: '45px' }}>افطار</div>
                <div className="text-center" style={{ width: '45px' }}>سحری</div>
              </div>
            </div>
          </div>

          {/* Cities Data Rows */}
          <div className="d-flex flex-column gap-1">
            {citiesData.map((data, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center" style={{ lineHeight: '1' }}>

                {/* Hanafi Times (Left) */}
                <div className="d-flex gap-1 w-40 justify-content-center">
                  <div className={`bg-white ${hblStyles.hblTealText} fw-bold rounded px-0 text-center d-flex align-items-center justify-content-center`} style={{ width: '45px', height: '20px', fontSize: '0.8rem' }}>
                    {formatTime(data.iftariTime)}
                  </div>
                  <div className={`bg-white ${hblStyles.hblTealText} fw-bold rounded px-0 text-center d-flex align-items-center justify-content-center`} style={{ width: '45px', height: '20px', fontSize: '0.8rem' }}>
                    {formatTime(data.sehriTime)}
                  </div>
                </div>

                {/* City Name (Center) */}
                <div className={`bg-white ${hblStyles.hblTealText} fw-bold rounded px-1 py-0 text-center w-20 d-flex align-items-center justify-content-center`} style={{ height: '22px', minWidth: '70px' }}>
                  <span className="mb-0" style={{ fontSize: '1rem', fontFamily: 'Arial, sans-serif' }}>{CITY_MAPPING[data.city] || data.city}</span>
                </div>

                {/* Jafria Times (Right) */}
                <div className="d-flex gap-1 w-40 justify-content-center">
                  <div className={`bg-white ${hblStyles.hblTealText} fw-bold rounded px-0 text-center d-flex align-items-center justify-content-center`} style={{ width: '45px', height: '20px', fontSize: '0.8rem' }}>
                    {formatTime(data.iftariTimeJafria)}
                  </div>
                  <div className={`bg-white ${hblStyles.hblTealText} fw-bold rounded px-0 text-center d-flex align-items-center justify-content-center`} style={{ width: '45px', height: '20px', fontSize: '0.8rem' }}>
                    {formatTime(data.sehriTimeJafria)}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Footer Note - rendered very small to fit */}
        <p className="p-note m-0 p-0 mt-1 text-center" style={{ fontSize: '0.5rem', lineHeight: '1' }}>Sehri and Iftar times may vary slightly (±1 min).</p>
      </div>
    );
  }

  // Fallback: Legacy Single City Mode
  return (
    <div className="bgRamadanH d-flex flex-column align-items-center justify-content-between text-white">
      <div className="text-center">
        <img
          src="/k&ns.png"
          className="img-fluid logo-mrecK"
          alt="Logo"
        />
      </div>
      <div className="text-center mt-2 font-shadowK">
        <h5 className="mb-1">{city}</h5>
        {/* <p className="mb-0 small">1ST RAMAZAN 1446H</p> */}
        <p className="mb-0 small">{date}</p>
      </div>

      {/* Iftari Table */}
      <div className="d-flex flex-column align-items-center mt-3 w-100 sm-font">
        <table
          className="table w-75 text-center"
          style={{ borderSpacing: '2px', borderCollapse: 'separate' }} // Added spacing here
        >
          <tbody>
            <tr>
              <td className="text-left md-font align-middle border-0 head-colorK" rowSpan="2">Iftari</td>
              <td className="span-bgK font-headingK">HANAFI</td>
              <td className="span-bgK timeK">{iftariTime} </td>
            </tr>
            <tr>
              <td className="span-bgK font-headingK">JAFRI</td>
              <td className="span-bgK timeH">{iftariTimeJafria}</td>
            </tr>
            <tr className="spacing-row"></tr>
            {/* Sehri Table */}

            <tr>
              <td rowSpan="2" className="text-left md-font align-middle border-0 head-colorK">Sehri</td>
              <td className="span-bgK font-headingK">HANAFI</td>
              <td className="span-bgK timeH">{sehriTime}</td>
            </tr>
            <tr>
              <td className="span-bgK font-headingK">JAFRI</td>
              <td className="span-bgK timeH">{sehriTimeJafria}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <p className="p-note">Sehri and Iftar times may vary slightly (±1 min).</p> */}
      <p className="p-note m-0 p-0">Sehri and Iftar times may vary slightly (±1 min).</p>
    </div>
  );
}
