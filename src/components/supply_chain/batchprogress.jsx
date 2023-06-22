import React, { useState, useEffect } from 'react';
import './batchprogress.css';
import myData from './data.json';
import userData from './udata.json';
import { useSelector , useDispatch } from 'react-redux';
import verified from "../../assets/plugins/images/verified.jpg"
// import '../../assets/css/style.css';

const BatchProgress = () => {
  const myState = useSelector((state)=>state)
  console.log("myState.authUser?.chain")
  console.log(myState.authUser?.chain)
  const [Batch_array] = useState(myState.authUser?.chain);
  const [batchStatus, setBatchStatus] = useState(null);
  const [batchNo, setBatchNo] = useState(null);
  const [BatchId, setBatchId] = useState(null);
  const [CultivatorIntime, setCultivatoarIntime] = useState(null);
  const [FarmInspectorIntime, setFarmInspectorIntime] = useState(null);
  const [ProcessorIntime, setUser] = useState(null);
  const [StrawberryFamily, setStrawberryFamily] = useState(null);
  const [FertilizerUsed, setFertilizerUsed] = useState(null);
    


  useEffect(() => {
    // setBatchNo(() => {
    //   return new URLSearchParams(window.location.search).get('batchNo');
    // });
  
    // loadData();

    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    //   populate(data);
    // });

    populate()


 

  });


  // const loadData = () => {
  //   // perform your data loading logic here
    // console.log(myData.Status);
  //   alert("Data Loaded");
  // };

  async function ConvertDate(timestamp) {
    console.log("timestamp");
    console.log(timestamp);
    const date = new Date(timestamp * 1000);
    const options = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };
    const dateString = date.toLocaleString('en-US', options);
    return dateString;
  }

  const populate = ()=>{
    // alert(Batch_array.producer.id);
    // alert(batchStatus);
    if (Batch_array.producer.id) {
      buildCultivatorData();}
     else if (Batch_array.Status == "HARVESTOR") {
      // buildHarvestorData(Batch_array);
    } else if (Batch_array.Status == "EXPORTOR") {
      // buildExportorData(Batch_array);
    } else if (Batch_array.Status == "IMPORTOR") {
      // buildImportorData(Batch_array);
    } else if (Batch_array.Status == "PROCESSOR") {
      // buildImportorData(Batch_array);
    } else if (Batch_array.Status == "COMPLETE") {
      // buildProcessorData(Batch_array);
    }
  }



  async function buildCultivatorData() {
      const time = await ConvertDate(Batch_array.product.production_date);
      setBatchId(Batch_array.id);
      setCultivatoarIntime(time);
      setBatchStatus(Batch_array.producer.status);
  }

  async function buildInspectorData(batchinfo) {

    await buildCultivatorData(batchinfo);
    setFarmInspectorIntime(batchinfo.FarmInspectorIntime)
    setStrawberryFamily(batchinfo.StrawberryFamily)
    setFertilizerUsed(batchinfo.FertilizerUsed)
    setBatchStatus(batchinfo.Status);
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
                      <div className={batchStatus==="Available"||batchStatus==="FARMINSPECTOR"?"timeline-badge success":"timeline-badge danger" }>
                        <i className={batchStatus==="Available"||batchStatus==="FARMINSPECTOR"?"fa fa-check":"fa fa-times" }></i>
                      </div>
                      <div className="timeline-panel" id="cultivationSection">
                        <div className="timeline-heading">
                          <h4 className="timeline-title">Cultivation</h4>
                          <p><small className="text-muted text-success activityDateTime"></small></p><span
                          className="activityQrCode"></span>
                        </div>
                        <div className="timeline-body">
                          <table className="table activityData table-responsive" id="cultivatorTable">
                          {batchStatus==="Available" || batchStatus==="FARMINSPECTOR"?(<>
                            <tr><td>batchId: {BatchId} </td></tr>
    <tr><td>Cultivated Time:{CultivatorIntime}</td></tr>
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
                        <i className={batchStatus==="FARMINSPECTOR"?"fa fa-check":"fa fa-times"}></i>
                      </div>
                      <div className="timeline-panel" id="farmInspectionSection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Farm-Inspector</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                  <table className="table activityData table-responsive" id="inspectorTable">
                   {batchStatus==="FARMINSPECTOR"?(<>
                    <tr><td>Inspector In Time:{FarmInspectorIntime}</td></tr>
    <tr><td>StrawberryFamily: {StrawberryFamily}</td></tr>
    <tr><td>Fertilizer Used : {FertilizerUsed}</td></tr>
    <tr><td><img src = {require("../../assets/plugins/images/verified.jpg")} className="img-circle pull-left" alt="Verified"/></td></tr>
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
              <div className="timeline-badge danger">
                <i className="fa fa-times"></i>
              </div>
              <div className="timeline-panel" id="packingSection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Packing</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                  <table className="table activityData table-responsive" id="packerTable">
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
            <li className="timeline-inverted">
              <div className="timeline-badge danger">
                <i className="fa fa-times"></i>
              </div>
              <div className="timeline-panel" id="transportationSection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Transportation</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                  <table className="table activityData table-responsive" id="transporterTable">
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
            <li className="timeline-inverted">
              <div className="timeline-badge danger">
                <i className="fa fa-times"></i>
              </div>
              <div className="timeline-panel" id="deliverySection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Delivery</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                  <table className="table activityData table-responsive" id="deliveryTable">
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




        
