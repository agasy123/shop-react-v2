import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserAuth from "./userAuth";
import { SignOutButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function check_price(x, y) {
  if (x && x !== 0) {
    return (
      <div>
        <h2>{x} $</h2>
        <h2 id="old-price">{y} $</h2>
      </div>
    );
  } else {
    return <h2>{y} $</h2>;
  }
}

 function User() {
  const [data, setData] = useState();
  const apiGet = () => {
    fetch("http://agasy.shop:5000/data")
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  };
  useEffect(() => {
    apiGet();
  }, []);
  const routeParams = useParams();
  const path = "../";
  const handleUpdate = async () => {
    await fetch("http://162.250.126.167:5000/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (UserAuth()[0]) {
    return (
      <div>
        {data?.map((item) => {
          if (item.id == routeParams.id) {
            return (
              <article className="singleArticle" key={item.id}>
                {/* ---------------------------name----------------------------- */}
                <h1>{item.name}</h1>
                <input
                  style={{ marginBottom: "70px" }}
                  placeholder={item.name}
                  onChange={(e) => {
                    if (e.target.value != "") {
                      item.name = e.target.value;
                    }
                  }}
                ></input>
                <div className="singlePage">
                  {/* ---------------------------image----------------------------- */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <img src={path + item.image} alt="not found"></img>
                    <input
                      onChange={(e) => {
                        item.image = e.target.files.item(0).name;
                      }}
                      type="file"
                    ></input>
                  </div>
                  <div className="singleDescp">
                    {/* ---------------------------description----------------------------- */}
                    <h3>{item.description}</h3>
                    <textarea
                      onChange={(e) => {
                        if (e.target.value != "") {
                          item.description = e.target.value;
                        }
                      }}
                    ></textarea>
                    {/* ---------------------------price----------------------------- */}
                    {check_price(item.sale_price, item.price)}
                    <input
                      placeholder={item.price}
                      onChange={(e) => {
                        if (e.target.value != "") {
                          item.price = e.target.value;
                        }
                      }}
                    ></input>
                  </div>
                  <div className="specs">
                    <h1>Specifications</h1>
                    {/* ---------------------------chipset----------------------------- */}
                    <div className="specs_div">
                      <div>
                        <p className="specs_span">Chipset: </p>
                        <p className="specs_p">{item.chipset}</p>
                      </div>
                      <br></br>
                      <input
                        placeholder={item.chipset}
                        onChange={(e) => {
                          if (e.target.value != "") {
                            item.chipset = e.target.value;
                          }
                        }}
                      ></input>
                    </div>
                    {/* ---------------------------display_size----------------------------- */}
                    <div className="specs_div">
                      <div>
                        <span className="specs_span">Display Size: </span>
                        <span>{item.display_size}"</span>
                      </div>
                      <br></br>
                      <input
                        placeholder={item.display_size}
                        onChange={(e) => {
                          if (e.target.value != "") {
                            item.display_size = e.target.value;
                          }
                        }}
                      ></input>
                    </div>
                    {/* ---------------------------camera----------------------------- */}
                    <div className="specs_div">
                      <div>
                        <span className="specs_span">Camera: </span>
                        <span>{item.camera} Mp</span>
                      </div>
                      <br></br>
                      <input
                        placeholder={item.camera}
                        onChange={(e) => {
                          if (e.target.value != "") {
                            item.camera = e.target.value;
                          }
                        }}
                      ></input>
                    </div>
                    {/* ---------------------------storage----------------------------- */}
                    <div className="specs_div">
                      <div>
                        <span className="specs_span">Storage: </span>
                        <span>{item.storage} Gb</span>
                      </div>
                      <br></br>
                      <input
                        placeholder={item.storage}
                        onChange={(e) => {
                          if (e.target.value != "") {
                            item.storage = e.target.value;
                          }
                        }}
                      ></input>
                    </div>
                    {/* ---------------------------memory----------------------------- */}
                    <div className="specs_div">
                      <div>
                        <span className="specs_span">Memory: </span>
                        <span>{item.memory} Gb</span>
                      </div>
                      <br></br>
                      <input
                        placeholder={item.memory}
                        onChange={(e) => {
                          if (e.target.value != "") {
                            item.memory = e.target.value;
                          }
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
                <a
                  className="singlePageButton"
                  href="../admin"
                  onClick={handleUpdate}
                >
                  Submit
                </a>
              </article>
            );
          }
        })}
      </div>
    );
  } else {
    return (
      <h1>
        Welcome {UserAuth()[1]}, you have to sign in as Admin to continue{" "}
        <SignOutButton />
      </h1>
    );
  }
}

export default function SingleEdit(params) {
  return (
    <div className="homediv">
      <SignedIn>
        <User />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
