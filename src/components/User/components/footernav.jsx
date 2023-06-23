import ReactDOM from 'react-dom';
import { useState } from 'react';
import React from "react";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBBtn,
//   MDBIcon,
//   MDBTypography,
//   MDBTable,
//   MDBTableHead,
//   MDBTableBody,
// } from "mdb-react-ui-kit";
import axios from 'axios';
import {
    REMOVE_ITEM , INCREASE_QUANTITY , DECREASE_QUANTITY , CLEAR_CART 
  } from '../../../reducer/cart';
import { useSelector , useDispatch } from 'react-redux';
import { faHouseMedicalCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import API from '../../../apis/product';
function FooterNavbar({ cart , increaseQuantity , decreaseQuantity  }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const myState = useSelector((state)=>state);
  const dispatch = useDispatch(); 
//   const cartTotal = 0;
  const cartTotal = myState.cart?.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // function createInvoice() {
  //   // Define a functional component
  //   const Invoice = () => {
  //     return (
  //       <MDBContainer className="py-5">
  //     <MDBCard className="p-4">
  //       <MDBCardBody>
  //         <MDBContainer className="mb-2 mt-3">
  //           <MDBRow className="d-flex align-items-baseline">
  //             <MDBCol xl="9">
  //               <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
  //                 Invoice &gt; &gt; <strong>ID: #123-123</strong>
  //               </p>
  //             </MDBCol>
  //             <MDBCol xl="3" className="float-end">
  //               <MDBBtn
  //                 color="light"
  //                 ripple="dark"
  //                 className="text-capitalize border-0"
  //               >
  //                 <MDBIcon fas icon="print" color="primary" className="me-1" />
  //                 Print
  //               </MDBBtn>
  //               <MDBBtn
  //                 color="light"
  //                 ripple="dark"
  //                 className="text-capitalize border-0 ms-2"
  //               >
  //                 <MDBIcon
  //                   far
  //                   icon="file-pdf"
  //                   color="danger"
  //                   className="me-1"
  //                 />
  //                 Export
  //               </MDBBtn>
  //               <hr />
  //             </MDBCol>
  //           </MDBRow>
  //         </MDBContainer>
  //         <MDBContainer>
  //           <MDBCol md="12" className="text-center">
  //             <MDBIcon
  //               fab
  //               icon="mdb"
  //               size="4x"
  //               className="ms-0 "
  //               style={{ color: "#5d9fc5" }}
  //             />
  //             <p className="pt-0">MDBootstrap.com</p>
  //           </MDBCol>
  //         </MDBContainer>
  //         <MDBRow>
  //           <MDBCol xl="8">
  //             <MDBTypography listUnStyled>
  //               <li className="text-muted">
  //                 To: <span style={{ color: "#5d9fc5" }}>John Lorem</span>
  //               </li>
  //               <li className="text-muted">Street, City</li>
  //               <li className="text-muted">State, Country</li>
  //               <li className="text-muted">
  //                 <MDBIcon fas icon="phone-alt" /> 123-456-789
  //               </li>
  //             </MDBTypography>
  //           </MDBCol>
  //           <MDBCol xl="4">
  //             <p className="text-muted">Invoice</p>
  //             <MDBTypography listUnStyled>
  //               <li className="text-muted">
  //                 <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
  //                 <span className="fw-bold ms-1">ID:</span>#123-456
  //               </li>
  //               <li className="text-muted">
  //                 <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
  //                 <span className="fw-bold ms-1">Creation Date: </span>Jun
  //                 23,2021
  //               </li>
  //               <li className="text-muted">
  //                 <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
  //                 <span className="fw-bold ms-1">Status:</span>
  //                 <span className="badge bg-warning text-black fw-bold ms-1">
  //                   Unpaid
  //                 </span>
  //               </li>
  //             </MDBTypography>
  //           </MDBCol>
  //         </MDBRow>
  //         <MDBRow className="my-2 mx-1 justify-content-center">
  //           <MDBTable striped borderless>
  //             <MDBTableHead
  //               className="text-white"
  //               style={{ backgroundColor: "#84B0CA" }}
  //             >
  //               <tr>
  //                 <th scope="col">#</th>
  //                 <th scope="col">Description</th>
  //                 <th scope="col">Qty</th>
  //                 <th scope="col">Unit Price</th>
  //                 <th scope="col">Amount</th>
  //               </tr>
  //             </MDBTableHead>
  //             <MDBTableBody>
  //               <tr>
  //                 <th scope="row">1</th>
  //                 <td>Pro Package</td>
  //                 <td>4</td>
  //                 <td>$200</td>
  //                 <td>$800</td>
  //               </tr>
  //               <tr>
  //                 <th scope="row">2</th>
  //                 <td>Web hosting</td>
  //                 <td>1</td>
  //                 <td>$10</td>
  //                 <td>$10</td>
  //               </tr>
  //               <tr>
  //                 <th scope="row">3</th>
  //                 <td>Consulting</td>
  //                 <td>1 year</td>
  //                 <td>$300</td>
  //                 <td>$300</td>
  //               </tr>
  //             </MDBTableBody>
  //           </MDBTable>
  //         </MDBRow>
  //         <MDBRow>
  //           <MDBCol xl="8">
  //             <p className="ms-3">
  //               Add additional notes and payment information
  //             </p>
  //           </MDBCol>
  //           <MDBCol xl="3">
  //             <MDBTypography listUnStyled>
  //               <li className="text-muted ms-3">
  //                 <span class="text-black me-4">SubTotal</span>$1110
  //               </li>
  //               <li className="text-muted ms-3 mt-2">
  //                 <span class="text-black me-4">Tax(15%)</span>$111
  //               </li>
  //             </MDBTypography>
  //             <p className="text-black float-start">
  //               <span className="text-black me-3"> Total Amount</span>
  //               <span style={{ fontSize: "25px" }}>$1221</span>
  //             </p>
  //           </MDBCol>
  //         </MDBRow>
  //         <hr />
  //         <MDBRow>
  //           <MDBCol xl="10">
  //             <p>Thank you for your purchase</p>
  //           </MDBCol>
  //           <MDBCol xl="2">
  //             <MDBBtn
  //               className="text-capitalize"
  //               style={{ backgroundColor: "#60bdf3" }}
  //             >
  //               Pay Now
  //             </MDBBtn>
  //           </MDBCol>
  //         </MDBRow>
  //       </MDBCardBody>
  //     </MDBCard>
  //   </MDBContainer>
  //     );
  //   };
  
  //   // Return the functional component
  //   return Invoice;
  // }
  
  // Usage:
  // const Invoice = createInvoice();
  
  // Render the component in your React application
  // ReactDOM.render(<Invoice />, document.getElementById('root'));
  
  
  
  
  
  
  const handleCheckout = async (event) => {
    event.preventDefault();
    const data = {
      items : myState.cart?.cartItems , 
      id:myState.authUser?.user , 
      userType:myState.authUser?.userType
    }
    let res;
    // if(myState.authUser?.userType === 'manufacturer')
    //   {
        res = await API.buyProduct(data);
      // }
      // else{
      //   res = await API.buyProduct(data);
      // }

    console.log(res);
    dispatch(CLEAR_CART())
    console.log("hello");

    // ReactDOM.render(<Invoice/>, document.getElementById('root'));
   
};


  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2>Cart</h2>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"  onClick={handleCheckout} >
            Checkout ({cartTotal.toFixed(2)})
          </button>
          {/* <button className="bg-blue-500 hover:bg-blue-500 text-white py-2 px-4 rounded" onClick={<Invoice/>} >
            Get Invoice 
          </button> */}
          {/* {<Invoice/>} */}
            {/* console.log("hello"); */}
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={<Invoice/>} >
            Get Invoice 
          </button> */}
          <button
            className="ml-4 flex items-center"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6M9 11h6M9 15h6M3 21h18a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="ml-1">{myState.cart?.cartItems?.length}</span>
          </button>
        </div>
      </div>
      {isCartOpen && (
        <div className="bg-white p-4 border rounded mt-2 max-h-60 overflow-y-scroll">
          <h3 className="mb-4">Shopping Cart</h3>
          {myState.cart?.cartItems?.map((item) => (
            
          <div key={item.id} className="flex justify-between items-center mb-2">
          <div>
            <span className="font-bold">{item.name}</span> &nbsp;
            {/* <span className="text-gray-600">${item.price.toFixed(2)}</span> &nbsp;
            <span className="text-gray-600">x {item.quantity}</span> &nbsp;
            <span className="text-gray-600">= {(item.quantity * item.price).toFixed(2) }</span> */}
          </div>
          <div>
            {/* <span className="font-bold">{item.name}</span> &nbsp; */}
            <span className="text-gray-600">${item.price.toFixed(2)}</span> &nbsp;
            <span className="text-gray-600">x {item.quantity}</span> &nbsp;
            <span className="text-gray-600">= {(item.quantity * item.price).toFixed(2) }</span>
          </div>
          <div>
            <button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded" onClick={()=>dispatch(DECREASE_QUANTITY(item))}>
              -
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded ml-2" onClick={()=>dispatch(INCREASE_QUANTITY(item))}>
              +
            </button>
            <button className="bg-red-200 hover:bg-red-300 px-2 py-1 rounded ml-2" onClick={()=>dispatch(REMOVE_ITEM(item))}>
              Remove
            </button>
          </div>
        </div>
        
         
          ))}
        </div>
      )}
    </nav>
  );
}

export default FooterNavbar;
