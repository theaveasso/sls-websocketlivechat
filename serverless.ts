import type { AWS } from '@serverless/typescript';

import dynamoResources from 'resources/dynamoResources';
import functions from 'resources/functions';

const serverlessConfiguration: AWS = {
	service: 'Serverless-LiveChatWebsocket',
	frameworkVersion: '3',
	plugins: ['serverless-esbuild'],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		profile: 'theaveasso',
		region: 'ap-southeast-1',
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: 'dynamodb',
						Resources: [
							'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.roomConnectionTable}',
							'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.roomConnectionTable}/index/index1',
						],
					},
				],
			},
		},

		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

			ROOM_CONNECTION_TABLE: '${self:custom.roomConnectionTable}',
		},
	},
	// import the function via paths
	functions,
	resources: {
		Resources: {
			...dynamoResources,
		},
	},
	package: { individually: true },
	custom: {
		roomConnectionTable: '${sls:stage}-roomConnection-table',
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;
