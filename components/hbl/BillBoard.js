import React from "react";
import "../styles/Home.module.css"; // Import the CSS module

export default function BillBoard({
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
      <div className="bgRamadanBillBoard d-flex flex-column align-items-center justify-content-center text-white">
        <div className="text-center mt-5">
          <div
            className="spinner-border "
            style={{ width: "3rem", height: "3rem", color: "#ffdb9d" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p
            className="mt-3"
            style={{ color: "#ffdb9d", textShadow: "2px 3px 10px #000" }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bgRamadanBillBoard d-flex flex-column align-items-center justify-content-around text-white">
      <div className="text-center pb-2">
        <img
          src="/logo.png"
          className="img-fluid color-invert logo-billboard"
          alt="Logo"
        />
      </div>
      <div className="text-center mt-2 font-shadow">
        <h5 className="mb-1 city-font-BillBoard">{city}</h5>
        {/* <p className="mb-0 small">1ST RAMAZAN 1446H</p> */}
        <p className="mb-0 small date-font-BillBoard">{date}</p>
      </div>
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-4 d-flex justify-content-end align-items-center col-two-longBanner">
            {/* Iftari Table */}
            <div className="sm-font-BillBoard">
              <table
                className="table text-center mb-0"
                style={{ borderSpacing: "2px", borderCollapse: "separate" }}
              >
                <tbody>
                  <tr className="text-center">
                    <td
                      className="text-left md-font-BillBoard align-middle border-0 head-color"
                      rowSpan="2"
                    >
                      Iftari
                    </td>
                    <td className="span-bg-longBanner font-heading">HANAFI</td>
                    <td className="span-bg-longBanner time">{iftariTime} </td>
                  </tr>
                  <tr className="text-center">
                    <td className="span-bg-longBanner font-heading">JAFRI</td>
                    <td className="span-bg-longBanner time">{iftariTimeJafria}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-4 d-flex justify-content-start align-items-center col-three-longBanner">
            {/* Iftari Table */}
            <div className="sm-font-BillBoard">
              <table
                className="table text-left mb-0"
                style={{ borderSpacing: "2px", borderCollapse: "separate" }}
              >
                <tbody>
                  {/* Sehri Table */}

                  <tr className="text-center">
                    <td
                      rowSpan="2"
                      className="text-left md-font-BillBoard align-middle border-0 head-color"
                    >
                      Sehri
                    </td>
                    <td className="span-bg-longBanner font-heading">HANAFI</td>
                    <td className="span-bg-longBanner time">{sehriTime}</td>
                  </tr>
                  <tr className="text-center">
                    <td className="span-bg-longBanner font-heading">JAFRI</td>
                    <td className="span-bg-longBanner time">{sehriTimeJafria}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="p-note-billboard m-0 pt-2 text-center">
          Sehri and Iftar times may vary slightly (±1 min).
        </p>
      </div>
      
    </div>
  );
}
