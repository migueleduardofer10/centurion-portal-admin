export interface ILNSLoan {

    Uid?: string
    Account?: string
    BorrowerFullName?: string

    OriginalBalance?: number,
    LienPosition?: string
    UnpaidLateCharges?: number,
    PrincipalBalance?: number,
    ImpoundBalance?: number,
    UnpaidCharges?: number,

    NoteRate?: number,
    ReserveBalance?: number,
    UnpaidInterest?: number,
    PaidToDate?: string,
    MaturityDate?: string,
    OriginationDate?: string,

    NextDueDate?: string,

    Payment?: number,
    PaymentImpound?: number,
    PaymentReserve?: number,
    PaymentOthers?: number,

    PaidOffDate?: string,

    LateChargesMin?: number,
    LateChargesDays?: string

    BorrowerAddress?: string,
    BorrowerCity?: string,
    BorrowerState?: string,
    BorrowerZip?: string,

    TrustAccountUid?: string,
}