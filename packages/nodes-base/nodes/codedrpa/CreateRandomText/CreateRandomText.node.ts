
import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import {
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';
import { OptionsWithUri } from 'request';
import { IDataObject } from 'n8n-workflow';
import {
	apiRequest,
} from './GenericFunctions';

export class CreateRandomText implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CreateRandomText',
		name: 'CreateRandomText',
		group: ['transform'],
		version: 1,
		description: 'CreateRandomText',
		defaults: {
			name: 'CreateRandomText',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			
			{
				displayName: 'Length',
				name: 'Length',
				type: 'number',
				default: '',
				placeholder: 'Placeholder value',
				description: 'Length',
			}
	
		]
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();

		let item: INodeExecutionData = items[0];

		item.json['Length'] = this.getNodeParameter('Length', 0, '') as number;


		let responseData = await apiRequest.call(this, 'POST', 'robotagent/execute/createrandomtext', item.json);

		let returnData: INodeExecutionData[] =  [];
		returnData.push(responseData);
		return this.prepareOutputData(returnData);
	}
}
