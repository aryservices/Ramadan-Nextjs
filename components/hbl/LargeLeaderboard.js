import React from "react";
import "../styles/Home.module.css"; // Import the CSS module

export default function LongBanner2({
  loading,
  sehriTime,
  iftariTime,
  sehriTimeJafria,
  iftariTimeJafria,
  city,
  date,
}) {
  if (loading) {
    return (
      <div className="bgRamadanLargeLeaderboard d-flex flex-column  text-white">
        <div className="text-center">
          <div
            className="spinner-border "
            style={{ width: "3rem", height: "3rem", color: "#ffdb9d" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ color: "#ffdb9d", textShadow: "2px 3px 10px #000" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bgRamadanLargeLeaderboard d-flex flex-column  text-white">
      <div class="container">
        <div class="row px-5">
          <div class="col-3 d-flex flex-column align-items-center "> 
            <div className="text-center pb-1">
              <img
                src="/logo.png"
                className="img-fluid color-invert logo-large-leaderboard"
                alt="Logo"
              />
            </div>
            <div className="text-center font-shadow pt-1">
              <h5 className=" city-font-largeLeaderboard">{city}</h5>
              <p className="mb-0 small date-font-largeLeaderboard">{date}</p>
            </div>
          </div>

          <div class="col-4 d-flex justify-content-end align-items-center col-two-longBanner">
            {/* Iftari Table */}
            <div className="sm-font-largeLeaderboard">
              <table
                className="table text-center mb-0"
                style={{ borderSpacing: "2px", borderCollapse: "separate" }}
              >
                <tbody>
                  <tr className="text-center">
                    <td
                      className="text-left md-font-largeLeaderboard align-middle border-0 head-color"
                      rowSpan="2"
                    >
                      Iftari
                    </td>
                    <td className="span-bg-longBanner font-heading">HANAFI</td>
                    <td className="span-bg-longBanner time">{iftariTime} </td>
                  </tr>
                  <tr className="text-center">
                    <td className="span-bg-longBanner font-heading">JAFRI</td>
                    <td className="span-bg-longBanner time">
                      {iftariTimeJafria}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-4 d-flex justify-content-start align-items-center col-three-longBanner">
            {/* Iftari Table */}
            <div className="sm-font-largeLeaderboard">
              <table
                className="table text-left mb-0"
                style={{ borderSpacing: "2px", borderCollapse: "separate" }}
              >
                <tbody>
                  {/* Sehri Table */}

                  <tr className="text-center">
                    <td
                      rowSpan="2"
                      className="text-left md-font-largeLeaderboard align-middle border-0 head-color"
                    >
                      Sehri
                    </td>
                    <td className="span-bg-longBanner font-heading">HANAFI</td>
                    <td className="span-bg-longBanner time">{sehriTime}</td>
                  </tr>
                  <tr className="text-center">
                    <td className="span-bg-longBanner font-heading">JAFRI</td>
                    <td className="span-bg-longBanner time">
                      {sehriTimeJafria}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}
