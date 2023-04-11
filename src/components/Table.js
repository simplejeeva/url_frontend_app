import React, { useEffect, useState } from "react";
import { API } from "../Global";

const Table = () => {
  const [url, setUrl] = useState([]);

  useEffect(() => getdata(), []);
  const getdata = () => {
    fetch(`${API}/api/shortURL/geturl`, { method: "GET" })
      .then((data) => data.json())
      .then((link) => {
        setUrl(link);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="container table-responsive">
      <table className="table table-striped  bg-light">
        <thead>
          <tr>
            <th scope="col">Long URL</th>
            <th scope="col">Short URL</th>
          </tr>
        </thead>
        <tbody>
          {url.map((url, index) => (
            <tr key={index}>
              <td>
                <a href={url.long} target="_blank" rel="noopener noreferrer">
                  {url.long}
                </a>
              </td>
              <td>
                <a
                  href={`${API}/api/shortURL/${url.short}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.short}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
