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
	connectionId: string;
}

const websocket = {
	send: ({ data, connectionId }: WSSendProps) => {
		const client = new ApiGatewayManagementApi({});
	},
};
