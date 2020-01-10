import React from "react";
import "../sass/footer.scss";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 copyright">
            <p>
              Copyright ©<span> 2019 </span>Juho Lehtimäki
            </p>
          </div>
          <div className="col-sm-6 social">
            <a name="github-link" href="https://github.com/juholehtimaki">
              <i className="fab fa-github" aria-hidden="true"></i>
            </a>
            <a
              className="linkedi-lnik"
              href="https://linkedin.com/in/juho-lehtimaki-32aa5819a"
            >
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
