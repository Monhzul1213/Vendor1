
import React, { useEffect, useState } from 'react';
import { Modal, message, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {addDoc, collection , doc, setDoc, query, where} from 'firebase/firestore';
import {db} from '../../firebase'
import '../../css/card.css';
//  import { sendRequest } from '../../services/constants.slice';
import { formatNumber } from '../../helpers/formatNumber';
import { CardDate, CardDateRange, CardInput, CardField, CardNote, Loader, DynamicAIIcon, Error, CardDropdown } from '../all';
import  {useSelector} from 'react-redux'
import validator from 'validator'
import Password from 'antd/lib/input/Password';
import { login } from '../../services';
import { confirmPasswordReset } from 'firebase/auth';

export function Card(props){
  const login = useSelector(state => state.login?.user);
  const { visible,  data, onClose} = props;
  const { selected, setSelected,  setData } = props;
    const { t } = useTranslation();
    const [disabled, setDisabled] = useState();
  const [numbers, setNumbers] = useState('');
  const [note, setNote] = useState({ value: '', error: null });
  const [total, setTotal] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [Email, setEmail] = useState({ value: '', error: null });
  const [CpnyID, setCpnyID] = useState({ value: '', error: null});
  const [VendUserID, setVendUserID] = useState({ value: '', error: null });
  const [VendPass, setVendPass] = useState({ value: '', error: null });
  const [VendID, setVendID] = useState({ value: '', error: null });
  const [UseLicenseDate, setUseLicenseDate] = useState({ value: '', error: null })
  const [LicenseExpireDate, setLicenseExpireDate] = useState({ value: '', error: null });
  const [Address, setAddress] = useState({ value: '', error: null });
  const [Phone, setPhone] = useState({ value: '', error: null });
  const [Bank, setBank] = useState({ value: '', error: null });
  const [BankAcct, setBankAcct] = useState({ value: '', error: null });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setEmail({ value: selected?.Email ?? '' });
    setCpnyID({ value: selected?.CpnyID ?? login?.CpnyID });
    setVendUserID({ value: selected?.VendUserID ?? '' });
    setVendPass({ value: selected?.VendPass ?? '' });
    setVendID({ value: selected?.VendID ?? '' });
    setUseLicenseDate({ value: selected?.UseLicenseDate ?? '' });
    // setLicenseExpireDate({ value: selected?.LicenseExpireDate ?? '' });
    // console.log(selected?.ReqDate)
    setLicenseExpireDate({ value: selected?.ReqDate ? moment(selected?.ReqDate, 'yyyy.MM.DD') : null });
    setAddress({ value: selected?.Address ?? '' });
    setPhone({ value: selected?.Phone ?? '' });
    setBank({ value: selected?.Bank ?? '' });
    setBankAcct({ value: selected?.BankAcct ?? '' });
    setDisabled(disabled);
    
    return () => {};
  }, [selected]);
  
   function handleSubmit(e){
    e.preventDefault()
    console.log('saving butoom')
    if(VendUserID?.value && VendPass?.value &&VendID?.value &&UseLicenseDate?.value &&LicenseExpireDate?.value  &&Phone?.value &&Address?.value &&  Email?.value&& Bank?.value && BankAcct?.value  ){
      // console.log(VendUserID,)

      setLoader(true);
      setError(null);
      let requests = [{
        // PurchasePrice: BankAcct?.value, 
        // PurchasePrice: Phone?.value, 

        ReqDate: LicenseExpireDate?.value?.format('yyyy.MM.DD')
      }];
      // if(selected) requests[0].RequestID = selected.RequestID;
      console.log(requests);
    if(selected){
      const userRef= doc(db, 'smVendorUsers', selected.id)
      setDoc(userRef, {CpnyID: CpnyID?.value, VendUserID:VendUserID?.value, VendPass:VendPass?.value, VendID:VendID?.value, UseLicenseDate:UseLicenseDate?.value , LicenseExpireDate: LicenseExpireDate?.value?.format('yyyy.MM.DD'), Address:Address?.value, Phone:Phone?.value, Bank:Bank?.value, BankAcct:BankAcct?.value , Email:Email?.value})
    }else{
    const userCollRef= collection(db, 'smVendorUsers')
    // const q1 = query(userCollRef, where("VendUserID", "!=", 'semjidmaa@noyonuul.mn'));
    // let webUser = null;
  //  forEach(doc => webUser = setData());
    addDoc(userCollRef, {CpnyID: CpnyID?.value, VendUserID:VendUserID?.value, VendPass:VendPass?.value, VendID:VendID?.value, UseLicenseDate:UseLicenseDate?.value , LicenseExpireDate: LicenseExpireDate?.value?.format('yyyy.MM.DD'), Address:Address?.value, Phone:Phone?.value, Bank:Bank?.value, BankAcct:BankAcct?.value , Email:Email?.value})
    .then(response => {  
      if(response?.error){
        setError(response?.error);
      }
      console.log(response)
    })
    }
    
    onClose(true);
    message.success(t('request_success'));
    } else {
      if(!VendUserID?.value) setVendUserID({ error: 'is_empty'});
      if(!VendPass?.value) setVendPass({value: '', error: 'is_empty'});
      if(!UseLicenseDate?.value) setUseLicenseDate({value: '', error: 'is_empty'});
      if(!VendID?.value) setVendID({value: '', error: 'is_empty'});
      if(!LicenseExpireDate?.value) setLicenseExpireDate({value: '', error: 'is_empty'});
      if(!Bank?.value) setBank({value: '', error: 'is_empty'});
      if(!BankAcct?.value) setBankAcct({value: '', error: 'is_empty'});
      if(!Phone?.value) setPhone({value: '', error: 'is_empty'});
      if(!Address?.value) setAddress({value: '', error: 'is_empty'});
      if(!Email?.value) setEmail({value: '', error: 'is_empty'});
    }
  }
  // const changeBankAcct = value => {
  //   if(isNaN(value?.value)) setBankAcct({ value: value?.value, error: 'must_number'});
  //   else setBankAcct(value);
  // }
  // const changeEmail = (value) => {
  //   // setVendUserID (value?.value);
  //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(VendUserID)) {
  //     setVendUserID({ value: value?.value, error: 'must_number'})
  //   } else {
  //     setVendUserID(value)
  //   }
  // }
  // const handleChange = () => {
  //   if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/.test(VendUserID))
  //    {
  //     setError('Email is valid');
  //   } else {
  //     setError("invalid");
  //   }

    // setMessage(event.target.value);
  // };
  // const changeEmail = value => {
  //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i(value?.value)) 
  //   setCpnyID({ value: value?.value, error: 'must_number'})
  //     // setError('Email is invalid');
  //    else 
  //    setCpnyID(value);
    

  //   // setCpnyID(e.target.value);
  //   // if(isNaN(value?.value)) setEmail({ value: value?.value, error: 'бүртгэлтэй байна'});
  //   // else setEmail(value);
  // } 
  return (
    <Modal title={null} footer={null} closable={false} visible={visible} 
     width={700} >
      
      <DynamicAIIcon name='AiFillCloseCircle' className='close_icon' onClick={() => onClose(false)} />
      <p className='card_title'>Шинэ Нийлүүлэгч</p>
      {error ? <Error error={error} /> : null}
     <form className= 'card_container'
      onSubmit={handleSubmit}>
        <div className='cart'>
      <div className='card1'>
        
          <CardInput label={('user_email')} value={VendUserID} setValue={setVendUserID}/>
      
      <CardInput label={('user_password')} type='password' value={VendPass} setValue={setVendPass}/>
      </div>
      <div className='card2'>
   
      <CardInput label={('table.company')} disabled={true}  value={CpnyID} setValue={setCpnyID} />
      <CardInput label={('table.vendor')} value={VendID} setValue={setVendID}  /></div>
      <div className='card3'>
      <CardInput label={('table.uselicensedate')} value={UseLicenseDate} setValue={setUseLicenseDate}  />
      <CardDate label={('table.licenseExpireDate')} value={LicenseExpireDate} setValue={setLicenseExpireDate}  disabledDate={d => !d || d.isBefore(moment().format('yyyy.MM.DD'))}/>
      </div>
      <div className='card4'>
      <CardInput label={('table.bank')} className='card_input' value={Bank} setValue={setBank}  />
      <CardInput label={('table.bankacct')} className='card_input' value={BankAcct} setValue={setBankAcct}  /></div>
      <div className='card5'>
      <CardInput label={('table.phone')} className='card_input' value={Phone} setValue={setPhone}  />
      <CardInput label={('login.email')} className='card_input'  value={Email} setValue={setEmail}  /></div>
      <div className='card'>
      <CardNote label={('table.address')}   className='card_input' value={Address} setValue={setAddress}  /></div>
      </div>
      <button type='submit'
      className='login_form_btn'> 
      {loading === 'saving' ? <Loader className='login_loader' color='#fff' /> : t('save')}    
      </button>  
    </form>
    </Modal>
  )
}