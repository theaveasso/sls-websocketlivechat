import { APIGatewayProxyEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';

import { formatJSONResponse } from '@libs/api-gateway';

// types
import { ddb } from '@libs/dynamodb';
import { UserConnectionRecord } from 'src/types/dynamo';

export const handler = async (events: APIGatewayProxyEvent) => {
	try {
		// environment variables
		const ROOM_CONNECTION_TABLE = process.env.ROOM_CONNECTION_TABLE;

		const { connectionId, domainName, stage } = events.requestContext;
		const { name } = JSON.parse(events.body);

		if (!name) {
			await websocket.send({
				data: {
					message: 'You needs a "Name" on Create Room',
					type: 'error',
				},
			});

			return formatJSONResponse({});
		}

		const roomId = uuid().slice(0, 6);
		// create dynamo record
		const data: UserConnectionRecord = {
			id: connectionId,
			pk: roomId,
			sk: connectionId,

			name,
			stage,
			roomId,
			domainName,
		};

		await ddb.write(ROOM_CONNECTION_TABLE, data);

		await websocket.send({
			data: {
				message: `Successfully Create Room... You are now connected to room ${roomId}`,
				type: 'info',
			},
		});
	} catch (error) {
		return formatJSONResponse({ statusCode: 502, data: error.message });
	}
};
