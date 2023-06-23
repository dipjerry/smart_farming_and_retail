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

     <Modal size="lg" show={showInvoice}>
     <Modal.Header >
       <Modal.Title id="fifthModalTitle">Invoice</Modal.Title>
     </Modal.Header>
     <Modal.Body>
     <Container className="py-5">
      <Card className="p-4">
        <Card.Body>
          <Container className="mb-2 mt-3">
            <div className="d-flex align-items-baseline">
              <div className="col-xl-9">
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                  Invoice &gt; &gt; <strong>ID: #123-123</strong>
                </p>
              </div>
              <div className="col-xl-3 float-end">
                <Button variant="light" className="text-capitalize border-0" href="javascript:void(0);" onClick={() => window.print()}>
                  Print
                </Button>
                <Button
                  variant="light"
                  className="text-capitalize border-0 ms-2"
                >
                  Export
                </Button>
                <hr />
              </div>
            </div>
          </Container>
          <Container>
            <div className="text-center">
              <i
                className="fab fa-mdb"
                style={{ fontSize: "4rem", color: "#5d9fc5" }}
              />
            </div>
          </Container>
          <div className="row">
            <div className="col-xl-8">
              <ul className="list-unstyled text-muted">
                <li>
                  To: <span style={{ color: "#5d9fc5" }}>John Lorem</span>
                </li>
                <li>Street, City</li>
                <li>State, Country</li>
                <li>
                  <i className="fas fa-phone-alt" /> 123-456-789
                </li>
              </ul>
            </div>
            <div className="col-xl-4">
              <p className="text-muted">Invoice</p>
              <ul className="list-unstyled text-muted">
                <li>
                  <i
                    className="fas fa-circle"
                    style={{ color: "#84B0CA" }}
                  ></i>
                  <span className="fw-bold ms-1">ID:</span>#123-456
                </li>
                <li>
                  <i
                    className="fas fa-circle"
                    style={{ color: "#84B0CA" }}
                  ></i>
                  <span className="fw-bold ms-1">Creation Date: </span>Jun
                  23,2021
                </li>
                <li>
                  <i
                    className="fas fa-circle"
                    style={{ color: "#84B0CA" }}
                  ></i>
                  <span className="fw-bold ms-1">Status:</span>
                  <span className="badge bg-warning text-black fw-bold ms-1">
                    Unpaid
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-2 mx-1 justify-content-center">
            <table className="table table-striped table-borderless">
              <thead className="text-white" style={{ backgroundColor: "#84B0CA" }}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Pro Package</td>
                  <td>4</td>
                  <td>$200</td>
                  <td>$800</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Web hosting</td>
                  <td>1</td>
                  <td>$10</td>
                  <td>$10</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Consulting</td>
                  <td>1 year</td>
                  <td>$300</td>
                  <td>$300</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-xl-8">
              
              <textarea className="ms-3">Add additional notes and payment information</textarea>
            </div>
            <div className="col-xl-3">
              <ul className="list-unstyled">
                <li className="text-black me-4">
                  <span className="text-black me-4">SubTotal</span>$1110
                </li>
                <li className="text-black me-4 mt-2">
                  <span className="text-black me-4">Tax(15%)</span>$111
                </li>
              </ul>
              <p className="text-black float-start">
                <span className="text-black me-3"> Total Amount</span>
                <span style={{ fontSize: "25px" }}>$1221</span>
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-xl-10">
              <p>Thank you for your purchase</p>
            </div>
            <div className="col-xl-2">
              <Button
                className="text-capitalize"
                style={{ backgroundColor: "#60bdf3" }}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
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