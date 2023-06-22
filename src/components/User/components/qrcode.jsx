import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Button from 'react-bootstrap/Button';

const QRCodeComponent = ({ price, manufacturingDate, shippingDate }) => {
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const dataURL = await QRCode.toDataURL(
          `Price: ${price}\nManufacturing Date: ${manufacturingDate}\nShipping Date: ${shippingDate}`
        );
        setQRCodeDataURL(dataURL);
      } catch (error) {
        console.error(error);
      }
    };

    generateQRCode();
  }, [price, manufacturingDate, shippingDate]);

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
    <div>
      <div className="border-solid border-2 border-black ...">
        <div style={{ display: 'flex' }}>
          <div>
            {qrCodeDataURL && <img src={qrCodeDataURL} alt="QR Code" />}
          </div>
          <div style={{ margin: '20px' }}>
            <p>Price: {price}</p>
            <p>Manufacturing Date: {manufacturingDate}</p>
            <p>Shipping Date: {shippingDate}</p>
          </div>
        </div>
      <Button variant="primary" size="sm" style={{ margin: '10px' }} onClick={handlePrint}>Print</Button>
      </div>
    </div>
  );
};

export default QRCodeComponent;
