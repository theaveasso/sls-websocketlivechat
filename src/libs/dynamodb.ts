import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';

import ddbclient from 'src/model';

export const ddb = {
	write: async (tableName: string, data: Record<string, any>) => {
		const params: PutCommandInput = {
			TableName: tableName,
			Item: data,
		};

		const command = new PutCommand(params);

		await ddbclient.send(command);
	},
};
