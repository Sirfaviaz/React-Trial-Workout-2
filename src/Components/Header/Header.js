import React, { useEffect, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleSignOut = () => {
    auth.signOut();
    navigate('/login')
  };

  const loginhandle= ()=>{
    navigate('/login')
  }

  const handlesell=()=>{
    navigate('/create')
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=> {
          navigate('/')
        }} >
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <>
              <span>{user.displayName || user.email}</span>
              <button onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <>
              <span onClick={loginhandle}>Login</span>
              <hr />
            </>
          )}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={handlesell}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;






//export const SampleContext = createContext("abc")



// import { sampleContext } from ""


//  const sample = useContext(samplecontext)

// console.log(sample);



