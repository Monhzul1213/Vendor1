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
  const [VendID, setVendID] = useState('');

  const { height } = useDimensions();
  const [data, setData] = useState([]);
  const [originaldata, setOriginalData] = useState([]);
  const [error, setError] = useState([]);
  
const [selected, setSelected] =useState(null);
  const [visible, setVisible] = useState(false);

  const addRequest = () => {
    // setError(null);
    setVisible(true)
    setSelected(null)
}


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
      setOriginalData(users)
      return Promise.resolve(setData(users))
     }).catch(error=> console.log(error.message))
  }
  // const getData = async (VendName) => {
  //   let filters = [{ "FieldName": "VendID", "Value": login?.vendID }];
  //   if(VendName) filters.push({ "FieldName": "VendName", "Value": VendName });
    
  //   let data = { BusinessObject: filters };
  //   setLoading(true);
  //   setError(null);
  //   const response = await dispatch(getList(login, 'InventoryInfo', data));
  //   response?.error ? setError(response?.error) : setData(response?.data?.inInventory);
  //   setLoading(false);
  //   if(!keepOpen) setVisible(false);
  // }

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
const changeVendID = value => {
    console.log(value);
    setVendID(value);
    let newData = originaldata?.filter(word => word.VendID.toLowerCase().includes(VendID.toLowerCase()) ) 
    // let originalData = data 
    setData(newData)
    // setData(originaldata)
}
let cardProps = { visible, setVisible, selected, setSelected,  setData,  VendID, setVendID: changeVendID  };
let filterProps = { addRequest,   setError, setData , setVisible ,VendID, setVendID: changeVendID };
  return (
        <>
          <Header/>
          <div className='page_container' style={{height: height - 58}} >
          {visible ? <Card onClose={onClose} {...cardProps} />: null}
            <div className='page_back'>
            {/* {error ? <Error error={error} /> : null} */}
            <Filter {...filterProps} />            
            <div className='data_back' id='inventory_page'>
              
            {data?.length ? <Table sortDirections={["descend"]} data={data} setData={setData} selected={selected} setVisible={setVisible} 
            setSelected={setSelected} />: <Empty />}
             </div>
            </div>
          </div>
      </>
    
    )
  }