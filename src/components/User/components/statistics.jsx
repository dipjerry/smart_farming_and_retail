import React , {useState , useEffect} from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './statistics.css'
// import Transections from './details';
// import Sonnet from '../../components/Sonnet';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   // position: 'top',
    // },
    title: {
      // display: true,
      // text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100000, 50000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [100000, 50000],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
       {/* <Details/> */}
      <Row>
        <Col md={4}>
          <Card className='card'>
            <Card.Body>
              <Card.Title>Inventory</Card.Title>
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
          </Card >
        </Col>
        <Col md={4}>
          <Card className='card'>
            <Card.Body>
              <Card.Title>Orders</Card.Title>
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
          <Card className='card'>
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
          <Card className='card'>
            <Card.Body>
              <Card.Title>Quality</Card.Title>
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
      <Card className='card'>
        <Card.Body>
          <Card.Title>Finance</Card.Title>
          <Bar options={options} data={data} />
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
