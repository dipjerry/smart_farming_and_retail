import React, { Component, Fragment , useRef , useState , useEffect } from 'react';
import {
    Alert, Button, Collapse, Container, Form, Spinner, ListGroup, Tabs, Tab , Modal
  } from 'react-bootstrap';
import * as tf from '@tensorflow/tfjs';
import { openDB } from 'idb';
// import WebcamIterator from './WebcamIterator';
import { FaCamera, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import Cropper  from 'react-cropper';
import LoadButton from '../components/LoadButton';
import { MODEL_CLASSES } from '../model/classes';
import config from '../config';
import './Classify.css';
import 'cropperjs/dist/cropper.css';
import Webcam from "react-webcam";
// const INDEXEDDB_KEY = 'myModel';
// const INDEXEDDB_DB = 'myDatabase';
// const INDEXEDDB_STORE = 'myObjectStore';
const INDEXEDDB_DB = 'tensorflowjs';
const INDEXEDDB_STORE = 'model_info_store';
const INDEXEDDB_KEY = 'web-model';
const MODEL_PATH = '/model/model3/transfer_learning/model.json';
// const CANVAS_SIZE = 224;
// const IMAGE_SIZE = 224;
const IMAGE_SIZE = 150;
const CANVAS_SIZE = 224;
const TOPK_PREDICTIONS = 3;
const Classify = () => {
  const noWebCam = useRef("noWebCam");
  const yesWebCam = useRef("yesWebCam");
  const refcanvas = useRef("canvas");
  const cropper = useRef("cropper");
 
  const modelLastUpdated = useRef(null);
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [stream, setStream] = useState(null);
  const [file] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [filename, setFilename] = useState('');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [photoSettingsOpen, setPhotoSettingsOpen] = useState(true);
  const [modelUpdateAvailable, setModelUpdateAvailable] = useState(false);
  const [showModelUpdateAlert, setShowModelUpdateAlert] = useState(false);
  const [showModelUpdateSuccess, setShowModelUpdateSuccess] = useState(false);
  const [isDownloadingModel, setIsDownloadingModel] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [state, setState] = useState({});
  let isComponentMounted = true;
  // useEffect(() => {
    const init = async () => {
      if (('indexedDB' in window)) {
        try {
          const modelTemp = await tf.loadLayersModel('indexeddb://' + INDEXEDDB_KEY);
          console.log("modelTemp");
          console.log(modelTemp);
          setModel(modelTemp);
          // Safe to assume tensorflowjs database and related object store exists.
          // Get the date when the model was saved.
          try {
            const db = await openDB(INDEXEDDB_DB, 1, );
            const item = await db.transaction(INDEXEDDB_STORE)
                                 .objectStore(INDEXEDDB_STORE)
                                 .get(INDEXEDDB_KEY);
            const dateSaved = new Date(item.modelArtifactsInfo.dateSaved);
            await getModelInfo();
            console.log(modelLastUpdated.current);
            if (!modelLastUpdated.current  || dateSaved >= new Date(modelLastUpdated.current).getTime()) {
              console.log('Using saved model');
            }
            else {
              setModelUpdateAvailable(true);
              setShowModelUpdateAlert(true);
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
          const modelTemp = await tf.loadLayersModel(MODEL_PATH);
          console.log('modelTemp');
          console.log(modelTemp);
          setModel(modelTemp);
          // model.current = await tf.loadLayersModel(MODEL_PATH);
          console.log(model)
          await modelTemp.save('indexeddb://' + INDEXEDDB_KEY);
        }
      }
      // If no IndexedDB, then just download like normal.
      else {
        console.warn('IndexedDB not supported.');
        const modelTemp = await tf.loadLayersModel(MODEL_PATH);
        setModel(modelTemp);
        // model.current = await tf.loadLayersModel(MODEL_PATH);
      }
      setModelLoaded(true);
      initWebcam();
      // Warm up model.
      let prediction = await tf.tidy(() => model.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])));
      prediction.dispose();
    };


    const uninit = async () => {
      try {
        modelLastUpdated.current = null;
  setModel(null);
  setWebcam(null);
  setStream(null);
  setShowModal(false);
  setModelLoaded(false);
  setFilename('');
  setIsModelLoading(false);
  setIsClassifying(false);
  setPredictions([]);
  setPhotoSettingsOpen(true);
  setModelUpdateAvailable(false);
  setShowModelUpdateAlert(false);
  setShowModelUpdateSuccess(false);
  setIsDownloadingModel(false);
  setIsCameraActive(false);
  setState({});
      } catch (error) {
        console.warn(error);
      }
      // setModelLoaded(false);
      // setShowModelUpdateAlert(false);
      // setModelUpdateAvailable(false);
    };
    
    // init();
  // }, [showModal]);

  const initWebcam = async () => {
    try {
      const stream_temp = await navigator.mediaDevices.getUserMedia({ video: true });
      const cam = await tf.data.webcam(
        yesWebCam.current.video,
        {
          resizeWidth: CANVAS_SIZE,
          resizeHeight: CANVAS_SIZE,
          facingMode: "user",
          videoTrack: stream_temp.getVideoTracks()[0],
        }
      );
      console.log("cam")
      console.log(cam)
      setWebcam(cam);
      cam.start();
    } catch (e) {
      console.log("error");
      console.log(e);
      // const nocam = document.getElementById("no-webcam");
      noWebCam.current.style.display = "block";
    }
  };
  const unInitWebcam = async () => {
    try {
     
      navigator.getUserMedia({audio: false, video: true},
        async function(stream) {
                // can also use getAudioTracks() or getVideoTracks()
                console.log("stream");
                console.log(stream);
                // webcamConfig
                const track = stream.getTracks()[0];  // if only one media track
                // console.log("track");yes
                // console.log(track);
                // ...
                track.stop();
                track.enabled=false;
                // console.log(track);
        },
        function(error){
            console.log('getUserMedia() error', error);
        });
      // console.log("cam")
      // console.log(cam)
      setWebcam("");
      // cam.stop();
      model.dispose();

    } catch (e) {
      console.log("error");
      console.log(e);
      // const nocam = document.getElementById("no-webcam");
      noWebCam.current.style.display = "block";
    }
  };
  const startWebcam = async () => {
    console.log("here");
    initWebcam();
  };
  // const stopWebcam = async () => {
  //   console.log("here");
  //   console.log(webcam);
  //   if (webcam) {
  //     console.log(webcam);
  //     webcam.stop();
  //     webcam.stream.getTracks().forEach((track) => track.stop());
  //   }
  // };
  const stopWebcam = async () => {
    if (webcam) {
      console.log("yes");
      console.log(webcam);
      console.log(webcam.webcamConfig.videoTrack.enabled);
      // webcam.stop();
      webcam.webcamConfig.videoTrack.enabled=false;
      console.log(webcam.webcamConfig.videoTrack.enabled);
      await webcam.stop();
    // webcam.dispose();
    // yesWebCam.current.video.srcObject = null;
    setWebcam(null);
      if (stream) {
        console.log(stream);
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      // webcam.dispose();
      // navigator.mediaDevices.getUserMedia({ video: false });
      setWebcam(null);
      setModel(null);
    }
  };
  const handleCamStop = () => {
    const yesWebCam = document.getElementById("yesWebCam");
    if (yesWebCam) {
      yesWebCam.pause();
    }
  };
  const handleCamRestart = () => {
    const yesWebCam = document.getElementById("yesWebCam");
    if (yesWebCam) {
      yesWebCam.play();
    }
  };
 
  const toggleModel = async (action) => {
    console.log("setShowModal");
    console.log(showModal);
    setShowModal(action);
    if (showModal) {
      console.log("Stop");
      // await stopWebcam();
      // await unInitWebcam();
      // uninit();

    } else {
      console.log("Start");
      init();
      initWebcam();
      startWebcam();
    }
  };
  const closeModal = async () => {
    toggleModel(false);
  };
  const getModelInfo = async () => {
    await fetch(`${config.API_ENDPOINT}/model_info`, {
      method: 'GET',
    })
      .then(async (response) => {
        await response
          .json()
          .then((data) => {
            modelLastUpdated.current = data.last_updated;
          })
          .catch((err) => {
            console.log('Unable to get parse model info.');
          });
      })
      .catch((err) => {
        console.log('Unable to get model info');
      });
  };
  const updateModel = async () => {
    // Get the latest model from the server and refresh the one saved in IndexedDB.
    console.log('Updating the model: ' + INDEXEDDB_KEY);
    setIsDownloadingModel(true);
    // model.current = await tf.loadLayersModel(MODEL_PATH);
    const modelTemp = await tf.loadLayersModel(MODEL_PATH);
          setModel(modelTemp);
    await model.save('indexeddb://' + INDEXEDDB_KEY);
    setIsDownloadingModel(false);
    setModelUpdateAvailable(false);
    setShowModelUpdateAlert(false);
    setShowModelUpdateSuccess(true);
  };
  const classifyLocalImage = async () => {
    setIsClassifying(true);
    const canvas = document.getElementById('canvas');
    const image = tf.tidy(() => tf.browser.fromPixels(croppedCanvas).toFloat());
    // Process and resize image before passing in to model.
    const imageData = await processImage(image);
    const resizedImage = tf.image.resizeBilinear(imageData, [IMAGE_SIZE, IMAGE_SIZE]);
    const logits = model.predict(resizedImage);
    const probabilities = await logits.data();
    const preds = await getTopKClasses(probabilities, TOPK_PREDICTIONS);
    setPredictions(preds);
    setPhotoSettingsOpen(!photoSettingsOpen);
    setIsClassifying(false);
    // Draw thumbnail to UI.
    const context = refs.canvas.getContext('2d');
    const ratioX = CANVAS_SIZE / croppedCanvas.width;
    const ratioY = CANVAS_SIZE / croppedCanvas.height;
    const ratio = Math.min(ratioX, ratioY);
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    context.drawImage(
      croppedCanvas,
      0,
      0,
      croppedCanvas.width * ratio,
      croppedCanvas.height * ratio
    );
    // Dispose of tensors we are finished with.
    image.dispose();
    imageData.dispose();
    resizedImage.dispose();
  };
// const startWebcam = async () => {
//     webcam = await tf.data.webcam(document.getElementById('webcam'));
//   }
//   const stopWebcam = () => {
//     if (webcam) {
//       webcam.stop();
//       webcam = null;
//     }
//   }
  const classifyWebcamImage = async () => {
    // let isClassifying = true;
    setIsClassifying(true);
    const canvas = document.getElementById('canvas');
    // const photoSettingsOpen = !document.getElementById('photo-settings').classList.contains('show');
    // console.log(webcam);
    console.log("webcam")
    console.log(webcam)
    const imageCapture = await webcam.capture();
    const resized = tf.image.resizeBilinear(imageCapture, [IMAGE_SIZE, IMAGE_SIZE]);
    const imageData = await processImage(resized);
    const logits = model.predict(imageData);
    const probabilities = await logits.data();
    const preds = await getTopKClasses(probabilities, TOPK_PREDICTIONS);
    console.log("preds");
    console.log(preds);
    // const predictions = preds;
    setPredictions(preds);
    // isClassifying = false;
    setIsClassifying(false);
    // Draw thumbnail to UI.
    const tensorData = tf.tidy(() => imageCapture.toFloat().div(255));
    await tf.browser.toPixels(tensorData, canvas);
    // Dispose of tensors we are finished with.
    resized.dispose();
    imageCapture.dispose();
    imageData.dispose();
    logits.dispose();
    tensorData.dispose();
    return { predictions, isClassifying, photoSettingsOpen };
  }
  const processImage = async (image) => {
    return tf.tidy(() => image.expandDims(0).toFloat().div(127).sub(1));
  }
  /**
   * Computes the probabilities of the topK classes given logits by computing
   * softmax to get probabilities and then sorting the probabilities.
   * @param values Array of logits
   * @param topK The number of top predictions to show.
   */
  const getTopKClasses = (values, topK) => {
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
  const handlePanelClick = () => {
    setPhotoSettingsOpen(!photoSettingsOpen);
    if (photoSettingsOpen) {
      // stopWebcam();
    } else {
      startWebcam();
    }
    return { photoSettingsOpen };
  }
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(URL.createObjectURL(event.target.files[0]))
      setfilename(event.target.files[0].name)
    }
  };
  const handleTabSelect = (activeKey) => {
    switch(activeKey) {
      case 'camera':
        startWebcam();
        break;
      case 'localfile':
        setFile(null)
      setfilename(null)
        // stopWebcam();
        break;
      default:
    }
  };
//   render() {
    return (
      <>
        <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={()=>toggleModel(true)}>Classify</Button>
        {showModal?(
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
                      onClick={closeModal}
                    >
                      <span className=" flex items-center justify-center cursor-pointer  text-black  h-5 w-5  text-2xl  outline-none focus:outline-none">
                        ×
                      </span>
                    </div>
                  </div>
      { !modelLoaded &&
        <Fragment>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          {' '}<span className="loading-model-text">Loading Model</span>
          <h6>Please wait patiently, for the first time it will take a little bit longer</h6>
        </Fragment>
      }
      { modelLoaded &&
        <Fragment>
        <Button
          onClick={handlePanelClick}
          className="classify-panel-header"
          aria-controls="photo-selection-pane"
          aria-expanded={photoSettingsOpen}
          >
          Take or Select a Photo to Classify
            <span className='panel-arrow'>
            { photoSettingsOpen
              ? <FaChevronDown />
              : <FaChevronRight />
            }
            </span>
          </Button>
          {/* <Collapse in={}> */}
            {photoSettingsOpen&&
            <div id="photo-selection-pane">
            { modelUpdateAvailable && showModelUpdateAlert &&
                <Container>
                  <Alert
                    variant="info"
                    show={modelUpdateAvailable && showModelUpdateAlert}
                    onClose={() => setShowModelUpdateAlert(false)}
                    dismissible>
                      An update for the <strong>{modelType}</strong> model is available.
                      <div className="d-flex justify-content-center pt-1">
                        {!isDownloadingModel &&
                          <Button onClick={updateModel}
                                  variant="outline-info">
                            Update
                          </Button>
                        }
                        {isDownloadingModel &&
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
              {showModelUpdateSuccess &&
                <Container>
                  <Alert variant="success"
                         onClose={() => setShowModelUpdateSuccess(false)}
                         dismissible>
                    The <strong>{modelType}</strong> model has been updated!
                  </Alert>
                </Container>
              }
            <Tabs defaultActiveKey="camera" id="input-options" onSelect={handleTabSelect}
                  className="justify-content-center">
              <Tab eventKey="camera" title="Take Photo">
                <div id="no-webcam" ref={noWebCam}>
                  <span className="camera-icon"><FaCamera /></span>
                  No camera found. <br />
                  Please use a device with a camera, or upload an image instead.
                </div>
                <div className="webcam-box-outer">
                  <div className="webcam-box-inner">
                    {/* <video ref={yesWebCam} autoPlay muted id="webcam" style={{transform: "scaleX(-1)"}}
                           width="448" height="448">
                    </video> */}
                    <Webcam
                    id="webcam"
          audio={false}
          ref={yesWebCam}
          muted
          style={{transform: "scaleX(-1)"}}
                           width="448" height="448">
                           </Webcam>
                  </div>
                </div>
                <button onClick={handleCamStop}>pause</button>
                <button onClick={handleCamRestart}>Restart</button>
                <button onClick={stopWebcam}>Stop</button>
                <button onClick={startWebcam}>Start</button>
                <div className="button-container">
                  <LoadButton
                    variant="primary"
                    size="lg"
                    onClick={classifyWebcamImage}
                    isLoading={isClassifying}
                    text="Let's Classify!"
                    loadingText="Classifying..."
                  />
                </div>
              </Tab>
              <Tab eventKey="localfile" title="Select Image From Local">
                <Form.Group controlId="file">
                  <Form.Label>Upload your image</Form.Label><br />
                  <Form.Label className="imagelabel">
                    {filename ? filename : 'Browse'}
                  </Form.Label>
                  <Form.Control
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    className="imagefile" />
                </Form.Group>
                { file &&
                  <Fragment>
                    <div id="local-image">
                      <Cropper
                        ref={cropper}
                        src={file}
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
                        disabled={!filename}
                        onClick={classifyLocalImage}
                        isLoading={isClassifying}
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
          {console.log("predictions.length")}
          {console.log(predictions.length)}
          { 
          predictions.length > 0 &&
            <div className="classification-results" id="photo-settings">
              <h3>Predictions</h3>
              <canvas id="canvas" ref={refcanvas} width={CANVAS_SIZE} height={CANVAS_SIZE} />
              <br />
              <ListGroup>
              {predictions.map((category) => {
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
// }
export default Classify;