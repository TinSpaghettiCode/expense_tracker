
export interface ExpenseRecord{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Description : Data	*/
	description: string
	/**	Type : Select	*/
	type: "Credit" | "Debit"
	/**	Remarks : Small Text	*/
	remarks?: string
	/**	Amount : Float	*/
	amount: number
	/**	Formatted Amount : Float	*/
	formatted_amount?: number
}