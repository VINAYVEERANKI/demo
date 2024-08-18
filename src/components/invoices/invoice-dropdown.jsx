// import React from "react";
// import { BlobProvider } from "@react-pdf/renderer";
// import RiderInvoicePdf from "./rider-invoice/rider-invoice-pdf";
// import DetailedInvoicePdf from "./detailed-invoice/detailed-invoice-pdf";

// const InvoiceDropdown = ({
//   downloadInvoiceShow,
//   index,
//   invoiceData,
//   dataLoading,
// }) => {
//   return (
//     <>
//       {downloadInvoiceShow === index ? (
//         <div className={`invoice_download_container p-3`}>
//           <ul className="menu_list px-1  mb-0 primary_color fs_14 fw_600 text-start">
//             <>
//               <li className=" cursor_pointer border-bottom mb-1 text-nowrap">
//                 <BlobProvider
//                   document={
//                     !dataLoading && invoiceData ? (
//                       <RiderInvoicePdf item={invoiceData} />
//                     ) : (
//                       <div>Loading document...</div>
//                     )
//                   }
//                 >
//                   {({ url, loading }) => {
//                     return loading || dataLoading || invoiceData == null ? (
//                       "loading document ..."
//                     ) : (
//                       <a
//                         href={url}
//                         target="_blank"
//                         className={`background_none border_none primary_color fs_14 text-decoration-none fw_600 cursor_pointer`}
//                       >
//                         Download Rider Invoice
//                       </a>
//                     );
//                   }}
//                 </BlobProvider>
//               </li>
//               <li className=" cursor_pointer  pb-1 mb-1 text-nowrap">
//                 <BlobProvider
//                   document={
//                     !dataLoading && invoiceData ? (
//                       <DetailedInvoicePdf item={invoiceData} />
//                     ) : (
//                       <div>Loading document...</div>
//                     )
//                   }
//                 >
//                   {({ url, loading }) => {
//                     return loading || dataLoading || invoiceData === null ? (
//                       "loading document ..."
//                     ) : (
//                       <a
//                         href={url}
//                         target="_blank"
//                         className={`background_none border_none primary_color fs_14 text-decoration-none fw_600 cursor_pointer`}
//                       >
//                         Download Combined Invoice
//                       </a>
//                     );
//                   }}
//                 </BlobProvider>
//               </li>
//             </>
//           </ul>
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

// export default InvoiceDropdown;

import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
import RiderInvoicePdf from "./rider-invoice/rider-invoice-pdf";
import DetailedInvoicePdf from "./detailed-invoice/detailed-invoice-pdf";

const InvoiceDropdown = ({
  downloadInvoiceShow,
  index,
  invoiceData,
  dataLoading,
}) => {
  return (
    <>
      {downloadInvoiceShow === index ? (
        <div className={`invoice_download_container p-3`}>
          <ul className="menu_list px-1  mb-0 primary_color fs_14 fw_600 text-start">
            {invoiceData && (
              <li className=" cursor_pointer border-bottom mb-1 text-nowrap">
                <BlobProvider document={<RiderInvoicePdf item={invoiceData} />}>
                  {({ url, loading }) => (
                    <>
                      {loading ? (
                        "loading document ..."
                      ) : (
                        <a
                          href={url}
                          target="_blank"
                          className={`background_none border_none primary_color fs_14 text-decoration-none fw_600 cursor_pointer`}
                        >
                          Download Rider Invoice
                        </a>
                      )}
                    </>
                  )}
                </BlobProvider>
              </li>
            )}
            {invoiceData && (
              <li className=" cursor_pointer  pb-1 mb-1 text-nowrap">
                <BlobProvider
                  document={<DetailedInvoicePdf item={invoiceData} />}
                >
                  {({ url, loading }) => (
                    <>
                      {loading ? (
                        "loading document ..."
                      ) : (
                        <a
                          href={url}
                          target="_blank"
                          className={`background_none border_none primary_color fs_14 text-decoration-none fw_600 cursor_pointer`}
                        >
                          Download Combined Invoice
                        </a>
                      )}
                    </>
                  )}
                </BlobProvider>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default InvoiceDropdown;
