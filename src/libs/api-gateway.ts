interface JSONResponseProps {
	statusCode?: number;
	data?: {};
	headers?: Record<string, string>;
}
export const formatJSONResponse = ({
	statusCode = 200,
	data,
	headers,
}: JSONResponseProps) => {
	return {
		statusCode,
		body: JSON.stringify(data),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			...headers,
		},
	};
};
