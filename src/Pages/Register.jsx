import React, { useState } from "react";
import add from "../images/addAvatar.png";
import { sendSignInLinkToEmail, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {

    // it will stop the page from reloading
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].value;

    // create user
    const res = await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        uploadTask.on(
          (err) => {
            // Handle unsuccessful uploads
            setErr(true);
          },
          () => {
            // Download url
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                console.log(downloadURL);
                // create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
              }
            );
          }
        );
      })
      .catch((err) => {
        setErr(true);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">SWARNAB Chat</span>
        <span className="title">Register</span>
        <form>
          <input required type="text" placeholder="Username" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button onSubmit={handleSubmit}>Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
