
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

export class ExecutePowerShell implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PowerShell',
		name: 'ExecutePowerShell',
		group: ['transform'],
		version: 1,
		description: 'Execute a powershell file',
		defaults: {
			name: 'ExecutePowerShell',
			color: '#771144',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			
			{
				displayName: 'File Path',
				name: 'PowerShellFile',
				type: 'string',
				default: '',
				placeholder: 'Placeholder value',
				description: 'The full file path to create the excel file',
			}
,

			{
				displayName: 'Arguments',
				name: 'Arguments',
				type: 'string',
				default: '',
				placeholder: 'Placeholder value',
				description: 'Arguments',
			}
,

			{
				displayName: 'Wait For Exit',
				name: 'WaitForExit',
				type: 'boolean',
				default: false,
				placeholder: 'Placeholder value',
				description: 'WaitForExit',
			}
	
		]
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();

		let item: INodeExecutionData = items[0];

		item.json['PowerShellFile'] = this.getNodeParameter('PowerShellFile', 0, '') as string;
		item.json['Arguments'] = this.getNodeParameter('Arguments', 0, '') as string;
		item.json['WaitForExit'] = this.getNodeParameter('WaitForExit', 0, false) as boolean;


		let responseData = await apiRequest.call(this, 'POST', 'robotagent/execute/executepowershell', item.json);

		let returnData: INodeExecutionData[] =  [];
		returnData.push({'json': responseData});
		return this.prepareOutputData(returnData);
	}
}
