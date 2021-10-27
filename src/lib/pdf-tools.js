import PdfPrinter from "pdfmake";

function getPDFReadableStream(data) {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };
  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [...data],
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, Option);

  pdfReadableStream.end();
  return pdfReadableStream;
}

export default getPDFReadableStream;
