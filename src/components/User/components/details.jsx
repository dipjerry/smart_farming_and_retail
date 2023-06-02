import React, { useState , useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Statistics from './statistics';
import {  Button,  Modal } from 'react-bootstrap';
import { useSelector , useDispatch } from 'react-redux';
import API from "../../../apis/users";
// import Sonnet from '../../components/Sonnet';
import Tablet from '../../all/tablet'
import Table from '../../all/table'
function ControlledTabsExample() {
  const [key, setKey] = useState('statistics');
  const [data, setData] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const myState = useSelector((state)=>state)
  const tableProps = {
    // ... other table properties
    rowStyle: {
      backgroundColor: "lightgray",
      color: "red",
      // Add other desired styles here
    },
  };
  
//   const data = [
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
//     {Key:"Transaction 1",Record:
//     {To:"Jivan", From:"Dipjyoti",Price:"200"}
//   },
// ]
  const columns = [
    {
      Header: "Index",
      // accessor: (row, index) => index + 1,
      accessor: 'Key',
    },
    {
      Header: 'To',
      accessor: 'Record.recipient',
    },
    {
      Header: 'From',
      accessor: 'Record.sender',
    },
    {
      Header: 'Amount',
      accessor: 'Record.totalPrice',
    },
    {
      Header: 'View',
      Cell: () => (
        <Button
          className="text-red-600"
          onClick={() => setShowInvoice(true)}
          value="View Invoice"
        >
         Save
      </Button>
      )
    },
  ];
  async function getTransaction()
{
  const formData={ 
    id:myState.authUser?.user,
    role:myState.authUser?.userType , 
  }
  const res = await API.fetchTransaction(formData);
  console.log("🚀 ~ file: details.jsx:182 ~ ControlledTabsExample ~ res:", res)
  setData(res.data.success); 
}
useEffect(() => {
  getTransaction();
}, []);
  return (
    <>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="statistics" title="Statistics">
        {/* statistics content */}
        {/* <Sonnet /> */}
        <Statistics/>
      </Tab>
      <Tab eventKey="transection" title="Transection">
        {/* transection content */}
        {/* <Sonnet /> */}
        <Table  getTrProps={(rowInfo) => ({
    className: 'bg-gray-100 hover:bg-gray-200 cursor-pointer',
  })} data={data} columns={columns}/>
      </Tab>
    </Tabs>
     <Modal show={showInvoice}>
     <Modal.Header >
       <Modal.Title id="fifthModalTitle">Invoice</Modal.Title>
     </Modal.Header>
     <Modal.Body>

     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={() => setShowInvoice(false)}>
         Close
       </Button>
       <Button variant="primary" type="submit" form="fifthModalForm" >
         Save
       </Button>
     </Modal.Footer>
   </Modal>
   </>
  );
}
export default ControlledTabsExample;