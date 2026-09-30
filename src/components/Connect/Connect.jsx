
import "./ConnectDesktop.css";
import "./Connect.css";

import ConnectDesktop from "./ConnectDesktop.jsx";
import ConnectForm from "./ConnectForm.jsx";
import SectionHeading from "../SectionHeading.jsx";

const TABLE_IMAGE = "/images/connect/table.png";

import {SITE } from "../../config/site.js";

/* =========================================================
   CONNECT SECTION
   ========================================================= */

export default function Connect() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="connect-section"
      aria-labelledby="connect-title"
    >
      {/* decorative table behind everything */}
      <img
        className="connect-table-image"
        src={TABLE_IMAGE}
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <div className="connect-inner">
        <SectionHeading id="connect-title">
          let&apos;s connect
        </SectionHeading>

        <div className="connect-layout">
          <ConnectDesktop id= "ConnectDesktop" />
          <ConnectForm />
        </div>

        <p className="connect-copyright">
          © {currentYear} {SITE.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}