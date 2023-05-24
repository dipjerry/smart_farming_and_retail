import React , {useState , useEffect} from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import './statistics.css';
import { Bar , Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement, Tooltip, Legend
} from 'chart.js';

// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, Tooltip, Legend,
  Title,
  Tooltip,
  Legend
);

export const stacked = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};


export const inventory = {
  labels:['Raw-material', 'InProcess', 'Finished'],
  datasets: [
    {
      label: 'Inventory',
      data: [100000, 50000 , 20000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
   
  ],
};
export const finance = {
  labels:['Reveue', 'Expense', 'Profit'],
  datasets: [
    {
      label: 'Fincance',
      data: [100000, 50000 , 20000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export const order = {
  labels:['ordered' , 'fullfilled' , 'cancelled'],
  datasets: [
    {
      label: '2021',
      data: [100000, 50000 , -20000],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '2022',
      data: [100000, -50000 , 20000],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: '2023',
      data: [-100000, 50000 , 20000],
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};


export const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Statistics = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const data = {
      labels: ['Revenue', 'Expenses'],
      datasets: [
        {
          label: 'Amount',
          data: [100000, 50000],
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  }, []);

  // useEffect(() => {
  //   const ctx = document.getElementById('finance-chart');
  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: chartData,
  //     options: {
  //       responsive: true,
  //       scales: {
  //         yAxes: [
  //           {
  //             ticks: {
  //               beginAtZero: true,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  // }, [chartData]);
  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Card className='equal-height-card'>
            <Card.Body>
              <Card.Title>Inventory</Card.Title>
              <Bar className={"mh-15"} options={{responsive:true}} data={inventory} />
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Raw materials</td>
                    <td>1000 units</td>
                  </tr>
                  <tr>
                    <td>Work-in-progress</td>
                    <td>500 units</td>
                  </tr>
                  <tr>
                    <td>Finished goods</td>
                    <td>200 units</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='equal-height-card'>
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Bar options={stacked} data={order} />
              <Table responsive>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Received</td>
                    <td>1000 units</td>
                  </tr>
                  <tr>
                    <td>Fulfilled</td>
                    <td>800 units</td>
                  </tr>
                  <tr>
                    <td>Canceled</td>
                    <td>50 units</td>
                  </tr>
                  <tr>
                    <td>Returns</td>
                    <td>20 units</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='equal-height-card'>
            <Card.Body>
              <Card.Title>Logistics</Card.Title>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Transportation</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>On-time delivery</td>
                    <td>90%</td>
                  </tr>
                  <tr>
                    <td>Delivery lead time</td>
                    <td>3 days</td>
                  </tr>
                  <tr>
                    <td>Freight volume</td>
                    <td>10,000 lbs</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className='equal-height-card'>
            <Card.Body>
              <Card.Title>Quality</Card.Title>
              <Pie   options={{responsive:true}} data={pieData}/>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Supplier/Product</th>
                    <th>Defect rate</th>
                    <th>Complaints</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Supplier A</td>
                    <td>1%</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Supplier B</td>
                    <td>2%</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Product X</td>
                    <td>0.5%</td>
                    <td></td>
                    </tr>
              <tr>
                <td>Product Y</td>
                <td>0.8%</td>
                <td>2</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6}>
      <Card className='equal-height-card'>
        <Card.Body>
          <Card.Title>Finance</Card.Title>
          <Bar options={{responsive:true}} data={finance} />
          <Table responsive>
            <thead>
              <tr>
                <th>Revenue</th>
                <th>Expenses</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$100,000</td>
                <td>$50,000</td>
                <td>$50,000</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
);
};

export default Statistics;
