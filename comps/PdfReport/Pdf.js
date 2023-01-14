import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {
  selectCurrentStudentData,
  selectReportDetails,
} from '../../selectors';

// Font.register( {family: "Inter", src: "/assets/font.otf"})

const styles = StyleSheet.create({
    body: {
        padding: 30,
        height: '100vh',
        width: '100vw',
        // flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    // page: {
    //   flexDirection: 'row',
    //   backgroundColor: '#E4E4E4'
    // },
    section: {
      margin: 10,
      // padding: 10,
      // flexGrow: 1
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
      textTransform: 'uppercase',
    },
    skillHeading: {
      fontSize: 14,
      textTransform: 'uppercase',
    },
    skills: {
      fontSize: 12,
    }
})

const PDF = ({
  ssReportInfo,
}) => {

  if (ssReportInfo) {
    return (
      <Document>
        {
          ssReportInfo.map(ss => (
            <Page  style={styles.body}>
              <View style={styles.section}>
                  <Text wrap={false} style={styles.title}>
                    {ss.ssName}
                  </Text>
              </View>
              {
                ss.skills.map(skill => (
                  <View style={styles.section}>
                    <Text style={styles.skillHeading}>
                      {skill.category}
                    </Text>
                    <Text style={styles.skills}>
                      {skill.finalized}
                    </Text>
                </View>
                ))
              }
            </Page>
          ))
        }
      </Document>
    )
} else {
  return <div>no ssReportInfo in Pdf.js</div>
}
  }
  
const PDFView = ({
  ssDetails,
  ssSkills,
  ssReportInfo,
}) => {

    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return (
      <PDFViewer>
          <PDF ssDetails={ssDetails} ssSkills={ssSkills} ssReportInfo={ssReportInfo}/>
      </PDFViewer>
    );
}
export default PDFView