import type { AWS } from '@serverless/typescript';

const functions: AWS['functions'] = {
	createRoom: {
		handler: 'src/functions/createRoom.handler',
		events: [
			{
				websocket: {
					route: 'new',
				},
			},
		],
	},
};

export default functions;
