import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import donwloadIcon from "./assets/dl.png";
import diavgeiaLogo from "./assets/diavgeia.png";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const afm = process.env.REACT_APP_AFM;
    fetch(
      `https://diavgeia.gov.gr/opendata/search/advanced.json?q=receiverAFM:"${afm}"`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        let decisions = actualData.decisions;
        setData(decisions);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      });
  }, []);
  return (
    <>
      <Header></Header>
      <main>
        <Container>
          <a
            href={"https://diavgeia.gov.gr"}
            target="_blank"
            className="d-flex justify-content-center"
            rel="noreferrer"
          >
            <img src={diavgeiaLogo} alt="diavgeia" />
          </a>
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Τίτλος</th>
                <th scope="col">Αριθμός πρωτοκόλλου</th>
                <th scope="col">ΑΔΑ</th>
                <th scope="col">Υπογραφή με</th>
                <th scope="col">Αρχείο</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map(
                  ({
                    ada,
                    subject,
                    protocolNumber,
                    extraFieldValues,
                    documentUrl,
                  }) => (
                    <tr key={data}>
                      <td>{subject}</td>
                      <td>{protocolNumber}</td>
                      <td>{ada}</td>
                      <td>{extraFieldValues.org.name}</td>
                      <td className="filetd">
                        <a
                          href={documentUrl}
                          rel="noreferrer"
                          target={"_blank"}
                        >
                          <img className="dlicon" alt="dl" src={donwloadIcon} />
                        </a>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          {data && data.length === 0 && (
            <h4 className="text-center">Δεν υπάρχουν αποφάσεις</h4>
          )}
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}
