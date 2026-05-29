export enum AttachmentViewEnum {
	PENDING_DISBURSEMENT_TO_LENDER = 0,
	BORROWER_NOTICES = 1,
	NOTIFICATION_OF_DEPOSIT = 2,
	ALL_ATTACHMENT = 3,
	LENDER_STATEMENTS = 4,
	TAX_FORMS = 5
}

export enum LoanStatusEnum {
	ASSIGNED = -1,
	ACTIVE = 0,
	NON_ACTIVE = 1,
	PAID_OFF = 2,
	TRANSFERED = 3,
	BANKRUPTCY = 4,
	FORECLOSURE = 5,
	REO = 6,
	CHARGE_OFF = 7,
	COMPLETE_CHARGE_OFF = 8,
	TRANSFERED_OUT = 9,
	PAYOFF_DEMAND = 10,
	PRE_BOARDING = 11,
	FINAL_BOARDING = 12,
	RESPA = 13,
	LOAN_MOD_REQUEST = 14,
	DELIQUENCY = 15
}

export enum LoanPrimaryPurposeEnum {
	CONSUMER = 0,
	BUSINESS = 1
}

export enum GridEntityTypeEnum {
	LNS_LOAN = 500,
	LEN_LOANS_SEARCH = 501,
	VWL_LOAN_HISTORY = 502,
	VWL_CHARGES_DETAILS = 503,
	VWL_LOANNOTES = 504,
	VWL_FUNDING = 505,
	VWL_CREDITCARDINVOICES = 506,
	VWL_PAIDINVOICES = 507,
	VCW_VENDORPORTFOLIOSECONDARY = 508,
	ELS_USER = 1000
}

export enum PaymentTypeEnum {
	VCHECK = 0,
	PAYPAL = 1,
	CREDIT_CARD = 2
}

export enum TypeCreditCardEnum {
	VISA = 0,
	MASTER = 1,
	AMERICAN_EXPRESS = 2
}

export enum EnumTypeMessage {
	NOTHING = 0,
	INFORMATION = 1,
	WARNING = 2,
	ERROR = 3,
	SUCCESS = 4
}

export enum UserTypeEnum {
	ADMIN = 0,
	BROKER = 1,
	LENDER = 2,
	BORROWER = 3,
	SUPPORT = 99
}

export enum StatusEnum {
	INACTIVE = 0,
	ACTIVE = 1
}

export function EnumToArray(typeEnum: any, replaceGuionForSpace: boolean = true): any[] {
	let values: any[] = [];
	for (var key in typeEnum) {
		if (typeof typeEnum[key] === 'string')
			values.push({ value: Number(key), label: (replaceGuionForSpace ? GetEnumDescription(typeEnum[key]) : typeEnum[key]) });
	}
	return values;
}

function GetEnumDescription(label: string): string {
	return label.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}
