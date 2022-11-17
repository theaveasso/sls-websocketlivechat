import type { AWS } from '@serverless/typescript';

const dynamoResources: AWS['resources']['Resources'] = {
	roomConnectionTable: {
		Type: 'AWS::DynamoDB::Table',
		Properties: {
			TableName: '${self:custom.roomConnectionTable}',
			BillingMode: 'PAY_PER_REQUEST',
			AttributeDefinitions: [
				{
					AttributeName: 'Id',
					AttributeType: 'S',
				},
				{
					AttributeName: 'pk',
					AttributeType: 'S',
				},
				{
					AttributeName: 'sk',
					AttributeType: 'S',
				},
			],
			KeySchema: [
				{
					AttribteName: 'Id',
					KeyType: 'HASH',
				},
			],
			GlobalSecondaryIndexes: [
				{
					IndexName: 'index1',
					KeySchema: [
						{
							AttributeName: 'pk',
							KeyType: 'HASH',
						},
						{
							AttributeName: 'sk',
							keyType: 'RANGE',
						},
					],
					Projection: {
						ProjectionType: 'ALL',
					},
				},
			],
		},
	},
};

export default dynamoResources;
