import React, { useState, useEffect } from 'react';
import './batchprogress.css';
// import '../../assets/css/style.css';

const BatchProgress = () => {
  const [batchNo, setBatchNo] = useState('');

  useEffect(() => {
    setBatchNo(() => {
      return new URLSearchParams(window.location.search).get('batchNo');
    });
  }, []);

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
                      <div className="timeline-badge danger">
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="timeline-panel" id="cultivationSection">
                        <div className="timeline-heading">
                          <h4 className="timeline-title">Cultivation</h4>
                          <p><small className="text-muted text-success activityDateTime"></small></p><span
                          className="activityQrCode"></span>
                        </div>
                        <div className="timeline-body">
                          <table className="table activityData table-responsive" id="cultivatorTable">
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
                      <div className="timeline-panel" id="farmInspectionSection">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Farm-Inspector</h4>
                  <p><small className="text-muted text-danger activityDateTime"></small></p><span
                  className="activityQrCode"></span>
                </div>
                <div className="timeline-body">
                  <table className="table activityData table-responsive" id="inspectorTable">
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




        
