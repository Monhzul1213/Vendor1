import React, { useEffect, useState, } from 'react';
import { Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { addDoc, collection , doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'
import '../../css/card.css';
import { Cardlength, CardDate, CardInput, CardInput1, CardNote, Loader, DynamicAIIcon, Error1, Check } from '../all';
import { useSelector } from 'react-redux'

export function Card(props){
  const login = useSelector(state => state.login?.user);
  const { visible,  selected, onClose} = props;
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
  const [Bank1, setBank1] = useState({ value: '', error: null });
  const [Bank2, setBank2] = useState({ value: '', error: null });
  const [CreatedDate, setCreatedDate] = useState({ value: '', error: null });
  const [IsFirst] = useState({ value: 'Y', error: null });


  useEffect(() => {
    setEmail({ value: selected?.Email ?? '' });
    setCpnyID({ value: selected?.CpnyID ?? login.CpnyID });
    setCpnyName({ value: selected?.CpnyName ?? login?.CpnyName });
    setVendUserID({ value: selected?.VendUserID ?? '' });
    setVendPass({ value: selected?.VendPass ?? '' });
    setVendID({ value: selected?.VendID ?? '' });
    setUseLicenseDate(selected?.UseLicenseDate ?? 'Y');
    setLicenseExpireDate({ value: selected?.LicenseExpireDate ? moment(selected?.LicenseExpireDate, 'yyyy.MM.DD') : null });
    setAddress({ value: selected?.Address ?? '' });
    setPhone({ value: selected?.Phone ?? '' });
    setBank1({ value: selected?.Bank1 ?? '' });
    setBank2({ value: selected?.Bank2 ?? '' });
    setVendName({ value: selected?.VendName ?? '' });
    setCreatedDate({value:  selected?.CreatedDate ?? '' })
    setDisabled(disabled);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  
async function handleSubmit(e){
    e.preventDefault()
    setLoader(true);
    setError(null);
    let isLicenseValid = UseLicenseDate === 'N' ? true : LicenseExpireDate?.value ? true : false;
    if( CpnyName?.value && VendUserID?.value && isValidEmail(VendUserID?.value) 
      && VendPass &&VendID?.value &&VendName?.value && isLicenseValid &&Phone?.value 
      && !isNaN(Phone?.value) && Address?.value && Email?.value && isValidEmail(Email?.value) && Bank1?.value ){
    let obj = {
      CpnyID: CpnyID?.value,
      CpnyName: CpnyName?.value, 
      VendUserID: VendUserID?.value?.trim().toLowerCase(), 
      VendPass: VendPass?.value, 
      VendID: VendID?.value, 
      VendName: VendName?.value, 
      UseLicenseDate: UseLicenseDate , 
      Address: Address?.value, 
      Phone: Phone?.value, 
      Bank1: Bank1?.value, 
      Bank2: Bank2?.value ,
      IsFirst: IsFirst?.value, 
      Email: Email?.value,  
      LastUserName: VendName?.value,
      CreatedDate:  CreatedDate?.value,
      LastUpdate:  moment().format('yyyy.MM.DD, HH:mm:ss'),    
      LicenseExpireDate: LicenseExpireDate?.value,
      } 
    if(selected){
        const userRef= doc(db, 'smVendorUsers', selected.id)
          if(LicenseExpireDate?.value === null){
            setDoc(userRef, obj)
          }
          else {
            obj.LicenseExpireDate = LicenseExpireDate?.value?.format('yyyy.MM.DD')
            setDoc(userRef, obj  )
          }
        onClose(true);
        message.success(t('request_success'));
    } else {
        let exists = [];
        const userCollRef= collection(db, 'smVendorUsers')
        const q1 = query(userCollRef, where("VendUserID", "==", VendUserID?.value?.trim() ));
        const response = await getDocs(q1);
        response.docs.forEach(doc => {
            let user = (doc.data());
            exists.push(user.CpnyID)
           })
        let isVal = exists.includes(CpnyID?.value)
        if(isVal){
          setError("Хэрэглэгч бүртгэлтэй байна")
        }  
        else {
          obj.CreatedDate = moment().format('yyyy.MM.DD, HH:mm:ss')
          if(LicenseExpireDate?.value === null){
            addDoc(userCollRef, obj)
          }
          else {
            obj.LicenseExpireDate = LicenseExpireDate?.value?.format('yyyy.MM.DD')
            addDoc(userCollRef, obj  ) 
            }
        onClose(true);
        message.success(t('request_success'))
        }
      }
  } 
    else {
      if(!CpnyName?.value) setCpnyName({value: '', error: 'is_empty'});
      if(!VendUserID?.value) setVendUserID({value: '', error: 'is_empty'});
      if(!VendPass?.value) setVendPass({value: '', error: 'is_empty'});
      if(!VendName?.value) setVendName({value: '', error: 'is_empty'});
      if(!VendID?.value) setVendID({value: '', error: 'is_empty'});
      if(UseLicenseDate === 'Y' && !LicenseExpireDate?.value) setLicenseExpireDate({value: '', error: 'is_empty'});
      if(UseLicenseDate === 'N') setLicenseExpireDate({value:''});
      if(!Bank1?.value) setBank1({value: '', error: 'is_empty'});
      if(!Phone?.value) setPhone({value: '', error: 'is_empty'});
      if(!Address?.value) setAddress({value: '', error: 'is_empty'});
      if(!Email?.value) setEmail({value: '', error: 'is_empty'});
       if(!isValidEmail(VendUserID?.value)) setVendUserID({...VendUserID, ...{error: 'is_invalid'}});
       if(!isValidEmail(Email?.value)) setEmail({...Email, ...{error: 'is_invalid'}});
       else if(isNaN(Phone?.value)) setPhone({...Phone, ...{error: 'must_number'}});
    }
    setLoader(false)
}

const changePhone = value => {
    if(isNaN(value?.value)) setPhone({ value: value?.value, error: 'must_number'});
    else setPhone(value);
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
  <Modal title={null} footer={null} closable={false} visible = {visible} width={700} >
      <DynamicAIIcon name='AiFillCloseCircle' className='close_icon' onClick={() => onClose(false)} />
      <p className='card_title'>{t('new_vendor')}</p>
      {error ? <Error1 error={error} /> : null}
      <form className= 'card_container' onSubmit={handleSubmit} >
        <div className='cart'>
          <div className='card1'>
            <CardInput label={('table.company')} id="ss" disabled={true}  value={CpnyID} setValue={setCpnyID} handleEnter={handleEnter} />
            <CardInput1 label={('table.company_name')} id="ss" value={CpnyName} disabled={true} setValue={setCpnyName} handleEnter={handleEnter} />
          </div>
          <div className='card1'>
            <Cardlength label={('table.vendorcode')} value={VendID} setValue={setVendID} handleEnter={handleEnter}/>
            <CardInput1 label={('table.vendorname')} value={VendName} setValue={setVendName} handleEnter={handleEnter} />
          </div>
          <div className='card1'>
            <CardInput label={('user_email')} value={VendUserID} setValue={setVendUserID} handleEnter={handleEnter}/>
            <CardInput1 label={('user_password')} className='card_input2' value={VendPass} setValue={setVendPass} handleEnter={handleEnter} isPassword={true}/>
          </div>
          <div className='card1'>
            <CardInput label={('table.phone')} value={Phone} setValue={changePhone} handleEnter={handleEnter}  />
            <CardInput1 label={('login.email')}  value={Email} setValue={setEmail} handleEnter={handleEnter}  /></div>
          <div className='card'>
            <CardInput label={('table.bank')} value={Bank1} setValue={setBank1} handleEnter={handleEnter} id='bank' />
            <CardInput label={('table.bankacct')}value={Bank2} setValue={setBank2}handleEnter={handleEnter} id='bank'  />
          </div>
          <div className='card'>
            <CardNote label={('table.address')} value={Address} setValue={setAddress} handleEnter={handleEnter}/></div>
          <div className='card1'>
            <Check label={('table.uselicensedate')}  value={UseLicenseDate} setValue={setUseLicenseDate}/>
            {!disabled && <CardDate label={('table.licenseExpireDate')} value={LicenseExpireDate} setValue={setLicenseExpireDate} disabled={(UseLicenseDate === 'Y') ? false : true} />}
          </div>
      </div>
      {!disabled && <button type='submit' disabled={loader} className='login_form_btn'>
        {loader ? <Loader className='login_loader' color='#fff' /> :t('save') }
      </button>}
    </form>
  </Modal>
  )
}