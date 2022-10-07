
import React, { useEffect, useState, useRef} from 'react';
import { Modal, message, Form, Input, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {addDoc, collection , doc, setDoc, query, where, getDocs} from 'firebase/firestore';
import {db} from '../../firebase'
import '../../css/card.css';
//  import { sendRequest } from '../../services/constants.slice';
import { formatNumber } from '../../helpers/formatNumber';
import {Cardlength, CardDate, CardDateRange, CardInput, CardInput1, CardField, CardNote, Loader, DynamicAIIcon, Error1, CardDropdown, Check, CardPassword } from '../all';
import  {useSelector} from 'react-redux'

export function Card(props){
  const login = useSelector(state => state.login?.user);
  const { visible,  data, onClose} = props;
  const { selected, setSelected,  setData } = props;
    const { t } = useTranslation();
    const [disabled, setDisabled] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [Email, setEmail] = useState({ value: '', error: null });
  const [CpnyID, setCpnyID] = useState({ value: '', error: null});
  const [CpnyName, setCpnyName] = useState({ value: '', error: null});
  const [VendUserID, setVendUserID] = useState({ value: '', error: null });
  const [VendPass, setVendPass] = useState({ value: '', error: null });
  const [VendID, setVendID] = useState({ value: '', error: null });
  const [VendName, setVendName] = useState({ value: '', error: null });
  const [UseLicenseDate, setUseLicenseDate] = useState({ value: '', error: null })
  const [LicenseExpireDate, setLicenseExpireDate] = useState({ value: '', error: null });
  const [Address, setAddress] = useState({ value: '', error: null });
  const [Phone, setPhone] = useState({ value: '', error: null });
  const [Bank, setBank] = useState({ value: '', error: null });
  const [BankAcct, setBankAcct] = useState({ value: '', error: null });
  const [CreatedProgID, setCreatedProgID] = useState({ value: '', error: null });
  const [ CreatedDate, setCreatedDate] = useState({ value: '', error: null });
  const [CreatedUserName, setCreatedUserName] = useState({ value: '', error: null });
  const [LastUpdate, setLastUpdate] = useState({ value: '', error: null });
  const [LastUserName, setLastUserName] = useState({ value: '', error: null });
  const [IsFirst, setIsFirst] = useState({ value: 'Y', error: null });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setEmail({ value: selected?.Email ?? '' });
    setCpnyID({ value: selected?.CpnyID ?? '' });
    setCpnyName({ value: selected?.CpnyName ?? login?.CpnyName });
    setVendUserID({ value: selected?.VendUserID ?? '' });
    setVendPass({ value: selected?.VendPass ?? '' });
    setVendID({ value: selected?.VendID ?? '' });
    setUseLicenseDate(selected?.UseLicenseDate ?? 'Y');
    setLicenseExpireDate({ value: selected?.LicenseExpireDate ? moment(selected?.LicenseExpireDate, 'yyyy.MM.DD') : null });
    setAddress({ value: selected?.Address ?? '' });
    setPhone({ value: selected?.Phone ?? '' });
    setBank({ value: selected?.Bank ?? '' });
    setBankAcct({ value: selected?.BankAcct ?? '' });
    setVendName({ value: selected?.VendName ?? '' });
    setCreatedDate({value:  selected?.CreatedDate ?? '' })
    setDisabled(disabled);
    
    return () => {};
  }, [selected]);
  
   async function handleSubmit(e){
    e.preventDefault()
    console.log(UseLicenseDate)
    // return;
    if(CpnyName?.value && VendUserID?.value && isValidEmail(VendUserID?.value) && VendPass &&VendID?.value &&VendName?.value &&UseLicenseDate   &&Phone?.value && !isNaN(Phone?.value)&&Address?.value &&  Email?.value&& isValidEmail(Email?.value) && Bank?.value && BankAcct?.value && !isNaN(BankAcct?.value)  ){
      setLoader(true);
      setError(null);
      let requests = [{
        // PurchasePrice: BankAcct?.value, 
        // PurchasePrice: Phone?.value, 

        ReqDate: LicenseExpireDate?.value?.format('yyyy.MM.DD')
      }];
      // if(selected) requests[0].RequestID = selected.RequestID;
      // console.log(requests);
    if(selected){
      let exists = [];
      const userRef= doc(db, 'smVendorUsers', selected.id)
      // const q1 = query(userRef, where("VendUserID", "==", VendUserID?.value?.trim() ));
      // const response = await getDocs(q1);
      // response.docs.map(doc => {
      //     let user = (doc.data());
      //     exists.push(user.CpnyID)
      //    })
      // let isVal = exists.includes(CpnyID?.value)
      // console.log(q1)
      if(LicenseExpireDate?.value) {
        let obj ={CpnyID: CpnyID?.value,CpnyName: CpnyName?.value,  VendUserID:VendUserID?.value?.trim().toLowerCase(), VendPass:VendPass?.value, VendID:VendID?.value, VendName:VendName?.value, UseLicenseDate:UseLicenseDate , LicenseExpireDate: LicenseExpireDate?.value?.format('yyyy.MM.DD')
          , Address:Address?.value, Phone:Phone?.value, Bank:Bank?.value, BankAcct:BankAcct?.value , IsFirst: IsFirst?.value, Email:Email?.value, CreatedDate: CreatedDate?.value, LastUserName: VendName?.value, LastUpdate:  moment().format('yyyy.MM.DD, HH:mm:ss ')
       
          } 
          setDoc(userRef, obj )
          onClose(true);
          message.success(t('request_success'));
    
        } 
        else if(LicenseExpireDate?.value== null){
          let obj ={CpnyID: CpnyID?.value,CpnyName: CpnyName?.value,  VendUserID:VendUserID?.value?.trim().toLowerCase(), VendPass:VendPass?.value, VendID:VendID?.value, VendName:VendName?.value, UseLicenseDate:UseLicenseDate 
          , Address:Address?.value, Phone:Phone?.value, Bank:Bank?.value, BankAcct:BankAcct?.value ,IsFirst: IsFirst?.value, Email:Email?.value, CreatedDate: CreatedDate?.value, LastUserName: VendName?.value, LastUpdate:  moment().format('yyyy.MM.DD, HH:mm:ss ')
          } 
          setDoc(userRef, obj )
          onClose(true);
          message.success(t('request_success'));
        }      
    }
    else{
        let exists = [];
        const userCollRef= collection(db, 'smVendorUsers')
        const q1 = query(userCollRef, where("VendUserID", "==", VendUserID?.value?.trim() ));
        const response = await getDocs(q1);
        response.docs.map(doc => {
            let user = (doc.data());
            exists.push(user.CpnyID)
           })
        let isVal = exists.includes(CpnyID?.value)
        // console.log(exists, isVal,CpnyID?.value )
        if(isVal){
          setError("Хэрэглэгч бүртгэлтэй байна")
        }  else {
          if(LicenseExpireDate?.value) {
            let obj = {
              CpnyID: CpnyID?.value,CpnyName: CpnyName?.value, VendUserID:VendUserID?.value?.trim().toLowerCase(), VendPass:VendPass?.value, VendID:VendID?.value,  VendName:VendName?.value, UseLicenseDate:UseLicenseDate ,
              LicenseExpireDate: LicenseExpireDate?.value?.format('yyyy.MM.DD'), 
              Address:Address?.value, Phone:Phone?.value, Bank:Bank?.value, BankAcct:BankAcct?.value , Email:Email?.value,CreatedDate: moment().format('yyyy.MM.DD, HH:mm:ss '), 
              IsFirst: IsFirst?.value, CreatedUserName: VendName?.value, LastUserName: VendName?.value, LastUpdate:  moment().format('yyyy.MM.DD, h:mm:ss ')
            }
            addDoc(userCollRef,  obj)
            onClose(true);
            message.success(t('request_success'));
        
            }  
            else if(LicenseExpireDate?.value== null){
            let obj ={CpnyID: CpnyID?.value,CpnyName: CpnyName?.value,  VendUserID:VendUserID?.value?.trim().toLowerCase(), VendPass:VendPass?.value, VendID:VendID?.value, VendName:VendName?.value, UseLicenseDate:UseLicenseDate 
            , Address:Address?.value, Phone:Phone?.value, Bank:Bank?.value, BankAcct:BankAcct?.value , Email:Email?.value, IsFirst: IsFirst?.value, CreatedDate: moment().format('yyyy.MM.DD, HH:mm:ss '), LastUserName: VendName?.value, LastUpdate:  moment().format('yyyy.MM.DD, HH:mm:ss ')
            } 
            addDoc(userCollRef,  obj)
            onClose(true);
            message.success(t('request_success'));
              }
        }
    }
    } else {
      if(!CpnyName?.value) setCpnyName({value: '', error: 'is_empty'});
      if(!VendUserID?.value) setVendUserID({value: '', error: 'is_empty'});
      if(!VendPass?.value) setVendPass({value: '', error: 'is_empty'});
      if(!VendName?.value) setVendName({value: '', error: 'is_empty'});
      if(!VendID?.value) setVendID({value: '', error: 'is_empty'});
      // if(!LicenseExpireDate?.value) setLicenseExpireDate({value: '', error: 'is_empty'});
      if(!UseLicenseDate?.value) setUseLicenseDate({value: '', error: 'is_empty'});
      if(!Bank?.value) setBank({value: '', error: 'is_empty'});
      if(!BankAcct?.value) setBankAcct({value: '', error: 'is_empty'});
      if(!Phone?.value) setPhone({value: '', error: 'is_empty'});
      if(!Address?.value) setAddress({value: '', error: 'is_empty'});
      if(!Email?.value) setEmail({value: '', error: 'is_empty'});
      // else if(!isValidEmail(Email?.value)) setEmail({value: '', error: 'is_invalid'});
      // else if(!isValidEmail(VendUserID?.value)) setVendUserID({value: '', error: 'is_invalid'});
       if(!isValidEmail(VendUserID?.value)) setVendUserID({...VendUserID, ...{error: 'is_invalid'}});
       if(!isValidEmail(Email?.value)) setEmail({...Email, ...{error: 'is_invalid'}});
       else if(isNaN(Phone?.value)) setPhone({...Phone, ...{error: 'must_number'}});
       else if(isNaN(BankAcct?.value)) setBankAcct({...BankAcct, ...{error: 'must_number'}});

    }
  }
  const changePhone = value => {
    if(isNaN(value?.value)) setPhone({ value: value?.value, error: 'must_number'});
    else setPhone(value);
  }
  const changeBankacct = value => {
    if(isNaN(value?.value)) setBankAcct({ value: value?.value, error: 'must_number'});
    else setBankAcct(value);
  }
  function isValidEmail(email) {
    return  /\S+@\S+\.\S+/.test(email);
  }
 
  const handleEnter = e => {
    if (e?.key?.toLowerCase() === "enter") {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  return (
    <Modal title={null} footer={null} closable={false} visible={visible} 
     width={700} >
      
      <DynamicAIIcon name='AiFillCloseCircle' className='close_icon' onClick={() => onClose(false)} />
      <p className='card_title'>{t('new_vendor')}</p>
      {error ? <Error1 error={error} /> : null}
     <form className= 'card_container'
      onSubmit={handleSubmit}
      >
        <div className='cart'>
        <div className='card1'>
      <CardInput label={('table.company')} className="ss"  value={CpnyID} setValue={setCpnyID} handleEnter={handleEnter} />
      <CardInput1 label={('table.company_name')} value={CpnyName} disabled={true} setValue={setCpnyName} handleEnter={handleEnter} />
      </div>
      <div className='card2'>
       <Cardlength label={('table.vendorcode')} value={VendID} setValue={setVendID} handleEnter={handleEnter} />
       <CardInput1 label={('table.vendorname')} value={VendName} setValue={setVendName} handleEnter={handleEnter} />
      </div>
      <div className='card1'>
      <CardInput label={('user_email')} value={VendUserID} setValue={setVendUserID} handleEnter={handleEnter}/>
      <CardInput1 label={('user_password')} className='card_input2' value={VendPass} setValue={setVendPass} handleEnter={handleEnter} isPassword={true}/>
      </div>
      <div className='card5'>
      <CardInput label={('table.phone')} className='card_input' value={Phone} setValue={changePhone} handleEnter={handleEnter}  />
      <CardInput1 label={('login.email')} className='card_input'  value={Email} setValue={setEmail} handleEnter={handleEnter}  /></div>
      <div className='card'>
      <CardInput label={('table.bank')} className='card_input' value={Bank} setValue={setBank} handleEnter={handleEnter} id='bank' />
      <CardInput label={('table.bankacct')} className='card_input' value={BankAcct} setValue={changeBankacct}handleEnter={handleEnter} id='bankacct'  />
      </div>
      <div className='card'>
      <CardNote label={('table.address')}   className='card_input' value={Address} setValue={setAddress} handleEnter={handleEnter}  /></div>
      <div className='card3'>
      <Check label={('table.uselicensedate')}  value={UseLicenseDate} setValue={setUseLicenseDate}/>
      {/* <input type="checkbox" name='true' ref={ref}></input>
      <input type="checkbox"></input> */}
       {!disabled &&<CardDate label={('table.licenseExpireDate')} value={LicenseExpireDate} setValue={setLicenseExpireDate} disabled={ 
        (UseLicenseDate === 'Y') ? false : true} 
      disabledDate={d => !d || d.isBefore(moment().format('yyyy.MM.DD'))}
      />}
      {/* <Check label={('table.uselicensedate')}  value={UseLicenseDate} setValue={setUseLicenseDate}/> */}
      </div>
      </div>
      {!disabled && <button type='submit' disabled={loader} className='login_form_btn'>
        {loader ? <Loader className='login_loader' color='#fff' /> :t('save') }
      </button>}
    </form>
    </Modal>
  )
}