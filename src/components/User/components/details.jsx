import React, { useState , useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Statistics from './statistics';
import {  Button,  Modal , Container, Card} from 'react-bootstrap';
import { useSelector , useDispatch } from 'react-redux';
import API from "../../../apis/users";
// import Sonnet from '../../components/Sonnet';
import Tablet from '../../all/tablet'
import Table from '../../all/table'
function ControlledTabsExample() {
  const [key, setKey] = useState('statistics');
  const [data, setData] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setShowInvoiceData] = useState(null);
  const [invoiceDate, setShowInvoiceDate] = useState(null);

  const myState = useSelector((state)=>state)
  const tableProps = {
    // ... other table properties
    rowStyle: {
      backgroundColor: "lightgray",
      color: "red",
      // Add other desired styles here
    },
  };
  
  async function ConvertDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };
    const dateString = date.toLocaleString('en-US', options);
    return dateString;
  }


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
      Cell: ({ row }) => (
        <Button
          className="text-red-600"
          onClick={() => { generateInvoice(row.original.Record); setShowInvoice(true);  }}
          value="View Invoice"
        >
          View Invoice
        </Button>
      )
    },
  ];
  async function generateInvoice(data) {
    // Convert the invoice date to the desired format
    const updatedDate = await ConvertDate(data.invoiceDate);
    console.log("🚀 ~ file: details.jsx:204 ~ generateInvoice ~ updatedDate:", updatedDate)
  
    // Create an updated data object with the modified invoice date
    const updatedData = { ...data, invoiceDate: updatedDate };
  
    console.log("🚀 ~ file: details.jsx:209 ~ generateInvoice ~ updatedData:", invoiceData)
    // Set the updated data object
    setShowInvoiceData(updatedData);
  }

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

    <Modal size="lg" show={showInvoice}>
  <Modal.Header>
    <Modal.Title id="fifthModalTitle">Invoice</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* <Container className="py-5"> */}
      <Card className="p-4">
        <Card.Body>
          <Container className="mb-4 mt-3">
            <div className="flex items-baseline justify-between">
              <div className="col-span-8">
                <p className="text-blue-700 text-xl">
                  Invoice &gt; &gt;{" "}
                  <strong>ID: {invoiceData?.invoiceNumber}</strong>
                </p>
              </div>
              <div className="col-span-4 flex justify-end">
                <Button variant="light" className="text-capitalize border-0" onClick={() => window.print()}>
                  Print
                </Button>
                <Button variant="light" className="text-capitalize border-0 ms-2">
                  Export
                </Button>
              </div>
            </div>
          </Container>
          <Container>
            <div className="text-center">
              <i className="fab fa-mdb text-4xl text-blue-500"></i>
            </div>
          </Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
  <div className="col-span-1 md:col-span-1">
    <ul className="text-gray-600">
      <li>
        To: <span className="text-blue-500">John Lorem</span>
      </li>
      <li>Street, City</li>
      <li>State, Country</li>
      <li>
        <i className="fas fa-phone-alt"></i> 123-456-789
      </li>
    </ul>
  </div>
  <div className="col-span-1 md:col-span-1">
    <p className="text-gray-600">Invoice</p>
    <ul className="text-gray-600">
      <li>
        <span className="font-semibold">ID:</span> {invoiceData?.invoiceNumber}
      </li>
      <li>
        <span className="font-semibold">Creation Date:</span> {invoiceData?.invoiceDate}
      </li>
      <li>
        <span className="font-semibold">Status:</span>
        <span className="badge bg-warning text-black font-semibold">
          Unpaid
        </span>
      </li>
    </ul>
  </div>
</div>

          <div className="my-2 mx-1">
            <table className="table table-striped table-borderless">
              <thead className="text-white bg-blue-500">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData?.products.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
           
            <div className="col-span-4">
              <ul className="text-gray-600">
                <li className="text-black me-4">
                  <span className="text-black me-4">SubTotal</span>₹{invoiceData?.subTotal}
                </li>
                <li className="text-black me-4 mt-2">
                  <span className="text-black me-4">Tax(15%)</span>₹{invoiceData?.taxAmount}
                </li>
              </ul>
              <p className="text-black">
                <span className="text-black me-2 font-semibold">Total Amount</span>
                <span className="text-2xl">₹{invoiceData?.totalPrice}</span>
              </p>
            </div>
          </div>
          <hr className="my-6" />
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-10">
              <p>Thank you for your purchase</p>
            </div>
            {/* <div className="col-span-2">
              <Button className="text-capitalize bg-blue-500">Pay Now</Button>
            </div> */}
          </div>
        </Card.Body>
      </Card>
    {/* </Container> */}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowInvoice(false)}>
      Close
    </Button>
    <Button variant="primary" type="submit" form="fifthModalForm">
      Pay Now
    </Button>
  </Modal.Footer>
</Modal>



   </>
  );
}
export default ControlledTabsExample;