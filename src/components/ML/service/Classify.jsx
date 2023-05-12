import React, { Component, Fragment , useRef } from 'react';
import {
  Alert, Button, Collapse, Container, Form, Spinner, ListGroup, Tabs, Tab , Modal
} from 'react-bootstrap';
import { FaCamera, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { openDB } from 'idb';
import Cropper  from 'react-cropper';
import * as tf from '@tensorflow/tfjs';
import LoadButton from '../components/LoadButton';
import { MODEL_CLASSES } from '../model/classes';
import config from '../config';
import './Classify.css';
import 'cropperjs/dist/cropper.css';
// import testModel from '../testModels/model3/transfer_learning/model.json';

const MODEL_PATH = '/model/model3/transfer_learning/model.json';
const IMAGE_SIZE = 150;
const CANVAS_SIZE = 224;
const TOPK_PREDICTIONS = 3;

const INDEXEDDB_DB = 'tensorflowjs';
const INDEXEDDB_STORE = 'model_info_store';
const INDEXEDDB_KEY = 'web-model';

/**
 * Class to handle the rendering of the Classify page.
 * @extends React.Component
 */
export default class Classify extends Component {

  constructor(props) {
    super(props);
    
    this.noWebCam = React.createRef("noWebcam");
    this.yesWebCam = React.createRef("webcam");
    this.model = null;
    this.modelLastUpdated = null;
    // this. = true;
    
    this.state = {
      webcam : null,
      setShowModal:false,
      modelLoaded: false,
      filename: '',
      isModelLoading: false,
      isClassifying: false,
      predictions: [],
      photoSettingsOpen: true,
      modelUpdateAvailable: false,
      showModelUpdateAlert: false,
      showModelUpdateSuccess: false,
      isDownloadingModel: false
    };
  }

  async componentDidMount() {
    if (('indexedDB' in window)) {
      try {
        this.model = await tf.loadLayersModel('indexeddb://' + INDEXEDDB_KEY);

        // Safe to assume tensorflowjs database and related object store exists.
        // Get the date when the model was saved.
        try {
          const db = await openDB(INDEXEDDB_DB, 1, );
          const item = await db.transaction(INDEXEDDB_STORE)
                               .objectStore(INDEXEDDB_STORE)
                               .get(INDEXEDDB_KEY);
          const dateSaved = new Date(item.modelArtifactsInfo.dateSaved);
          await this.getModelInfo();
          console.log(this.modelLastUpdated);
          if (!this.modelLastUpdated  || dateSaved >= new Date(this.modelLastUpdated).getTime()) {
            console.log('Using saved model');
          }
          else {
            this.setState({
              modelUpdateAvailable: true,
              showModelUpdateAlert: true,
            });
          }
        }
        catch (error) {
          console.warn(error);
          console.warn('Could not retrieve when model was saved.');
        }
      }
      // If error here, assume that the object store doesn't exist and the model currently isn't
      // saved in IndexedDB.
      catch (error) {
        console.log('Not found in IndexedDB. Loading and saving...');
        console.log(error);
        this.model = await tf.loadLayersModel(MODEL_PATH);
        await this.model.save('indexeddb://' + INDEXEDDB_KEY);
      }
    }
    // If no IndexedDB, then just download like normal.
    else {
      console.warn('IndexedDB not supported.');
      this.model = await tf.loadLayersModel(MODEL_PATH);
    }

    this.setState({ modelLoaded: true });
    this.initWebcam();

    // Warm up model.
    let prediction = tf.tidy(() => this.model.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])));
    prediction.dispose();
  }


  initWebcam = async () => {
    try {
      const cam = await tf.data.webcam(
        this.yesWebCam.current,
        {resizeWidth: CANVAS_SIZE, resizeHeight: CANVAS_SIZE, facingMode: 'user'}
        );
console.log("cam");
console.log(cam);
        this.setState({
          webcam: cam
        });

      this.stopWebcam()
    }
    catch (e) {
      console.log("e")
      console.log(e)
      const nocam = this.refs.noWebcam; 
      nocam.current.style.display = 'block';
    }
  }

  startWebcam = async () => {
    console.log("here");
    if (this.state.webcam) {
      console.log(this.state.webcam);
      this.state.webcam.start();
    }
  }
  
  stopWebcam = async () => {
    console.log("here");
    console.log(this.state.webcam);
    if (this.state.webcam) {
      console.log(this.state.webcam);
      // this.webcam.stop();
      this.state.webcam.stop();
      this.state.webcam.stream.getTracks().forEach(track => track.stop());
      // this.yesWebCam.current.pause();
      // this.webcam.current.stop();
    }
  }

  handleCamStop = () => {
    if (this.yesWebCam.current) {
      this.yesWebCam.current.pause();
    }
  }

  handleCamRestart = () => {
    if (this.yesWebCam.current) {
      this.yesWebCam.current.play();
    }
  }

  async componentWillUnmount() {
    if (this.state.webcam) {
      this.state.webcam.stop();
    }

    // Attempt to dispose of the model.
    try {
      this.toggleModel(false);
      this.model.dispose();
    }
    catch (e) {
      // Assume model is not loaded or already disposed.
    }
  }

  
  toggleModel = async (action) => {
    // alert("Hello")
    console.log("setShowModal")
    console.log(this.state.setShowModal)
    this.setState({
      setShowModal: action,
    });
    if(this.state.setShowModal){
      console.log("Stop");
      this.stopWebcam()
    }
    else{
      console.log("Stort");
      this.initWebcam();
      this.startWebcam()
    };
  }

  closeModal = async () => {
    this.toggleModel(false);
  }

  getModelInfo = async () => {
    await fetch(`${config.API_ENDPOINT}/model_info`, {
      method: 'GET',
    })
    .then(async (response) => {
      await response.json().then((data) => {
        this.modelLastUpdated = data.last_updated;
      })
      .catch((err) => {
        console.log('Unable to get parse model info.');
      });
    })
    .catch((err) => {
      console.log('Unable to get model info');
    });
  }

  updateModel = async () => {
    // Get the latest model from the server and refresh the one saved in IndexedDB.
    console.log('Updating the model: ' + INDEXEDDB_KEY);
    this.setState({ isDownloadingModel: true });
    this.model = await tf.loadLayersModel(MODEL_PATH);
    await this.model.save('indexeddb://' + INDEXEDDB_KEY);
    this.setState({
      isDownloadingModel: false,
      modelUpdateAvailable: false,
      showModelUpdateAlert: false,
      showModelUpdateSuccess: true
    });
  }

  classifyLocalImage = async () => {
    this.setState({ isClassifying: true });

    const croppedCanvas = this.refs.cropper.getCroppedCanvas();
    const image = tf.tidy( () => tf.browser.fromPixels(croppedCanvas).toFloat());

    // Process and resize image before passing in to model.
    const imageData = await this.processImage(image);
    const resizedImage = tf.image.resizeBilinear(imageData, [IMAGE_SIZE, IMAGE_SIZE]);

    const logits = this.model.predict(resizedImage);
    const probabilities = await logits.data();
    const preds = await this.getTopKClasses(probabilities, TOPK_PREDICTIONS);

    this.setState({
      predictions: preds,
      isClassifying: false,
      photoSettingsOpen: !this.state.photoSettingsOpen
    });

    // Draw thumbnail to UI.
    const context = this.refs.canvas.getContext('2d');
    const ratioX = CANVAS_SIZE / croppedCanvas.width;
    const ratioY = CANVAS_SIZE / croppedCanvas.height;
    const ratio = Math.min(ratioX, ratioY);
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    context.drawImage(croppedCanvas, 0, 0,
                      croppedCanvas.width * ratio, croppedCanvas.height * ratio);

    // Dispose of tensors we are finished with.
    image.dispose();
    imageData.dispose();
    resizedImage.dispose();
    logits.dispose();
  }

  classifyWebcamImage = async () => {
    this.setState({ isClassifying: true });

    const imageCapture = await this.state.webcam.capture();

    const resized = tf.image.resizeBilinear(imageCapture, [IMAGE_SIZE, IMAGE_SIZE]);
    const imageData = await this.processImage(resized);
    const logits = this.model.predict(imageData);
    const probabilities = await logits.data();
    const preds = await this.getTopKClasses(probabilities, TOPK_PREDICTIONS);

    this.setState({
      predictions: preds,
      isClassifying: false,
      photoSettingsOpen: !this.state.photoSettingsOpen
    });

    // Draw thumbnail to UI.
    const tensorData = tf.tidy(() => imageCapture.toFloat().div(255));
    await tf.browser.toPixels(tensorData, this.refs.canvas);

    // Dispose of tensors we are finished with.
    resized.dispose();
    imageCapture.dispose();
    imageData.dispose();
    logits.dispose();
    tensorData.dispose();
  }

  processImage = async (image) => {
    return tf.tidy(() => image.expandDims(0).toFloat().div(127).sub(1));
  }

  /**
   * Computes the probabilities of the topK classes given logits by computing
   * softmax to get probabilities and then sorting the probabilities.
   * param logits Tensor representing the logits from MobileNet.
   * param topK The number of top predictions to show.
   */
  getTopKClasses = async (values, topK) => {
    const valuesAndIndices = [];
    for (let i = 0; i < values.length; i++) {
      valuesAndIndices.push({value: values[i], index: i});
    }
    valuesAndIndices.sort((a, b) => {
      return b.value - a.value;
    });
    const topkValues = new Float32Array(topK);
    const topkIndices = new Int32Array(topK);
    for (let i = 0; i < topK; i++) {
      topkValues[i] = valuesAndIndices[i].value;
      topkIndices[i] = valuesAndIndices[i].index;
    }

    const topClassesAndProbs = [];
    for (let i = 0; i < topkIndices.length; i++) {
      topClassesAndProbs.push({
        className: MODEL_CLASSES[topkIndices[i]],
        probability: (topkValues[i] * 100).toFixed(2)
      });
    }
    return topClassesAndProbs;
  }

  handlePanelClick = event => {
    console.log("this.state.photoSettingsOpen");
    console.log(this.state.photoSettingsOpen)
    if(this.state.photoSettingsOpen){
      console.log("Stop");
      this.stopWebcam()
    }
    else{
      console.log("Stort");
      this.startWebcam()
    };
    this.setState({ photoSettingsOpen: !this.state.photoSettingsOpen });
  }

  handleFileChange = event => {
    if (event.target.files && event.target.files.length > 0) {
      this.setState({
        file: URL.createObjectURL(event.target.files[0]),
        filename: event.target.files[0].name
      });
    }
  }

  handleTabSelect = activeKey => {
    switch(activeKey) {
      case 'camera':
        this.startWebcam();
        break;
      case 'localfile':
        this.setState({filename: null, file: null});
        this.stopWebcam();
        break;
      default:
    }
  }

  render() {
    return (
      <>
      {/* <div
          className="bg-[#202054] text-center text-[#ffffff] md:px-1 md:py-[10px] py-[9px] px-12 rounded-[10px] hover:bg-black duration-200"
          type="button"
          // onClick={onClick={() => this.state.showModal: true}
        > */}
          {/* <h4 className=" text-[16px]  text-[#FFFFFF] font-[400] leading-[18.75px] cursor-pointer">
            {" "}
            Classify
          </h4> */}
        {/* </div> */}
        <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={()=>this.toggleModel(true)}>Classify</Button>
        {this.state.setShowModal?(
          <>
           <div className="justify-center items-center flex  fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="Classify container">
           <div className="relative w-[1000px]  my-6 mx-auto ">
            <div className="border-0 rounded-lg  shadow-lg relative flex flex-col w-full h-[600px] bg-white outline-none focus:outline-none ">
              <div className="flex items-center justify-between border-solid border-slate-200 rounded-t">
                <h4 className="text-[19px] font-[400] text-[#202054] leading-[28.8px] mx-8">
                 Testing
                </h4> 
                    <div
                      className="ml-auto leading-none font-semibold outline-none focus:outline-none"
                      onClick={this.closeModal}
                    >
                      <span className=" flex items-center justify-center cursor-pointer  text-black  h-5 w-5  text-2xl  outline-none focus:outline-none">
                        ×
                      </span>
                    </div>
                  </div>

      { !this.state.modelLoaded &&
        <Fragment>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          {' '}<span className="loading-model-text">Loading Model</span>
          <h6>Please wait patiently, for the first time it will take a little bit longer</h6>
        </Fragment>
      }

      { this.state.modelLoaded &&
        <Fragment>
        <Button
          onClick={this.handlePanelClick}
          className="classify-panel-header"
          aria-controls="photo-selection-pane"
          aria-expanded={this.state.photoSettingsOpen}
          >
          Take or Select a Photo to Classify
            <span className='panel-arrow'>
            { this.state.photoSettingsOpen
              ? <FaChevronDown />
              : <FaChevronRight />
            }
            </span>
          </Button>
          {/* <Collapse in={}> */}
            {this.state.photoSettingsOpen&&
            <div id="photo-selection-pane">
            { this.state.modelUpdateAvailable && this.state.showModelUpdateAlert &&
                <Container>
                  <Alert
                    variant="info"
                    show={this.state.modelUpdateAvailable && this.state.showModelUpdateAlert}
                    onClose={() => this.setState({ showModelUpdateAlert: false})}
                    dismissible>
                      An update for the <strong>{this.state.modelType}</strong> model is available.
                      <div className="d-flex justify-content-center pt-1">
                        {!this.state.isDownloadingModel &&
                          <Button onClick={this.updateModel}
                                  variant="outline-info">
                            Update
                          </Button>
                        }
                        {this.state.isDownloadingModel &&
                          <div>
                            <Spinner animation="border" role="status" size="sm">
                              <span className="sr-only">Downloading...</span>
                            </Spinner>
                            {' '}<strong>Downloading...</strong>
                          </div>
                        }
                      </div>
                  </Alert>
                </Container>
              }
              {this.state.showModelUpdateSuccess &&
                <Container>
                  <Alert variant="success"
                         onClose={() => this.setState({ showModelUpdateSuccess: false})}
                         dismissible>
                    The <strong>{this.state.modelType}</strong> model has been updated!
                  </Alert>
                </Container>
              }
            <Tabs defaultActiveKey="camera" id="input-options" onSelect={this.handleTabSelect}
                  className="justify-content-center">
              <Tab eventKey="camera" title="Take Photo">
                <div id="no-webcam" ref={this.noWebCam}>
                  <span className="camera-icon"><FaCamera /></span>
                  No camera found. <br />
                  Please use a device with a camera, or upload an image instead.
                </div>
                <div className="webcam-box-outer">
                  <div className="webcam-box-inner">
                    <video ref={this.yesWebCam} autoPlay muted id="webcam" style={{transform: "scaleX(-1)"}}
                           width="448" height="448">
                    </video>
                  </div>
                </div>
                <button onClick={this.handleCamStop}>pause</button>
                <button onClick={this.handleCamRestart}>Restart</button>
                <button onClick={this.stopWebcam}>Stop</button>
                <button onClick={this.startWebcam}>Start</button>
                <div className="button-container">
                  <LoadButton
                    variant="primary"
                    size="lg"
                    onClick={this.classifyWebcamImage}
                    isLoading={this.state.isClassifying}
                    text="Let's Classify!"
                    loadingText="Classifying..."
                  />
                </div>
              </Tab>
              <Tab eventKey="localfile" title="Select Image From Local">
                <Form.Group controlId="file">
                  <Form.Label>Upload your image</Form.Label><br />
                  <Form.Label className="imagelabel">
                    {this.state.filename ? this.state.filename : 'Browse'}
                  </Form.Label>
                  <Form.Control
                    onChange={this.handleFileChange}
                    type="file"
                    accept="image/*"
                    className="imagefile" />
                </Form.Group>
                { this.state.file &&
                  <Fragment>
                    <div id="local-image">
                      <Cropper
                        ref="cropper"
                        src={this.state.file}
                        style={{height: 400, width: '100%'}}
                        guides={true}
                        aspectRatio={1 / 1}
                        viewMode={2}
                      />
                    </div>
                    <div className="button-container">
                      <LoadButton
                        variant="primary"
                        size="lg"
                        disabled={!this.state.filename}
                        onClick={this.classifyLocalImage}
                        isLoading={this.state.isClassifying}
                        text="Let's Classify!"
                        loadingText="Classifying..."
                      />
                    </div>
                  </Fragment>
                }
              </Tab>
            </Tabs>
            </div>
  }
          {/* </Collapse> */}
          { this.state.predictions.length > 0 &&
            <div className="classification-results">
              <h3>Predictions</h3>
              <canvas ref="canvas" width={CANVAS_SIZE} height={CANVAS_SIZE} />
              <br />
              <ListGroup>
              {this.state.predictions.map((category) => {
                console.log(category);
                  if (category.className === 'Fresh Apple' || category.className === 'Fresh Orange' || category.className === 'Fresh Banana') {
                    return (
                      <div>
                        <p>This most likely <strong>{category.className}</strong> with {category.probability}% probability!</p>
                        <p>You can eat it safely!</p>
                      </div>
                    );
                  }
                  return (
                      <div>
                        <p>Oh no! This is <strong>{category.className}</strong> with {category.probability}% probability!</p>
                        <p>You shouldn't eat it!</p>
                      </div>
                    );
              })}
              </ListGroup>
            </div>
          }
          </Fragment>
        }
      </div>
      </div>
      </div>
      </div>
      </>
        ):null
  }
      </>
    );
  }
}