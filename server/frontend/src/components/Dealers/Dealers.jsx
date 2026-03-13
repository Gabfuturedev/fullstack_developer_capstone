import React, { useState, useEffect, useCallback } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [fetchError, setFetchError] = useState("");
  // let [state, setState] = useState("")
  let [states, setStates] = useState([])

  // let root_url = window.location.origin
  let dealer_url ="/djangoapp/get_dealers";
  
  let dealer_url_by_state = "/djangoapp/get_dealers/";

  const readJsonResponse = async (res) => {
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const body = await res.text();
      throw new Error(`Expected JSON response but received: ${body.slice(0, 80)}`);
    }
    return res.json();
  };
 
  const filterDealers = async (state) => {
    try {
      dealer_url_by_state = dealer_url_by_state + state;
      const res = await fetch(dealer_url_by_state, {
        method: "GET"
      });
      const retobj = await readJsonResponse(res);
      if(retobj.status === 200) {
        let state_dealers = Array.from(retobj.dealers || [])
        setDealersList(state_dealers)
        setFetchError("")
      }
    } catch (err) {
      console.error(err);
      setDealersList([])
      setFetchError("Could not load dealers data from backend.")
    }
  }

  const get_dealers = useCallback(async ()=>{
    try {
      const res = await fetch(dealer_url, {
        method: "GET"
      });
      const retobj = await readJsonResponse(res);
      if(retobj.status === 200) {
        let all_dealers = Array.from(retobj.dealers || [])
        let states = [];
        all_dealers.forEach((dealer)=>{
          states.push(dealer.state)
        });

        setStates(Array.from(new Set(states)))
        setDealersList(all_dealers)
        setFetchError("")
      }
    } catch (err) {
      console.error(err);
      setDealersList([])
      setFetchError("Could not load dealers data from backend.")
    }
  }, [dealer_url])
  useEffect(() => {
    get_dealers();
  }, [get_dealers]);  


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return(
  <div>
      <Header/>
      {fetchError ? <p>{fetchError}</p> : null}

     <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Dealer Name</th>
          <th>City</th>
          <th>Address</th>
          <th>Zip</th>
          <th>
            <select name="state" id="state" defaultValue="" onChange={(e) => filterDealers(e.target.value)}>
              <option value="" disabled hidden>State</option>
              <option value="All">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </th>
          {isLoggedIn ? (
            <th>Review Dealer</th>
           ):<></>
          }
        </tr>
      </thead>
      <tbody>
      {dealersList.map(dealer => (
        <tr key={dealer['id']}>
          <td>{dealer['id']}</td>
          <td><a href={'/dealer/'+dealer['id']}>{dealer['full_name']}</a></td>
          <td>{dealer['city']}</td>
          <td>{dealer['address']}</td>
          <td>{dealer['zip']}</td>
          <td>{dealer['state']}</td>
          {isLoggedIn ? (
            <td><a href={`/dealer/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="View Dealer"/></a></td>
           ):<></>
          }
        </tr>
      ))}
      </tbody>
     </table>;
  </div>
)
}

export default Dealers
