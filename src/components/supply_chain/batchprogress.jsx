import React, { useState, useEffect } from 'react';
import './batchprogress.css';
import { useSelector } from 'react-redux';
import verified from "../../assets/plugins/images/verified.jpg"
import samplePic from "../../assets/plugins/images/orange.jpg"
// import { pieData } from '../Admin/components/statistics';

const BatchProgress = () => {
  const myState = useSelector((state)=>state)
  const [Batch_array] = useState(myState.authUser?.chain);
  const [batchStatus, setBatchStatus] = useState(null);
  const [batchNo, setBatchNo] = useState(null);
  const [BatchId, setBatchId] = useState(null);
  const [CultivatorIntime, setCultivatoarIntime] = useState(null);
  const [FarmInspectorIntime, setFarmInspectorIntime] = useState(null);
  const [ProcessorIntime, setUser] = useState(null);
  const [packagingType, setPackagingType] = useState(null);
  const [exporterId, setExporterId] = useState(null);
  const [FertilizerUsed, setFertilizerUsed] = useState(null);
  const [exportationIntime, setExportationIntime] = useState(null);

  const [cultivatorIntime, setCultivatorIntime] = useState("");
  const [quantityPerPackage, setQuantityPerPackage] = useState("");

  const [importerId, setImporterId] = useState("");
  const [importIntime, setImportIntime] = useState("");
  const [importerStatus, setImporterStatus] = useState("");

  const [logisticId, setLogisticId] = useState("");
  const [logisticIntime, setLogisticIntime] = useState("");
  const [date, setDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [transportMethod, setTransportMethod] = useState("");

  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceIntime, setInvoiceIntime] = useState("");

  useEffect(() => {
    populate();
  }, []);

  async function ConvertDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };
    const dateString = date.toLocaleString('en-US', options);
    return dateString;
  }

  const populate = () => {
    if (Batch_array.producer.id) {
      buildCultivatorData();
    }
    if (Batch_array.exporter.id) {
      buildexporterData();
    }
    if (Batch_array.importer.id) {
      buildimporterData();
    }
    if (Batch_array.inspector.id) {
      buildInspectoionData();
    }
    if (Batch_array.invoice.id) {
      buildinvoiceData();
    }
    if (Batch_array.logistic.id) {
      buildLogisticData();
    }
  }

  async function buildCultivatorData() {
    const time = await ConvertDate(Batch_array.product.production_date);
    setBatchId(Batch_array.id);
    setCultivatoarIntime(time);
    setBatchStatus(Batch_array.producer.status);
  }

  async function buildexporterData() {
    const time = await ConvertDate(Batch_array.exporter.export_data.exportation_date);
    setExporterId(Batch_array.exporter.id);
    setPackagingType(Batch_array.exporter.export_data.packagingType);
    setExportationIntime(time);
    setQuantityPerPackage(Batch_array.exporter.export_data.quantityPerPackage);
    setBatchStatus(Batch_array.exporter.status);
  }

  async function buildimporterData() {
    const time = await ConvertDate(Batch_array.product.import_date);
    setImporterId(Batch_array.id);
    setImportIntime(time);
    setBatchStatus(Batch_array.importer.status);
  }

  async function buildLogisticData() {
    const time = await ConvertDate(Batch_array.product.import_date);
    const deliverydate = await ConvertDate(Batch_array.logistic.logistics_data.delivery_date);
    const pickupdate = await ConvertDate(Batch_array.logistic.logistics_data.pickup_date);
    setLogisticId(Batch_array.logistic.id);
    setImportIntime(time);
    setDate(Batch_array.logistic.logistics_data.date);
    setDeliveryDate(deliverydate);
    setDeliveryType(Batch_array.logistic.logistics_data.delivery_type);
    setExpectedDeliveryDate(Batch_array.logistic.logistics_data.expected_delivery_date);
    setPickupDate(pickupdate);
    setTrackingId(Batch_array.logistic.logistics_data.tracking_id);
    setTransportMethod(Batch_array.logistic.logistics_data.transport_method);
    setBatchStatus(Batch_array.logistic.status);
  }

  async function buildinvoiceData() {
    const time = await ConvertDate(Batch_array.product.production_date);
    setInvoiceId(Batch_array.id);
    setInvoiceIntime(time);
    setBatchStatus(Batch_array.producer.status);
  }




  return (
    <div className="container-fluid">
      <div className="row bg-title">
        <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
          <h3 className="page-title">Batch Progress 
          <a className="text-info" href="javascript:void(0);" onClick={() => window.print()} title="Print Page Report"><i
            className="fa fa-print"></i> Print</a></h3>
          <h4><b>Batch No: </b>{batchNo}
          </h4>
        </div>
        <div className="col-lg-6 col-sm-8 col-md-8 col-xs-12"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="white-box">
            <ul className="timeline">



                <li>
                      <div className={Batch_array.producer.id?"timeline-badge success":"timeline-badge danger" }>
                        <i className={Batch_array.producer.id?"fa fa-check":"fa fa-times" }></i>
                      </div>

                      <div className="timeline-panel" id="cultivationSection">
                        <div className="timeline-heading">
                          <h4 className="timeline-title">Cultivation</h4>
                          <p><small className="text-muted text-success activityDateTime"></small></p><span
                          className="activityQrCode"></span>
                        </div>
                        <div className="timeline-body">
                          <table className="table activityData table-responsive" id="cultivatorTable">
                          {Batch_array.producer.id?(<>
                            <tr><td>batchId: {BatchId} </td></tr>
    <tr><td>Cultivated Time:{CultivatorIntime}</td></tr>
    <tr><td><img src = {verified} className="img-circle pull-right w-16 h-18" alt="Verified"/></td></tr>
        </>):(
                   
                   <tr>
                      <td colSpan="2">
                        <p>Information Not Available</p>
                      </td>
                    </tr>)}                  

                          </table>
                        </div>
                        <div className="verifiedImg"></div>
                      </div>

                    </li>


                    <li className="timeline-inverted">
                    <div className={Batch_array.producer.id?"timeline-badge success":"timeline-badge danger" }>
                        <i className={Batch_array.producer.id?"fa fa-check":"fa fa-times" }></i>
                      </div>
                      <div className="timeline-panel" id="farmInspectionSection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Quality Check</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                <table className="table activityData table-responsive" id="cultivatorTable">
                          {Batch_array.producer.id?(<>
    <tr><td>Inspection time:{CultivatorIntime}</td></tr>
    <tr><td>Inspection Result:{"99.8% fresh"}</td></tr>
    <tr><td className="w-16 h-18"><img src = {samplePic} className="img-circle pull-right w-16 h-18" alt="Verified"/></td></tr>
    <tr><td><img src = {verified} className="img-circle pull-right w-16 h-18" alt="Verified"/></td></tr>
        </>):(
                   
                   <tr>
                      <td colSpan="2">
                        <p>Information Not Available</p>
                      </td>
                    </tr>)}                  

                          </table>
                </div>
                <div className="verifiedImg"></div>
              </div>
            </li>


            <li>

            <div className={Batch_array.exporter.id?"timeline-badge success":"timeline-badge danger" }>
                        <i className={Batch_array.producer.id?"fa fa-check":"fa fa-times" }></i>
                      </div>


              <div className="timeline-panel" id="packingSection">
                        <div className="timeline-heading">
                          <h4 className="timeline-title">Packing</h4>
                          <p><small className="text-muted text-success activityDateTime"></small></p><span
                          className="activityQrCode"></span>
                        </div>
                        <div className="timeline-body">
                          <table className="table activityData table-responsive" id="cultivatorTable">
                          {Batch_array.exporter.id?(<>
                            {/* <tr><td>batchId: {BatchId}</td></tr>
    <tr><td>Cultivated Time: {CultivatorIntime}</td></tr> */}
    <tr><td>Quantity: {quantityPerPackage}</td></tr>
    <tr><td>Packaging Type: {packagingType}</td></tr>
    <tr><td><img src={verified} className="img-circle pull-right w-16 h-18" alt="Verified" /></td></tr>

        </>):(
                   
                   <tr>
                      <td colSpan="2">
                        <p>Information Not Available</p>
                      </td>
                    </tr>)}                  

                          </table>
                        </div>
                        <div className="verifiedImg"></div>
                      </div>




            </li>
            <li className="timeline-inverted">
            <div className={Batch_array.logistic.id?"timeline-badge success":"timeline-badge danger" }>
                        <i className={Batch_array.logistic.id?"fa fa-check":"fa fa-times" }></i>
                      </div>
              <div className="timeline-panel" id="transportationSection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Transportation</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                          <table className="table activityData table-responsive" id="cultivatorTable">
                          {Batch_array.logistic.id?(<>
                            <tr><td>Pickup: {pickupDate}</td></tr>
    <tr><td>Logistic ID: {logisticId}</td></tr>
    {/* <tr><td>Import Time: {importIntime}</td></tr> */}
    {/* <tr><td>Date: {date}</td></tr> */}
    <tr><td>Pickup Date: {pickupDate}</td></tr>
    <tr><td>Tracking ID: {trackingId}</td></tr>
    <tr><td>Transport Method: {transportMethod}</td></tr>
    <tr><td>Batch Status: {batchStatus}</td></tr>
    <tr><td><img src={verified} className="img-circle pull-left w-16 h-18" alt="Verified" /></td></tr>
        </>):(
          
                   <tr>
                      <td colSpan="2">
                        <p>Information Not Available</p>
                      </td>
                    </tr>)}                  

                          </table>
                        </div>
                <div className="verifiedImg"></div>
              </div>
            </li>
            <li >
            <div className={Batch_array.logistic.id?"timeline-badge success":"timeline-badge danger" }>
                        <i className={Batch_array.logistic.id?"fa fa-check":"fa fa-times" }></i>
                      </div>
              <div className="timeline-panel" id="deliverySection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Delivery</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                <table className="table activityData table-responsive" id="cultivatorTable">
                          {Batch_array.logistic.id?(<>
                          <tr><td>Expected Delivery Date: {expectedDeliveryDate}</td></tr>
    <tr><td>Delivery Date: {deliveryDate}</td></tr>
    <tr><td>Delivery Type: {deliveryType}</td></tr>
                            {/* <tr><td>batchId: {BatchId} </td></tr> */}
    {/* <tr><td>Cultivated Time:{CultivatorIntime}</td></tr> */}
    <tr><td><img src = {verified} className="img-circle pull-left" alt="Verified"/></td></tr>
        </>):(
                   
                   <tr>
                      <td colSpan="2">
                        <p>Information Not Available</p>
                      </td>
                    </tr>)}                  

                          </table>
                </div>
                <div className="verifiedImg"></div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-badge danger">
                <i className="fa fa-times"></i>
              </div>
              <div className="timeline-panel" id="marketingSection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Marketing</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                  <table className="table activityData table-responsive" id="marketingTable">
                    <tr>
                      <td colSpan="2">
                        <p>Information Not Available</p>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="verifiedImg"></div>
              </div>
            </li>
            

            <li>
              <div className="timeline-badge danger">
                <i className="fa fa-times"></i>
              </div>
              <div className="timeline-panel" id="distributionSection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Distribution</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                  <table className="table activityData table-responsive" id="distributionTable">
                    <tr>
                      <td colSpan="2">
                        <p>Information Not Available</p>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="verifiedImg"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
  };

  export default BatchProgress;




        
