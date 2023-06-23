import './drop.css';
import { cashfreeSandbox, cashfreeProd } from 'cashfree-pg-sdk-javascript';
import { useState , useEffect } from 'react';
import { NavLink , useNavigate , useLocation , useParams } from "react-router-dom";

// import paymentApi from "../../Apis/payment";
function CashfreeDrop() {

  const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location?.state?.data;
  if(!paymentData)
  {
    navigate('/')
  }
  const [orderToken] = useState(paymentData.payment_session_id);
  const [style] = useState({backgroundColor: '#FCE0F6', color: '#DF1B41', fontSize: '14px', errorColor: '#6C4AB6' , fontFamily:'Lato', theme: 'light'});
  const [isProd, setIsProd] = useState(false);
  const [components] = useState(['order-details', 'card', 'upi', 'app', 'netbanking']);
  
  const checkandupdate = () =>
  {
    console.log("paymentAPI");
    console.log(paymentApi);
    paymentApi.onlinePaymentVerify({order_id:paymentData.order_id});
  }

  const cbs = (data) => {
    console.log("data")
    console.log(data)
  
    if (data.order && data.order.status === 'PAID') {
      // alert("paid")
      navigate("/thankyou");
      checkandupdate();
      console.log("response payment");
    }
    else{
      navigate("/thankyou");
    }
  };

  const cbf = (data) => {
    // alert(data.order.errorText || 'AAAA');
    navigate("/thankyou"); 
  };
  const dropinConfig = {
	components: [
		"card",
		"upi",
		"app",
		"netbanking",
		"paylater",
		"creditcardemi",
		"cardlessemi",
		"order-details",
	],
	onSuccess: function(data){
			
	},
	onFailure: function(data){
		
	},
	style: {
		backgroundColor:"#fce0f6",
		color:"#df1b41",
		fontSize:"14px",
		fontFamily:"Lato",
		errorColor:"#6c4ab6",
		theme:"light",
	}
}
  const renderDropin = () => {
    if (orderToken === '') {
      alert('Order Token is empty');
      return;
    }
    if (!components.length) {
      alert('No drop in specified');
      return;
    }
    let parent = document.getElementById('drop_in_container');
    parent.innerHTML = '';
    let cashfree;
    if (isProd) {
      cashfree = new cashfreeProd.Cashfree(orderToken);
    } else {
      cashfree = new cashfreeSandbox.Cashfree(orderToken);
    }
    console.log('before Initialisation');
    cashfree.drop(parent, {
      onSuccess: cbs,
      onFailure: cbf,
      components,
      style
    });
    console.log('after Initialisation');
  };

  useEffect(() => {
    
    renderDropin();   
  }, []);

  return (
    <div className="Drop">
      <div
        className="dropin-parent"
        id="drop_in_container"
        style={{ height: '600px' }}
      >
 
      </div>
    </div>
  );
}

export default CashfreeDrop;
