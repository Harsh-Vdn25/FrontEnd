import { useState,useRef, useCallback } from 'react'
import "./style.css"
function App() {
  const category=useRef(null);
  const amount=useRef(null);
  const date=useRef(null);
  const [Total,setTotal]=useState(0);
  const [Expenses,setExpenses]=useState([]);

  const Categories = ["Health Care", "Education", "Travel", "Food", "Entertainment", "Rent", "Personal Care", "Others"];
  
  const AddExpense=useCallback((e)=>{
    e.preventDefault();
    const ipdate=date.current.value.trim();
    const ipcategory=category.current.value.trim();
    const ipamount=parseInt(amount.current.value.trim());
    setTotal(Total+ipamount);
    amount.current.value="";
    category.current.value="";
    date.current.value="";
    if(ipdate!==""&&ipcategory!=="ChooseCategory"&&!isNaN(ipamount)){
      setExpenses(prevExpenses=>(
        [
          ...prevExpenses,
        {
          category:ipcategory,
          amount:ipamount,
          date:ipdate
        }
        ]
      ));
    }else{
      return;
    }
  },[amount,category,date,setExpenses])

  const handleDel=(e)=>{
    const delElement=e.target.id;
    const newExpenses= Expenses.filter((_,index)=>index!==Number(delElement)).map((expense,index)=>(expense,index));
    const delAmount=Expenses[delElement].amount;
    setExpenses(newExpenses);
    setTotal(Total-delAmount);
    console.log(newExpenses);
    console.log(Expenses);
  }

  return (
    <>
       <h1>Expense Tracker</h1>
       <div className='container'>
         <div className='input-container'>
         <form>
          <label>Category:</label>
          <select ref={category}>
             <option>ChooseCategory</option>
            {
            Categories.map((category,index)=>(
                 <option key={index}>{category}</option>
            ))
              
            }
          </select>
          <label>Amount:</label>
          <input ref={amount} placeholder='Amount Here....'></input>
          <label>Date:</label>
          <input ref={date} type='date'></input>
          <button className='addbtn' onClick={AddExpense}>Add</button>
         </form>
         </div>
          <h2>Expenses List</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
             {(Expenses.length>0)?(
                Expenses.map((Expense,index)=>(
                  <tr key={index}>
                  <td>{Expense.category}</td>
                  <td>{Expense.amount}</td>
                  <td style={{position:'relative'}}>{Expense.date}
                  <button id={index} className='deletebtn' onClick={handleDel}>Delete</button>
                  </td>
                </tr>
                ))
              ):(
                <tr>
                  <td colSpan={3} style={{textAlign:'center',color:'rgba(255, 0, 0,3)',fontSize:'1rem'}}>No Expenses Added</td>
                </tr>
              )
             }
            </tbody>
            <tfoot>
              <tr>
                <th style={{textAlign:'center'}}>Total:{Total}</th>
              </tr>
            </tfoot>
          </table>
       </div>
    </>
  )
}

export default App