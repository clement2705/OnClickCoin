import React from 'react';
import axios from 'axios';
import { Card, Table } from 'react-bootstrap';
import history from '../../utils/history';

/*
Defines the data page of the app
*/

function tdclick(event) {
  console.log('td clicked');
  event.stopPropagation();
}

// TODO: change function's file structure
async function asyncForEach(array, callback) {
  // TODO: find more elegant solution
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
}

async function addUsernames(transactions) {
  const txs = [];
  await asyncForEach(transactions, async transaction => {
    const res = await axios.get(`/api/username/${transaction.userID}`);
    txs.push({ ...transaction, username: res.data });
  });

  return Promise.resolve(txs);
}

class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      isLoading: true,
    };
  }

  async getTransactions() {
    const response = await axios.get('/api/transactions');
    const txs = await addUsernames(response.data);

    this.setState({
      transactions: txs,
      isLoading: false,
    });
  }

  componentDidMount() {
    this.getTransactions();
  }

  render() {
    const { isLoading, transactions } = this.state;
    return (
      <div>
        <React.Fragment>
          {!isLoading ? (
            <Card>
              <Card.Body>
                <Card.Title>Most recent transactions</Card.Title>
                <Table striped bordered variant="dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>username</th>
                      <th>transactionHash</th>
                      <th>netname</th>
                      <th>createdAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(transaction => (
                      <tr key={transaction.transactionHash}>
                        <td
                          onClick={() => {
                            history.push(
                              `/receipt/${transaction.transactionHash}`,
                            );
                          }}
                        >
                          {transaction.name}
                        </td>
                        <td>{transaction.username}</td>
                        <td>{transaction.transactionHash}</td>
                        <td>{transaction.netname}</td>
                        <td>{transaction.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default Data;
