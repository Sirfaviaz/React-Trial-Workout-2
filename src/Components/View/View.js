import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import {doc,collection,getDoc} from 'firebase/firestore'

function View() {
  const [userDetails, setUserDetails] = useState({});
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        try {
          const userDocRef = doc(collection(db, 'user'), postDetails.userId); 
          const userDocSnapshot = await getDoc(userDocRef); 
  
          if (userDocSnapshot.exists()) {
            setUserDetails(userDocSnapshot.data());
          } else {
            console.error("User document does not exist");
          }
        } catch (error) {
          console.error("Error fetching user details: ", error);
        }
      }
    };
  
    fetchUserDetails();
  }, [postDetails, db]);
  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl}
          alt={postDetails?.name || "Product image"}
        
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{new Date(postDetails?.createdAt).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
