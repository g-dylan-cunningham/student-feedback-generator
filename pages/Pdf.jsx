import { Document, Page, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
  selectAllSsReportInfo,
} from '../selectors';


const PdfReport = dynamic(() => import("../comps/PdfReport/Pdf"), {
    ssr: false,
  });

const PdfReportCaller = () => {
  const ssReportInfo = useSelector(selectAllSsReportInfo);
  return <PdfReport ssReportInfo={ssReportInfo}/>
}


const View = () => {
    const [client, setClient] = useState(false);
    useEffect(() => {
        setClient(true)
    }, [])

    return (
      <div id='pdf-report'>
        <PdfReportCaller/>
      </div>
    )
}


export default View;
