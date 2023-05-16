import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Statistics from './statistics';

// import Sonnet from '../../components/Sonnet';

import Tablet from '../../all/tablet'
import Table from '../../all/table'
function ControlledTabsExample() {
  const [key, setKey] = useState('statistics');
  
  const data = [
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
    {Key:"Transaction 1",Record:
    {To:"Jivan", From:"Dipjyoti",Price:"200"}
  },
]
  const columns = [
    {
      Header: "Index",
      // accessor: (row, index) => index + 1,
      accessor: 'Key',
    },
    {
      Header: 'To',
      accessor: 'Record.To',
    },
    {
      Header: 'From',
      accessor: 'Record.From',
    },
    {
      Header: 'Amount',
      accessor: 'Record.Price',
    },
    
    
  ];
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="statistics" title="Statistics">
        {/* statistics content */}
        {/* <Sonnet /> */}
        <Statistics/>
      </Tab>
      <Tab eventKey="transection" title="Transection">
        {/* transection content */}
        {/* <Sonnet /> */}
        <Table data={data} columns={columns}/>
      </Tab>
    </Tabs>
  );
}

export default ControlledTabsExample;