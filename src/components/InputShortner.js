import { useFormik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import { API } from "../Global";
import NavBar from "./NavBar";
import Table from "./Table";

const InputShortner = () => {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      long: "",
    },
    onSubmit: async (values) => {
      await fetch(`${API}/api/shortURL/createshorturl`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success("URL Shrinked");
          } else {
            toast.error("url already exist");
          }
        })
        .catch((e) => console.log("ERROR"));
    },
  });
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }
  return (
    <div className="input-container container-fluid">
      <NavBar />
      <h1 className="fw-bold text-light text-center my-5">
        URL<span className="text-warning mx-2">Shortner</span>
      </h1>
      <div className="row my-3">
        <form
          className="col-sm-12 col-md-12 col-lg-8 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="input-group mb-3">
            <input
              type="text"
              name="long"
              placeholder="Paste Here Long Url..."
              className="form-control"
              onChange={handleChange}
              value={values.long}
            />
            <button
              type="submit"
              onClick={refreshPage}
              className="btn btn-warning"
            >
              Shorten
            </button>
          </div>
        </form>
      </div>

      <Table />
    </div>
  );
};

export default InputShortner;
