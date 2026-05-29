export interface GridProps {
    sort: any[];
    filter: any;
    skip: number;
    take: number;
    total: number;
    aggregates: any[];
}

export const newGridProps: GridProps = {
    sort: [],
    skip: 0,
    take: 10,
    total: 0,
    filter: undefined,
    aggregates: []
};

export interface ServiceMap {
    UserUid: string;         
    ParentUid: string;
    Type?: number;
    Account: string;       
    FullName: string;
    AppCreatedBy: string;
    AppCreationDate?: Date;
}

export enum SelectRowTypeEnum {
    SINGLE = 0,
    MULTIPLE = 1
}