import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const ddbclient = new DynamoDBClient({});

export default ddbclient;
