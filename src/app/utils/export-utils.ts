import * as FileSaver from 'file-saver';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

 export function exportPdf(data: any[], columns: any[], fileName: string)  {
           const doc = new jsPDF('landscape')
           autoTable(doc, ({
             rowPageBreak: 'auto',
             pageBreak: 'avoid',
             horizontalPageBreak: true,
             margin: 0,
             styles: { minCellWidth: 40 },
             body: data,
             columns: columns
           }))
           doc.save(fileName);

}

export function saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

 export function exportExcel(exportData: any[], fileName:string) {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(exportData);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAsExcelFile(excelBuffer, fileName);
  });
}


