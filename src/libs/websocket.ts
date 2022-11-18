import {
	ApiGatewayManagementApi,
	PostToConnectionCommand,
	PostToConnectionCommandInput,
} from '@aws-sdk/client-apigatewaymanagementapi';

interface WSSendProps {
	data: {
		message?: string;
		type?: string;
		from?: string;
	};
	domainName: string;
	stage: string;
	connectionId: string;
}

export const websocket = {
	send: ({ data, domainName, stage, connectionId }: WSSendProps) => {
		const client = new ApiGatewayManagementApi({
			endpoint: `https://${domainName}/${stage}`,
		});

		const params: PostToConnectionCommandInput = {
			ConnectionId: connectionId,
			Data: JSON.stringify(data) as any,
		};
		const command = new PostToConnectionCommand(params);

		return client.send(command);
	},
};
