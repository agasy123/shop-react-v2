import { React, useState } from "react";
import {
  ClerkProvider,
  useUser,
  SignedIn,
  SignIn,
  SignInButton,
  SignOutButton,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import UserAuth from "./userAuth";
import EditItems from "./edit";
import New_item from "./new_item";

function User() {
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  if (UserAuth()[0]) {
    const toggleEdit = () => {
      setIsEdit(!isEdit);
    };
    const toggleNew = () => {
      setIsNew(!isNew);
    };

    return (
      <div style={{display:"flex", alignItems:"flex-start"}}>
        <button onClick={toggleEdit}>
          {isEdit ? "Close Edit" : "Open Edit"}
        </button>
        {isEdit && <EditItems />}
        <button onClick={toggleNew}>
          {isNew ? "Close New Items" : "Open New items"}
        </button>
        {isNew && <New_item />}
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

function Admin() {
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

export default Admin;
