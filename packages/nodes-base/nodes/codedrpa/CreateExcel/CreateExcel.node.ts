
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

export class CreateExcel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Create Excel',
		name: 'CreateExcel',
		group: ['transform'],
		version: 1,
		description: 'Create a new excel with a custom cell text',
		defaults: {
			name: 'CreateExcel',
			color: '#779944',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			
			{
				displayName: 'File Path',
				name: 'FilePath',
				type: 'string',
				default: '',
				placeholder: 'Placeholder value',
				description: 'The full file path to create the excel file',
			}
,

			{
				displayName: 'SheetName',
				name: 'SheetName',
				type: 'string',
				default: '',
				placeholder: 'Placeholder value',
				description: 'SheetName',
			}
,

			{
				displayName: 'Content',
				name: 'Content',
				type: 'string',
				default: '',
				placeholder: 'Placeholder value',
				description: 'Content',
			}
,

			{
				displayName: 'CellRow',
				name: 'CellRow',
				type: 'number',
				default: 0,
				placeholder: 'Placeholder value',
				description: 'CellRow',
			}
,

			{
				displayName: 'CellColumn',
				name: 'CellColumn',
				type: 'number',
				default: 0,
				placeholder: 'Placeholder value',
				description: 'CellColumn',
			}
	
		]
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();

		let item: INodeExecutionData = items[0];

		item.json['FilePath'] = this.getNodeParameter('FilePath', 0, '') as string;
		item.json['SheetName'] = this.getNodeParameter('SheetName', 0, '') as string;
		item.json['Content'] = this.getNodeParameter('Content', 0, '') as string;
		item.json['CellRow'] = this.getNodeParameter('CellRow', 0, 0) as number;
		item.json['CellColumn'] = this.getNodeParameter('CellColumn', 0, 0) as number;


		let responseData = await apiRequest.call(this, 'POST', 'robotagent/execute/createexcel', item.json);

		let returnData: INodeExecutionData[] =  [];
		returnData.push({'json': responseData});
		return this.prepareOutputData(returnData);
	}
}
