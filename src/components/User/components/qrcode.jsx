import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Button from 'react-bootstrap/Button';

const QRCodeComponent = ({ price, manufacturingDate, shippingDate }) => {
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mfTime, setmfTime] = useState(null);
  const [shipTime, setShipTime] = useState(null);

  const toggleModal = (action) => {
    setShowModal(action);
  };

  

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const dataURL = await QRCode.toDataURL(
          `https://smart-farming-and-retail.vercel.app/preview?id=Product3`
        );
        setQRCodeDataURL(dataURL);
      } catch (error) {
        console.error(error);
      }
    };
    
    timeConverter();
    generateQRCode();
  }, []);
  async function ConvertDate(timestamp) {
    console.log("🚀 ~ file: qrcode.jsx:33 ~ ConvertDate ~ timestamp:", timestamp)
    const date = new Date(timestamp * 1000);
    const options = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };
    const dateString = date.toLocaleString('en-US', options);
    return dateString;
  }
  async function timeConverter() {
    const maf = await ConvertDate(manufacturingDate);
    const ship = await ConvertDate(shippingDate);
    setmfTime(maf);
    setShipTime(ship);
    
  }

  const handlePrint = () => {
    const printContent = document.querySelector('.border-solid');
    if (printContent) {
      const htmlContent = printContent.innerHTML;
      const printWindow = window.open('', '', 'width=600,height=800');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <style>
              @media print {
                body * {
                  visibility: hidden;
                }
                .border-solid, .border-solid * {
                  visibility: visible;
                }
              }
            </style>
          </head>
          <body>
            <div class="border-solid">
              ${htmlContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <>
      <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={() => toggleModal(true)}>View Label</Button>
      {showModal && (
        <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="bg-white border-solid border-2 border-black ...">
          {/* <button className="close-button">
              <span>&times;</span>
            </button> */}
            <div style={{ display: 'flex' }}>
              <div>
                {qrCodeDataURL && <img src={qrCodeDataURL} alt="QR Code" />}
              </div>
              <div style={{ margin: '20px' }}>
                <p>Price: {'₹ 50'}</p>
                <p>Manufacturing Date: {mfTime}</p>
                <p>Shipping Date: {shipTime}</p>
              </div>
            </div>
            <Button variant="primary" size="sm" style={{ margin: '10px' }} onClick={handlePrint}>Print</Button>
            <Button variant="primary" size="sm" style={{ margin: '10px' }}  onClick={() => toggleModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default QRCodeComponent;
