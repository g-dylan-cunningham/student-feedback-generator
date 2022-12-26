import React, { useEffect } from 'react';
import { ResizableBox, Resizable } from 'react-resizable';

class Example extends React.Component {
  state = {
    width: 200,
    height: 200,
  };

  // On top layout
  onResize = (event, {element, size, handle}) => {
    this.setState({width: size.width, height: size.height});
  };

  render() {
    return (
      <Resizable height={this.state.height} width={this.state.width} onResize={this.onResize}>
        <div className="box" style={{width: this.state.width + 'px', height: this.state.height + 'px'}}>
          <span>Contents</span>
        </div>
      </Resizable>
    );
  }
}

export default Example;

// const Test = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetch('http://localhost:3000/base/api/test',
//         {
//           method: 'GET',
//           // body: JSON.stringify({
//           //   studentDetails,
//           //   rating: rating,
//           //   category,
//           // })
//         }
//       );
//       const res = await data.json();
//       console.log('data', res)
//       // myFun();
//     }
//     fetchData();
//   }, []);

//   return (
//     // const {ResizableBox} = require('react-resizable');

//     // // ES6
//     // import { ResizableBox } from 'react-resizable';
    
//     // class Example extends React.Component {
//     //   render() {
//     //     return (
//           <ResizableBox
//             width={200}
//             height={200}
//             // draggableOpts={{...}}
//             minConstraints={[100, 100]}
//             maxConstraints={[300, 300]}>
//             <span>Contents</span>
//           </ResizableBox>
//     //     );
//     //   }
//     // }
//   );
// }
 
// export default Test;