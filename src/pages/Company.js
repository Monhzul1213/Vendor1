import React, { useState, useEffect } from 'react';
import { Filter, Table,Card ,Header} from '../components/company';
import {collection, doc, getDocs, query, where} from 'firebase/firestore'
import {db} from '../firebase'
import { useSelector, useDispatch } from 'react-redux';
import{Empty, Error} from '../components/all'
import { useDimensions } from '../helpers/useDimensions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getAuth, logout } from '../firebase';


import '../css/list.css'
// import LoadingOverlay from 'react-loading-overlay';
// LoadingOverlay.propTypes = undefined;
export function Company(){
  const login = useSelector(state => state.login?.user);
  const { height } = useDimensions();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  
const [selected, setSelected] =useState(null);
  const [visible, setVisible] = useState(false);

  const addRequest = () => {
    // setError(null);
    setVisible(true)
    setSelected(null)
}
// useEffect(() => {
//   console.log(login)
//   const scroll = document?.getElementById('price_page');
//   if(scroll) scroll.scrollLeft = visible ? scroll.scrollWidth : 0;
//   return () => {};
// }, [visible]);
let cardProps = { visible, setVisible, selected, setSelected,  setData };
  let filterProps = { addRequest,   setError, setData , setVisible};

  function getUser(){
    let users = []
    const userCollectionRef =collection(db, 'smVendorUsers')
    const q1 = query(userCollectionRef, where("CpnyID", "==",  login.CpnyID));
    // console.log(login.CpnyID)
     getDocs(q1 )
     .then(response=>{
      response.docs.map(doc => {
        let user = {...doc.data(), ...{ id: doc?.id }};
        console.log(user)
        users.push(user);
      })
      // console.log(users)
      setData(users)
      return Promise.resolve(setData(users))
     }).catch(error=> console.log(error.message))
  }

useEffect(() => {
    getUser();
    return () => {};
}, [])

  const onClose = toLoad => {
    setVisible(false);
    if(toLoad) {
      getUser()
    }
  }
  return (
        <>
          <Header/>
          <div className='page_container' style={{height: height - 58}} >
          {visible ? <Card onClose={onClose} {...cardProps} />: null}
            <div className='page_back'>
            {/* {error ? <Error error={error} /> : null} */}
            <Filter {...filterProps} />            
            <div className='data_back' id='inventory_page'>
            <Table data={data} setData={setData} selected={selected} setVisible={setVisible} 
            setSelected={setSelected} />  
            {/* <Empty /> */}
             </div>
            </div>
          </div>
      </>
    
    )
  }