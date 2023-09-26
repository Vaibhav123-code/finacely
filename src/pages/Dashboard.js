import React , {useEffect, useState} from 'react'
import Header from '../componenet/Header'
import Cards from '../componenet/Cards'
import { Modal } from 'antd';
import AddExpenseModal from '../componenet/Modals/addExpense';
import AddIncomeModal from '../componenet/Modals/addIncome';
import { addDoc, collection, deleteDoc, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { getDocs } from 'firebase/firestore';
import TransectionTable from '../componenet/TransectionTabler';
import ChartComponent from '../componenet/Charts';
import NoTransections from '../componenet/NoTransections/NoTransections';

function Dashboard() {
  const [transections, setTransection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  }
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  }
  const handleExpenseCancel = () => {
     setIsExpenseModalVisible(false);
  }
  const handleIncomeCancel = () => {
     setIsIncomeModalVisible(false);
  }
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    }
      addTransection(newTransaction);
    }

    async function addTransection(transection , many){
      try{
          const docRef = await addDoc(
          collection(db, `users/${user.uid}/transections`), transection);
          console.log("Document written with ID: ", docRef.id);
          if(!many) toast.success("Transaction added successfully");
          let newArr =  transections;
          newArr.push(transection);
          console.log("transection = ", transection)
          console.log("newArr = ", newArr)
          setTransection(newArr);
          calculateBalance();
        }catch(e) {
          console.log("error adding document: ",e)
          if(!many) toast.error("Transaction failed");
        }
    }

    useEffect(()  =>{
      // fet all doc from collection 
      fetchTransection();
    },[user]);

    useEffect(() =>{
        calculateBalance();
    },[transections]);

    async function fetchTransection(){
      setLoading(true);
      if(user) {
        const q = query(collection(db, `users/${user.uid}/transections`));
        const querySnapshot = await getDocs(q);
        let transectionsArray = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          transectionsArray.push(doc.data());
        });
        setTransection(transectionsArray);
        console.log("transectionArrsy", transectionsArray)
        toast.success("Transection fetched successfully");
      }
      
      setLoading(false);
    }

    function calculateBalance(){
      let incomeTotal =0;
      let expenseTotal =0;
      transections.forEach((transec) =>{
        if( transec.type === "income"){
          incomeTotal += transec.amount;
        }else {
          expenseTotal += transec.amount;
        }
      })

      setIncome(incomeTotal);
      setExpense(expenseTotal);
      setTotalBalance(incomeTotal - expenseTotal)
      console.log(income , expense , totalBalance)
    };
    let sortedTransections = transections.sort((a,b) =>{
      return new Date(b.date) - new Date(a.date);
    })

    async function resetTransactions() {
      console.log("hello")
      try{
        const userRef = collection(db, `users/${user.uid}/transections`);
        const snapshot = await getDocs(userRef);
        
        // Array to store promises for deletion
        const deletionPromises = [];
    
        snapshot.forEach((doc) => {
          const deletionPromise = deleteDoc(doc.ref);
          deletionPromises.push(deletionPromise);
        });
    
        // Wait for all promises to resolve
        await Promise.all(deletionPromises);
    
        toast.success("All transactions deleted successfully");
      } catch(e){
        toast.error("Failed to delete all transactions");
      }
    
      // After deleting all transactions, update the local state or state management
      setTransection([]);
      calculateBalance(); // You may also need to update the balance
    }
    

  return (
    <div>
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
      <Cards
         income={income}
         expense={expense}
         totalBalance={totalBalance}
         showExpenseModal={showExpenseModal}
         showIncomeModal={showIncomeModal}
         resetTransactions={resetTransactions}
      />
    
    { 
      transections && transections.length !=0 ? (
      <ChartComponent  sortedTransections={sortedTransections}/>) : ( <NoTransections /> )
    }
     <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
     />
     <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
     />
      <TransectionTable transections={transections} 
          addTransection={addTransection}
          fetchTransections={fetchTransection}
      />
     </>
     )
    }
    </div>
  )
}

export default Dashboard;