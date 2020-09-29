import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import { OptionsWithUri } from 'request';
import { IDataObject } from 'n8n-workflow';

export async function apiRequest(this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions, method: string, endpoint: string, body?: object, query?: IDataObject): Promise<any> { 
	query = query || {};

	const options: OptionsWithUri = {
		headers: {},
		method,
		body,
		qs: query,
		uri: `http://20.44.192.240:5000/` + endpoint,
		json: true,
	};

	try {
		return await this.helpers.request!(options);
	} catch (error) {
		if (error.statusCode === 401) {
			// Return a clear error
			throw new Error('The credentials are not valid!');
		}		
		throw error;
	}
}
