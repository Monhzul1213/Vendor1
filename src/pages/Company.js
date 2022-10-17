import React, { useState, useEffect } from 'react';
import { Filter, Table,Card ,Header} from '../components/company';
import {collection, doc, getDocs, query, where} from 'firebase/firestore'
import {db} from '../firebase'
import { useSelector, useDispatch } from 'react-redux';
import{Empty, Error} from '../components/all'
import { useDimensions } from '../helpers/useDimensions';
import '../css/list.css'

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

 async function getUser(){
    let users = []
    const userCollectionRef =collection(db, 'smVendorUsers')
    const q1 = query(userCollectionRef, where("CpnyID", "==", login.CpnyID));
    console.log(login.CpnyID)
    await getDocs(q1)
    .then(response=>{
      response.docs.map(doc => {
        let user = {...doc.data(), ...{ id: doc?.id }};
        // console.log(user)
        users.push(user);
      })
      setData(users)
      setOriginalData(users)
      return Promise.resolve(setData(users))
     }
     ).catch(error=> console.log(error.message))
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
const changeVendID = value => {
    console.log(value);
    setVendID(value);
    let newData = originaldata?.filter(word => word.VendID.toLowerCase().includes(VendID.toLowerCase()) ) 
    setData(newData)
}

let cardProps = { visible, setVisible, selected, setSelected,  setData,  VendID, setVendID: changeVendID  };
let filterProps = { addRequest,   setError, setData , setVisible ,VendID, setVendID: changeVendID };
  return (
      <>
        <Header/>
        <div className='page_container' style={{height: height - 58}} >
          {visible ? <Card onClose={onClose} {...cardProps} />: null}
            <div className='page_back'>
              <Filter {...filterProps} />            
              <div className='data_back' id='inventory_page'>
              {data?.length ? <Table classname='table1' sortDirections={["descend"]} data={data} setData={setData} selected={selected} setVisible={setVisible} 
              setSelected={setSelected} />: <Empty />}
            </div>
          </div>
        </div>
      </>
    )
  }