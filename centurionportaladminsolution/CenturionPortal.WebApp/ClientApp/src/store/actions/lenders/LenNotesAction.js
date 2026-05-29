"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LenFungind_Action_CallJson = exports.LenNotes_Action_applyChangedColumns = exports.LenNotes_Action_SetColumnsArray = exports.LenNotes_Action_SetActiveColumn = exports.LenNotes_Action_SetNotessArray = exports.LenNotes_Action_SetAllRows = exports.Type_SetAllRows = exports.Type_SetActiveColumn = exports.Type_SetColumnsArray = exports.Type_SetNotesArray = void 0;
var kendo_data_query_1 = require("@progress/kendo-data-query");
var kendo_intl_1 = require("@telerik/kendo-intl");
var Enums_1 = require("../../../utilities/Enums");
var Functions_1 = require("../../../utilities/Functions");
var LenderCommon2_1 = require("../../commons/LenderCommon2");
var Type = 'Notes_Action/';
exports.Type_SetNotesArray = Type + 'SetNotesArray';
exports.Type_SetColumnsArray = Type + 'SetColumnsArray';
exports.Type_SetActiveColumn = Type + 'SetActiveColumn';
exports.Type_SetAllRows = Type + 'SetAllRows';
exports.LenNotes_Action_SetAllRows = function (allRows) { return ({
    type: exports.Type_SetAllRows,
    AllRows: allRows
}); };
exports.LenNotes_Action_SetNotessArray = function (notes, totalRows, gridState) { return ({
    type: exports.Type_SetNotesArray,
    Notes: notes,
    TotalRows: totalRows,
    GridState: gridState
}); };
exports.LenNotes_Action_SetActiveColumn = function (columnName) { return ({
    type: exports.Type_SetActiveColumn,
    columnName: columnName
}); };
exports.LenNotes_Action_SetColumnsArray = function (columns) { return ({
    type: exports.Type_SetColumnsArray,
    Columns: columns
}); };
var Title = "Notes";
exports.LenNotes_Action_applyChangedColumns = function (columns) { return function (dispatch, getState) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch('/api/grid/' + Number(Enums_1.GridEntityTypeEnum.VWL_LOANNOTES), {
        method: 'POST',
        headers: LenderCommon2_1.FetchHeaders(),
        body: JSON.stringify(columns)
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(exports.LenNotes_Action_SetColumnsArray(columns));
        dispatch(Functions_1.GlobalAnimation_Loaded());
        Functions_1.Notify.success(data.message, Title);
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
exports.LenFungind_Action_CallJson = function (loanUid, getColumns, gridState, revertColumns, excelExporter_allRows) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    var url = '';
    if (!excelExporter_allRows)
        url = "/api/Lender/loans/notes/" + loanUid + "/" + getColumns + "/?" + kendo_data_query_1.toDataSourceRequestString(gridState);
    else
        url = "/api/Lender/loans/notes/" + loanUid + "/" + getColumns;
    fetch(url, {
        method: 'POST',
        headers: LenderCommon2_1.FetchHeaders()
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var notes = data.ObjOptional.Result.Data; //(notes === null ? [] : notes.Rows) as Notes_Entity_Interface[]
        var totalNotes = data.ObjOptional.Result.Total; //(notes === null ? 0 : notes.TotalRows) as number
        notes.forEach(function (x) { return x.Date = kendo_intl_1.formatDate(new Date(x.Date), "yyyy/MM/dd HH:mm"); });
        if (!excelExporter_allRows) {
            dispatch(exports.LenNotes_Action_SetNotessArray(notes, totalNotes, gridState));
        }
        if (revertColumns) {
            fetch('/api/grid/' + Number(Enums_1.GridEntityTypeEnum.VWL_LOANNOTES), {
                method: 'POST',
                headers: LenderCommon2_1.FetchHeaders(),
                body: JSON.stringify(LenderCommon2_1.LenNotes_ColumnConfiguration())
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                dispatch(exports.LenNotes_Action_SetColumnsArray(LenderCommon2_1.LenNotes_ColumnConfiguration()));
                dispatch(Functions_1.GlobalAnimation_Loaded());
            })
                .catch(function (error) {
                Functions_1.Utils.validateData(dispatch, error, Title);
            });
        }
        else if (getColumns) {
            var columns = data.ObjOptional.Columns;
            dispatch(exports.LenNotes_Action_SetColumnsArray(Functions_1.Utils.getColumns2(LenderCommon2_1.LenNotes_ColumnConfiguration(), columns)));
            dispatch(Functions_1.GlobalAnimation_Loaded());
        }
        else if (excelExporter_allRows) {
            dispatch(exports.LenNotes_Action_SetAllRows(notes));
            excelExporter_allRows.save();
            dispatch(exports.LenNotes_Action_SetAllRows([]));
            dispatch(Functions_1.GlobalAnimation_Loaded());
            Functions_1.Notify.success("", "Export Complete");
        }
        else {
            dispatch(Functions_1.GlobalAnimation_Loaded());
        }
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//# sourceMappingURL=LenNotesAction.js.map