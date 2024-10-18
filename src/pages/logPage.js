import React from "react";
import { Loginpage } from "../pages/loginpage";

const LogPage = () => {
  return (
    <>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <a className="app-brand-link gap-2">
                    <span className="app-brand-logo demo"></span>
                    <span className="app-brand-text demo text-body fw-bolder">
                      ISAMM
                    </span>
                  </a>
                </div>

                <h4 className="mb-2">Welcome to Our platform! 👋</h4>
                <p className="mb-4">
                  Please sign-in to your account and start{" "}
                </p>

                <Loginpage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogPage;
