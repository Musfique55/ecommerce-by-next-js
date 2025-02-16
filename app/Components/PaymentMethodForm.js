import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';

const PaymentMethodForm = ({totalAmount,methodName,methods,selectedMethodId,setOrderSchema,orderSchema,paymentMethodSelection,firstValueFunction,onAmountUpdate,onRefIdUpdate,setSelectedMethodId,onClose}) => {
    
    let customStyles = {
        control: (provided) => ({
          ...provided,
          borderRadius: '10px',
        //   borderColor: transparentBorder? "transparent":"#C1CFEF",
          width: '100%',
    
          //boxShadow: 'none',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#C1CFEF' : 'white',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#C1CFEF',
          },
        }),
      };

    const options = methods.flatMap((item) => item.payment_type_category.flatMap(item => ({
        value : item.payment_category_name,
        label : item.payment_category_name,
        id: item.payment_type_id,
        category_id : item.id,
        account_number : item.account_number
    })));

    const [addMethods,setAddMethods] = useState([]);

    const addPayemnt = () => {
        setAddMethods([...addMethods,{id : Date.now(),title : ''}])
    }
    const removePayment = (id,category_id) => {
        const itemToRemove = paymentMethodSelection.findIndex(item => item.payment_type_category_id === category_id);
        paymentMethodSelection.splice(itemToRemove,1)
        const remainingMethod = addMethods.filter(item => item.id !== id);
        setAddMethods(remainingMethod)
    }


    const handleMethodSelect = (selectedOption, idx) => {
        setOrderSchema(prevSchema => {
            const updatedMethods = [...prevSchema.payment_method];
            const existingMethodIndex = updatedMethods.findIndex(
                item => item.payment_type_category_id === selectedOption.category_id
            );
    
            if (existingMethodIndex !== -1) {
                updatedMethods[existingMethodIndex] = {
                    ...updatedMethods[existingMethodIndex], 
                    payment_type_id: selectedOption.id,
                    payment_type_category_id: selectedOption.category_id,
                    account_number: selectedOption.account_number,
                };
            } else {
                updatedMethods.push({
                    payment_type_category_id: selectedOption.category_id,
                    payment_type_id: selectedOption.id,
                    account_number: selectedOption.account_number,
                });
            }
    
            return {
                ...prevSchema,
                payment_method: updatedMethods,
            };
        });
    

        setAddMethods(prevMethods => {
            const updatedAddMethods = [...prevMethods];
            updatedAddMethods[idx] = {
                ...updatedAddMethods[idx],
                title: selectedOption.value,
                category_id: selectedOption.category_id,
                account_number: selectedOption.account_number,
            };
            return updatedAddMethods;
        });
    };
    

    const handleAmountChange = (e,category_id) => {
        const amount = e.target.value;
        const updatedMethod = [...paymentMethodSelection];
        const existingMethodIndex = updatedMethod.findIndex(item => item.payment_type_category_id === category_id);
        updatedMethod[existingMethodIndex].payment_amount = parseInt(amount);
    }
    const handleRefIdChange = (e,category_id) => {
        const refId = e.target.value;
        const updatedMethod = [...paymentMethodSelection];
        const existingMethodIndex = updatedMethod.findIndex(item => item.payment_type_category_id === category_id);
        updatedMethod[existingMethodIndex].ref_id = refId;
    }


    const handleAmountCheck = () => {
        const updatedMethodList = [...paymentMethodSelection];
        const totalPaidAmount = updatedMethodList.reduce((prev,curr) => {
          return  prev + curr.payment_amount
        } ,0);
        if((parseInt(totalAmount)  + 200) > totalPaidAmount){
           return toast.error('Please Pay Full Amount')
        }else if(totalPaidAmount > (parseInt(totalAmount)  + 200)){
            return toast.error('Please Pay Exact Amount')
        }else{
            onClose();
        }
    }


   
    return (
        <div>
            <div className='flex justify-between items-center'>
                <p className='font-semibold'>Total Amount</p>
                <p className='font-semibold'>{parseInt(totalAmount) + 200}</p>
            </div>
            <h5 className='my-3 font-medium'>{methodName}</h5>
            <Select onChange={(selectedOption) => {firstValueFunction(selectedOption);setSelectedMethodId(selectedOption.category_id)}} styles={{...customStyles}} options={options.filter(item => item.id !== paymentMethodSelection.find(method => method.payment_type_id === item.id )?.payment_type_id)} value={options.find(option => option.value === methodName)} />

            <div className="flex flex-col relative mt-4">
                <label className="absolute z-10 font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Account Number</label>
                <Select 
                options={options.filter(item => item.category_id === selectedMethodId)}
                value={(options.find(option => option.category_id)?.category_id === 
                   selectedMethodId)?.account_number 
                }
                getOptionLabel={(e) => e.account_number} 
                getOptionValue={(e) => e.account_number} 
                onChange={(selectedOption) => {
                firstValueFunction(selectedOption);
                setSelectedMethodId(selectedOption?.category_id ?? null);
                }} 
                styles={{...customStyles}}
                />
            </div>    
            <div className="flex flex-col relative mt-4">
                <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Ref Id</label>
                <input
                type="text"
                name="referenceId"
                onChange={onRefIdUpdate}
                placeholder="Reference Id"
                className="input  input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl bg-white dark:bg-white focus:border-2 focus:border-blue-500"
                />
            </div>    
            <div className="flex flex-col relative mt-2">
                <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Amount</label>
                <input
                type="text"
                onChange={onAmountUpdate}
                placeholder="0.00"
                className="input  input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl bg-white dark:bg-white focus:border-2 focus:border-blue-500"
                />
            </div> 
            {
                addMethods && addMethods.length > 0 ? 
                addMethods.map((item,idx) => {
                    return <div key={item.id} className='border-y '>
                    <div className="flex justify-between items-center">
                        <h5  className='my-3 font-medium'>{item.title || 'Select'}</h5>
                        <button onClick={() => removePayment(item.id,item.category_id)} className='bg-red-500 text-white text-sm p-1 rounded-xl'>Cancel</button>
                    </div>
                    <Select onChange={(selectedOption) => {handleMethodSelect(selectedOption,idx)}} styles={{...customStyles}} options={options.filter(item => item.id !== paymentMethodSelection.find(method => method.payment_type_id === item.id)?.payment_type_id)} value={options.find(option => option.value === item?.title)} />
                     
                    <div className="flex flex-col relative mt-4">
                        <label className="absolute z-10 font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Account Number</label>
                        <Select 
                        options={options.filter(option => option.category_id === item.category_id)}
                        value={(options.find(option => option.category_id)?.category_id === 
                        item.category_id)?.account_number 
                        }
                        getOptionLabel={(e) => e.account_number} 
                        getOptionValue={(e) => e.account_number} 
                        onChange={(selectedOption) => {
                        handleMethodSelect(selectedOption,idx)
                        }} 
                        styles={{...customStyles}}
                        />
                    </div>  
                    <div className="flex flex-col relative mt-4">
                        <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Ref Id</label>
                        <input
                        type="text"
                        name="referenceId"
                        onChange={(e) => handleRefIdChange(e,item.category_id)}
                        placeholder="Reference Id"
                        className="input  input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl bg-white dark:bg-white focus:border-2 focus:border-blue-500"
                        />
                    </div>  
                    <div className="flex flex-col relative mt-2">
                        <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Amount</label>
                        <input
                        type="text"
                        onChange={(e) => handleAmountChange(e,item.category_id)}
                        placeholder="0.00"
                        className="input  input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl bg-white dark:bg-white focus:border-2 focus:border-blue-500"
                        />
                    </div> 
                </div>
                })  
                : ''
            }
            <div className='flex justify-between my-3 items-center'>
                <p className='font-medium'>Pay with more Method</p>
                <Plus onClick={() => addPayemnt()} size={32} className='border-2 rounded-md cursor-pointer'/>
            </div>   

            {/* <div className='flex justify-between items-center my-3'>
                <div>
                    <p className='text-xs font-medium'>Due Amount</p>
                    <p className='font-semibold'>0.00</p>
                </div>
                <div>
                    <p className='text-xs font-medium'>Change to be Returned
                    </p>
                    <p className='font-semibold'>0.00</p>
                </div>
            </div> */}
            <button onClick={handleAmountCheck} className='bg-[#FF8800] py-2 w-full rounded-lg text-white'>Save</button>
        </div>
    );
};

export default PaymentMethodForm;